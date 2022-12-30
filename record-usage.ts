import { loadSync } from 'https://deno.land/std@0.170.0/dotenv/mod.ts'
import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts'

interface Usage extends Record<string, unknown> {
  deviceId: string
  current: number
  power: number
  voltage: number
  time: Date
}

export const recordUsage = async (usage: Usage) => {
  loadSync({ export: true })

  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_CERT_URL } =
    Deno.env.toObject()

  const client = new Client({
    database: DB_NAME,
    hostname: DB_HOST,
    port: parseInt(DB_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    tls: {
      caCertificates: [await fetch(DB_CERT_URL).then(r => r.text())],
    },
  })

  await client.connect()

  // const usage = {
  //   deviceId: '72363820c4dd5703cd72',
  //   current: 404,
  //   power: 243,
  //   voltage: 1014,
  //   time: new Date(1672368499699),
  // }

  await client.queryArray(
    `INSERT INTO power_usages (device_id, current, power, voltage, time)
     VALUES ($deviceId, $current, $power, $voltage, $time)`,
    usage
  )
}
