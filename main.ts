import { load } from 'https://deno.land/std@0.170.0/dotenv/mod.ts'
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts'
import { callTuyaAPI, CallTuyaAPIProps } from './tuya-api.ts'

serve(async req => {
  const localEnv = await load()
  const serverEnv = Deno.env.toObject()
  const env = Object.keys(localEnv).length === 0 ? serverEnv : localEnv

  const { TUYA_CLIENT_ID, TUYA_CLIENT_SECRET } = env

  const paramsBase = {
    clientId: TUYA_CLIENT_ID,
    clientSecret: TUYA_CLIENT_SECRET,
  }

  const body = await req.json().catch(() => {})
  const params: CallTuyaAPIProps =
    req.method === 'GET'
      ? {
          ...paramsBase,
          deviceId: req.url.split('/').pop() || '',
          api: 'status',
        }
      : {
          ...paramsBase,
          deviceId: body.deviceId,
          api: 'command',
          commands: [{ code: body.code, value: body.value }],
        }

  const response = await callTuyaAPI(params)
    .then(
      result =>
        new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
        })
    )
    .catch(e => new Response(e.message, { status: 500 }))

  return response
})
