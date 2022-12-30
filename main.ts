import { loadSync } from 'https://deno.land/std@0.170.0/dotenv/mod.ts'
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts'
import { callTuyaAPI } from './tuya-api.ts'

const { TUYA_CLIENT_ID, TUYA_CLIENT_SECRET } = loadSync()

serve(async req => {
  console.log(req.method)
  if (req.method === 'GET') {
    return new Response('BAD REQEUST', { status: 400 })
  }

  const r = await req.json()
  const response = await callTuyaAPI({
    clientId: TUYA_CLIENT_ID,
    clientSecret: TUYA_CLIENT_SECRET,
    deviceId: r.deviceId,
    commands: [{ code: r.code, value: r.value }],
  })
    .then(
      result =>
        new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
        })
    )
    .catch(e => new Response(e.message, { status: 500 }))

  return response
})
