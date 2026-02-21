/**
 * 로컬 파일시스템 스토리지 (S3 대체 - 데모용)
 * 파일을 /tmp/onceuponus/ 에 저장하고 http://localhost:4000/files/... 로 서빙
 */
import fs from 'fs'
import path from 'path'

export const STORAGE_DIR = process.env.LOCAL_STORAGE_DIR || '/tmp/onceuponus'
const PORT = process.env.API_PORT || 4000
const BASE_URL = `http://localhost:${PORT}/files`

export function saveFile(subPath: string, buffer: Buffer): string {
  const filePath = path.join(STORAGE_DIR, subPath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, buffer)
  return `${BASE_URL}/${subPath}`
}

export function getFileUrl(subPath: string): string {
  return `${BASE_URL}/${subPath}`
}
