import { newClient } from "~/db/client.ts";
import sub from "date-fns/sub";

interface UsageHistoryOptions {
  id?: number;
  from?: Date;
  to?: Date;
  limit?: number;
}

export const usageHistory = async (
  deviceId: string,
  opts: UsageHistoryOptions,
) => {
  const {
    id = undefined,
    from = sub(new Date(), { days: 1 }),
    to = new Date(),
    limit = 1000,
  } = opts;
  const db = await newClient();

  const { rows } = await db.queryObject<{ power: BigInt; time: Date }>(
    `SELECT power, time
    FROM power_usages
    WHERE device_id = $deviceId and time >= $from and time <= $to
    ORDER BY id desc
    LIMIT $limit`,
    { deviceId, id, from, to, limit },
  );

  return rows.map((r) => ({ power: Number(r.power), time: r.time }));
};
