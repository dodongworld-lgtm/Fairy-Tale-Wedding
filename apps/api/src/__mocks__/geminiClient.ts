export function getAvailableKeys() { return ['mock-key'] }
export function getCurrentKeyIndex() { return 0 }
export function rotateKey() {}
export function getClient() { return {} as any }
export async function callWithRetry<T>(fn: (client: any) => Promise<T>): Promise<T> {
  return fn({} as any)
}
