import { buildHeaders } from "~/lib/headers.ts";

export const getToken = async (clientId: string, clientSecret: string) => {
  const headers = await buildHeaders({
    id: clientId,
    secret: clientSecret,
    method: "GET",
    url: "/v1.0/token?grant_type=1",
  });

  return fetch("https://openapi-ueaz.tuyaus.com/v1.0/token?grant_type=1", {
    method: "GET",
    headers,
  })
    .then((r) => r.json())
    .then((j) => j.result.access_token);
};
