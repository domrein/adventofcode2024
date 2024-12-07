import { test, expect, describe } from "bun:test";
import code from "./code.ts";

const input = `
29|13,
47|13,
47|29,
47|53,
47|61,
53|13,
53|29,
61|13,
61|29,
61|53,
75|13,
75|29,
75|47,
75|53,
75|61,
97|13,
97|29,
97|47,
97|53,
97|61,
97|75,

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

describe("code", () => {
  test("parseInput", () => {
    const [rules, updates] = code.parseInput(input);
    let map = new Map();
    map.set(29, [13]);
    map.set(47, [13, 29, 53, 61]);
    map.set(53, [13, 29]);
    map.set(61, [13, 29, 53]);
    map.set(75, [13, 29, 47, 53, 61]);
    map.set(97, [13, 29, 47, 53, 61, 75]);
    expect(rules).toEqual(map);
    expect(updates).toEqual([
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ]);
  });

  test("sumMiddle", () => {
    const [rules, updates] = code.parseInput(input);
    expect(code.sumMiddle(rules, updates)).toEqual(143);
  });

  test("sumInvalidMiddle", () => {
    const [rules, updates] = code.parseInput(input);
    expect(code.sumInvalidMiddle(rules, updates)).toEqual(123);
  });
});
