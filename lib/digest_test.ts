import { assertEquals } from "std/testing/asserts.ts";
import { hashSHA256 } from "~/lib/digest.ts";

Deno.test("sha256 hash digest", async () => {
  const hash = await hashSHA256("message");
  assertEquals(
    hash,
    "ab530a13e45914982b79f9b7e3fba994cfd1f3fb22f71cea1afbf02b460c6d1d",
  );
});
