import { encode as hexEncode } from 'https://deno.land/std@0.170.0/encoding/hex.ts'

/**
 * String to Array of character code
 *
 * encodeText('Hello') // => [ 72, 101, 108, 108, 111]
 */
const encodeText = (text: string) => new TextEncoder().encode(text)

/**
 * Character code Array to String
 *
 * decodeText([ 72, 101, 108, 108, 111]) // => 'Hello'
 */
const decodeToText = (array: Uint8Array) => new TextDecoder().decode(array)

const importKey = async (secret: string) =>
  await crypto.subtle.importKey(
    'raw',
    encodeText(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )

export const sign = async (secret: string, message: string) => {
  const key = await importKey(secret)

  const signature = await crypto.subtle.sign(
    { name: 'HMAC' },
    key,
    encodeText(message)
  )

  return decodeToText(hexEncode(new Uint8Array(signature)))
}
