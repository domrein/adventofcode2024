import { test, expect, describe } from "bun:test";
import code from "./code.ts";

const input = "2333133121414131402";

describe("code", () => {
  test("parseMap", () => {
    const map = code.parseMap(input);
    expect(map).toEqual([
      0,
      0,
      -1,
      -1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      -1,
      2,
      -1,
      -1,
      -1,
      3,
      3,
      3,
      -1,
      4,
      4,
      -1,
      5,
      5,
      5,
      5,
      -1,
      6,
      6,
      6,
      6,
      -1,
      7,
      7,
      7,
      -1,
      8,
      8,
      8,
      8,
      9,
      9,
    ]);
  });

  test("generateChecksum", () => {
    const map = code.parseMap(input);
    const checksum = code.generateChecksum(map);
    expect(checksum).toEqual(BigInt(1928));
  });

  test("generateChecksumBlock", () => {
    const mapBlock = code.parseMap(input);
    const checksumBlock = code.generateChecksumBlock(mapBlock);
    expect(checksumBlock).toEqual(BigInt(2858));
  });
});
