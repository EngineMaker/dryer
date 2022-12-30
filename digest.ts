import { encode as hexEncode } from 'https://deno.land/std@0.170.0/encoding/hex.ts'

export const hashSHA256 = async (data: string) => {
  const hash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(data)
  )

  return new TextDecoder().decode(hexEncode(new Uint8Array(hash)))
}
