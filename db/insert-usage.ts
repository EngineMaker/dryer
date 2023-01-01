import { newClient } from "~/db/client.ts";

interface Usage extends Record<string, unknown> {
  deviceId: string;
  current: number;
  power: number;
  voltage: number;
  time: Date;
}

export const insertUsage = async (usage: Usage) => {
  const db = await newClient();
  await db.queryArray(
    `INSERT INTO power_usages (device_id, current, power, voltage, time)
     VALUES ($deviceId, $current, $power, $voltage, $time)`,
    usage,
  );
};

if (import.meta.main) {
  const usage = {
    deviceId: "72363820c4dd5703cd72",
    current: 777,
    power: 888,
    voltage: 1024,
    time: new Date(),
  };

  insertUsage(usage);
}
