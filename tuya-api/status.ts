import { buildHeaders } from "~/lib/headers.ts";

type Status = [
  { code: "switch_1"; value: boolean },
  { code: "countdown_1"; value: number },
  { code: "add_ele"; value: number },
  { code: "cur_current"; value: number },
  { code: "cur_power"; value: number },
  { code: "cur_voltage"; value: number },
];

export interface StatusResult {
  result: Status;
  success: boolean;
  t: number;
  tid: string;
}

export const getStatus = async (
  clientId: string,
  clientSecret: string,
  deviceId: string,
  accessToken: string,
): Promise<StatusResult> => {
  const method = "GET";
  const path = `/v1.0/iot-03/devices/${deviceId}/status`;
  const headers = await buildHeaders({
    id: clientId,
    secret: clientSecret,
    method,
    url: path,
    accessToken,
  });

  return fetch(`https://openapi-ueaz.tuyaus.com${path}`, {
    method: "GET",
    headers: {
      access_token: accessToken,
      ...headers,
    },
  }).then((r) => r.json());
};
