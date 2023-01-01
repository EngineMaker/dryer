import { load } from "std/dotenv/mod.ts";
import { Client } from "postgres/mod.ts";

export const newClient = async () => {
  await load({ export: true });

  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_CERT_URL } =
    Deno.env.toObject();

  const client = new Client({
    database: DB_NAME,
    hostname: DB_HOST,
    port: parseInt(DB_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    tls: {
      caCertificates: [await fetch(DB_CERT_URL).then((r) => r.text())],
    },
  });

  await client.connect();
  return client;
};
