import { recordUsage } from './record-usage.ts'

const usage = {
  deviceId: '72363820c4dd5703cd72',
  current: 404,
  power: 243,
  voltage: 1014,
  time: new Date(1672368499699),
}

await recordUsage(usage)
