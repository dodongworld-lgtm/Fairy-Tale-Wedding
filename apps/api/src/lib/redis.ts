import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null // required by BullMQ
})

// Plain connection options for BullMQ (avoids ioredis version mismatch)
export const bullmqConnection = {
  host: (() => {
    try {
      return new URL(process.env.REDIS_URL || 'redis://localhost:6379').hostname
    } catch {
      return 'localhost'
    }
  })(),
  port: (() => {
    try {
      return parseInt(new URL(process.env.REDIS_URL || 'redis://localhost:6379').port || '6379', 10)
    } catch {
      return 6379
    }
  })(),
  maxRetriesPerRequest: null as null
}
