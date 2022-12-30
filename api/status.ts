import { buildHeaders } from '../headers.ts'

export const getStatus = async (
  clientId: string,
  clientSecret: string,
  deviceId: string,
  accessToken: string
) => {
  const method = 'GET'
  const path = `/v1.0/iot-03/devices/${deviceId}/status`
  const headers = await buildHeaders({
    id: clientId,
    secret: clientSecret,
    method,
    url: path,
    accessToken,
  })

  return fetch(`https://openapi-ueaz.tuyaus.com${path}`, {
    method: 'GET',
    headers: {
      access_token: accessToken,
      ...headers,
    },
  }).then(r => r.json())
}
