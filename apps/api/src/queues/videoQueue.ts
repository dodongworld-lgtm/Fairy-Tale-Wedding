import { Queue } from 'bullmq'
import { bullmqConnection } from '../lib/redis'

export interface VideoJobData {
  projectId: string
  userId: string
}

export const videoQueue = new Queue<VideoJobData, void, 'generate'>('video-generation', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connection: bullmqConnection as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 }
  }
})
