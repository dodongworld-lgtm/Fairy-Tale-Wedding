import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'placeholder',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'placeholder'
  }
})

export async function getUploadPresignedUrl(key: string, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: contentType
  })
  return getSignedUrl(s3, command, { expiresIn: 300 })
}

export async function getDownloadUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key
  })
  return getSignedUrl(s3, command, { expiresIn: 3600 })
}
