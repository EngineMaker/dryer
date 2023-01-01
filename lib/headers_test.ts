import { assertEquals } from "std/testing/asserts.ts";
import { buildHeaders } from "~/lib/headers.ts";

Deno.test("build API request headers", async () => {
  const headers = await buildHeaders({
    id: "[SECRETzzzzzzzzzzzz]",
    secret: "[SECRETxxxxxxxxxxxxxxxxxxxxxxxx]",
    method: "POST",
    url: "/v1.0/iot-03/devices/72363820c4dd5703cd72/commands",
    accessToken: "[SECRETyyyyyyyyyyyyyyyyyyyyyyyy]",
    body: '{"commands":[{"code":"switch_1","value":true}]}',
    t: "1672352304587",
    nonce: "945948d1-92ad-4fa9-af10-cce6fda8b9f9",
    callId: "SPYU-grPoK5d6Z0U5evah",
  });

  assertEquals(headers, {
    client_id: "[SECRETzzzzzzzzzzzz]",
    sign: "7F9216D7B632D8E0F96307946BBA0CBAD5FC4880A415FD08D4FB2C05D4030873",
    sign_method: "HMAC-SHA256",
    t: "1672352304587",
    nonce: "945948d1-92ad-4fa9-af10-cce6fda8b9f9",
    "Signature-Headers": "area_id:call_id",
    area_id: "Tokyo/Japan",
    call_id: "SPYU-grPoK5d6Z0U5evah",
  });
});
