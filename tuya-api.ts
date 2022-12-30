import { load } from 'https://deno.land/std@0.170.0/dotenv/mod.ts'

import { postCommand } from './api/commands.ts'
import { getStatus } from './api/status.ts'
import { getToken } from './api/token.ts'

export interface CallTuyaAPIProps {
  clientId: string
  clientSecret: string
  deviceId: string
  api: API
  commands?: Command[]
}

interface Command {
  code: string
  value: unknown
}

type API = 'command' | 'status'

type CallTuyaAPI = (props: CallTuyaAPIProps) => Promise<unknown>

export const callTuyaAPI: CallTuyaAPI = async ({
  clientId,
  clientSecret,
  deviceId,
  api,
  commands,
}) => {
  const accessToken = await getToken(clientId, clientSecret)

  if (api === 'status') {
    return getStatus(clientId, clientSecret, deviceId, accessToken)
  } else if (api === 'command') {
    return postCommand(
      clientId,
      clientSecret,
      deviceId,
      commands || [],
      accessToken
    )
  }
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts

if (import.meta.main) {
  await load({ export: true })

  const { TUYA_CLIENT_ID, TUYA_CLIENT_SECRET } = Deno.env.toObject()

  callTuyaAPI({
    clientId: TUYA_CLIENT_ID,
    clientSecret: TUYA_CLIENT_SECRET,
    deviceId: '72363820c4dd5703cd72',
    api: 'command',
    commands: [{ code: 'switch_1', value: false }],
  }).then(r => console.log(r))
}
