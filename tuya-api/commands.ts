import { buildHeaders } from "~/lib/headers.ts";

interface Command {
  code: string;
  value: unknown;
}

export const postCommand = async (
  clientId: string,
  clientSecret: string,
  deviceId: string,
  commands: Command[],
  accessToken: string,
) => {
  const body = JSON.stringify({ commands });
  const headers = await buildHeaders({
    id: clientId,
    secret: clientSecret,
    method: "POST",
    url: `/v1.0/iot-03/devices/${deviceId}/commands`,
    accessToken,
    body,
  });

  return fetch(
    `https://openapi-ueaz.tuyaus.com/v1.0/iot-03/devices/${deviceId}/commands`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken,
        ...headers,
      },
      body,
    },
  ).then((r) => r.json());
};
