import { Handlers } from "$fresh/server.ts";
import { usageHistory } from "~/db/usage-history.ts";

export const handler: Handlers = {
  GET: async (_req, _ctx) => {
    const deviceId = _ctx.params.deviceId;
    const histories = await usageHistory(deviceId, { limit: 1440 });
    return new Response(JSON.stringify(histories), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
