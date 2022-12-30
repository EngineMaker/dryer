import { Handlers } from '$fresh/server.ts'
import { load } from 'std/dotenv/mod.ts'
import { callTuyaAPI, CallTuyaAPIProps } from '~/tuya-api.ts'
import { StatusResult } from '~/api/status.ts'

await load({ export: true })
const { TUYA_CLIENT_ID, TUYA_CLIENT_SECRET } = Deno.env.toObject()
const paramsBase = {
  clientId: TUYA_CLIENT_ID,
  clientSecret: TUYA_CLIENT_SECRET,
}

export const handler: Handlers = {
  POST: async (_req, _ctx) => {
    const body = await _req.json().catch(() => {})
    const deviceId = _ctx.params.deviceId

    const params: CallTuyaAPIProps = {
      ...paramsBase,
      deviceId,
      api: 'command',
      commands: [{ code: body.code, value: body.value }],
    }

    const result = (await callTuyaAPI(params)) as StatusResult

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
