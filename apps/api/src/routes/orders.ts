import { Router, Request, Response, NextFunction } from 'express'
import { prisma } from '../lib/prisma'

export const ordersRouter = Router()

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)

const PLAN_AMOUNTS: Record<string, number> = {
  BASIC: 9900,
  STANDARD: 19900,
  PREMIUM: 39900
}

ordersRouter.post('/', asyncHandler(async (req, res) => {
  const userId = Array.isArray(req.headers['x-user-id'])
    ? req.headers['x-user-id'][0]
    : req.headers['x-user-id']

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const { projectId, plan } = req.body

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId }
  })
  if (!project) {
    res.status(404).json({ error: 'Project not found' })
    return
  }

  const amount = PLAN_AMOUNTS[plan]
  if (!amount) {
    res.status(400).json({ error: 'Invalid plan' })
    return
  }

  const order = await prisma.order.create({
    data: { projectId, userId, plan, amount, status: 'PENDING' }
  })

  res.json({ orderId: order.id, amount })
}))

ordersRouter.post('/confirm', asyncHandler(async (req, res) => {
  const { orderId, paymentKey, amount } = req.body

  const order = await prisma.order.findUnique({ where: { id: orderId } })
  if (!order || order.amount !== amount) {
    res.status(400).json({ error: 'Invalid order' })
    return
  }

  const tossRes = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ orderId, paymentKey, amount })
  })

  if (!tossRes.ok) {
    const err = await tossRes.json() as { message?: string }
    res.status(400).json({ error: err.message || 'Payment failed' })
    return
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'PAID', tossPaymentKey: paymentKey, paidAt: new Date() }
  })

  await prisma.project.update({
    where: { id: order.projectId },
    data: { status: 'PAID' }
  })

  res.json({ ok: true })
}))
