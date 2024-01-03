import { Handlers } from "$fresh/server.ts"
import { load } from "std/dotenv/mod.ts"
import { insertUsage } from "~/db/insert-usage.ts"
import { callTuyaAPI, CallTuyaAPIProps } from "~/tuya-api/index.ts"
import { StatusResult } from "~/tuya-api/status.ts"

await load({ export: true })
const { TUYA_CLIENT_ID, TUYA_CLIENT_SECRET } = Deno.env.toObject()
const paramsBase = {
  clientId: TUYA_CLIENT_ID,
  clientSecret: TUYA_CLIENT_SECRET,
}

export const handler: Handlers = {
  GET: async (_req, _ctx) => {
    console.log(JSON.stringify({ _req, _ctx }))
    const deviceId = _ctx.params.deviceId
    const params: CallTuyaAPIProps = {
      ...paramsBase,
      deviceId,
      api: "status",
    }

    const result = (await callTuyaAPI(params)) as StatusResult
    if (result.success) {
      insertUsage({
        deviceId,
        current: result.result.find((r) => r.code === "cur_current").value,
        power: result.result.find((r) => r.code === "cur_power").value,
        voltage: result.result.find((r) => r.code === "cur_voltage").value,
        time: new Date(result.t),
      })
    }

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    })
  },
}
