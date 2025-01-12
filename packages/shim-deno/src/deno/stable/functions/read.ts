///<reference path="../lib.deno.d.ts" />

import { promisify } from "util";
import { read as nodeRead } from "fs";

const _read = promisify(nodeRead);

export const read: typeof Deno.read = async function read(rid, buffer) {
  const { bytesRead } = await _read(rid, buffer, 0, buffer.length, null);
  // node returns 0 on EOF, Deno expects null
  return bytesRead === 0 ? null : bytesRead;
};
