import { test, expect, describe } from "bun:test";
import index from "./index.ts";

describe("index", () => {
  test("sumMul", () => {
    const corruptedText = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

    expect(index.sumMul(corruptedText)).toEqual(161);
  });

  test("sumConditionalMul", () => {
    const corruptedText = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

    expect(index.sumConditionalMul(corruptedText)).toEqual(48);
  });
});
