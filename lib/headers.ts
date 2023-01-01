import { nanoid } from "nanoid/mod.ts";
import { sign } from "~/lib/sign.ts";
import { hashSHA256 } from "~/lib/digest.ts";

interface BuildHeadersInit {
  id: string;
  secret: string;
  method: string;
  url: string;
  accessToken?: string;
  body?: string;
  t?: string;
  nonce?: string;
  callId?: string;
}

type BuildHeaders = (props: BuildHeadersInit) => Promise<HeadersInit>;

export const buildHeaders: BuildHeaders = async ({
  id,
  secret,
  method,
  url,
  accessToken = "",
  body = "",
  t = new Date().valueOf(),
  nonce = crypto.randomUUID(),
  callId = nanoid(),
}) => {
  const contentDigest = await hashSHA256(body);
  const areaId = "Tokyo/Japan";

  const stringToSign = `${method}
${contentDigest}
area_id:${areaId}
call_id:${callId}

${url}`;

  const str = `${id}${accessToken}${t}${nonce}${stringToSign}`;

  return {
    client_id: id,
    sign: (await sign(secret, str)).toUpperCase(),
    sign_method: "HMAC-SHA256",
    t: `${t}`,
    nonce,
    "Signature-Headers": "area_id:call_id",
    area_id: "Tokyo/Japan",
    call_id: callId,
  };
};
