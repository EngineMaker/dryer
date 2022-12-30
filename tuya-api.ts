import { loadSync } from 'https://deno.land/std@0.170.0/dotenv/mod.ts'

import { postCommand } from './api/commands.ts'
import { getToken } from './api/token.ts'

interface CallTuyaAPIProps {
  clientId: string
  clientSecret: string
  deviceId: string
  commands: Command[]
}

interface Command {
  code: string
  value: unknown
}

type CallTuyaAPI = (props: CallTuyaAPIProps) => Promise<any>

export const callTuyaAPI: CallTuyaAPI = async ({
  clientId,
  clientSecret,
  deviceId,
  commands,
}) => {
  const accessToken = await getToken(clientId, clientSecret)

  return postCommand(clientId, clientSecret, deviceId, commands, accessToken)
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts

if (import.meta.main) {
  const { TUYA_CLIENT_ID, TUYA_CLIENT_SECRET } = loadSync()

  callTuyaAPI({
    clientId: TUYA_CLIENT_ID,
    clientSecret: TUYA_CLIENT_SECRET,
    deviceId: '72363820c4dd5703cd72',
    commands: [{ code: 'switch_1', value: true }],
  }).then(r => console.log(r))
}
