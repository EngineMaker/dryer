import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts'
import { sign } from './sign.ts'

Deno.test('sha256 test', async () => {
  const signed = await sign('secret', 'message')
  assertEquals(
    signed,
    '8b5f48702995c1598c573db1e21866a9b825d4a794d169d7060a03605796360b'
  )
})
