import { newClient } from "~/db/client.ts"
import sub from "date-fns/sub"
import format from "date-fns-tz/format"

interface UsageHistoryOptions {
  id?: number
  from?: Date
  to?: Date
  limit?: number
}

export const usageHistory = async (
  deviceId: string,
  opts: UsageHistoryOptions
) => {
  const {
    id = undefined,
    from = sub(new Date(), { days: 1 }),
    to = new Date(),
    limit = 1000,
  } = opts
  const db = await newClient()

  const { rows } = await db.queryObject<{ power: BigInt; time: Date }>(
    `SELECT power, time
    FROM power_usages
    WHERE device_id = $deviceId and time >= $from and time <= $to
    ORDER BY id desc
    LIMIT $limit`,
    { deviceId, id, from, to, limit }
  )

  return rows.map((r) => ({ power: Number(r.power), time: r.time }))
}

if (import.meta.main) {
  const now = new Date()
  const rows = await usageHistory("72363820c4dd5707cd6a", {
    from: sub(now, { days: 1 }),
    to: now,
    limit: 1440,
  })
  console.log(
    rows.map((r) => ({
      ...r,
      time: format(r.time, "yyyy/MM/dd HH:mm:ss XXX", {
        timeZone: "Asia/Tokyo",
      }),
    }))
  )
}
