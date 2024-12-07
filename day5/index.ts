import code from "./code.ts";

const loadInput = async (): Promise<string> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text;
}

const input = await loadInput();
let [rules, updates] = code.parseInput(input);

console.log(`middle sum: ${code.sumMiddle(rules, updates)}`);

console.log(`invalid middle sum: ${code.sumInvalidMiddle(rules, updates)}`);
