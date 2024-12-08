import code from "./code.ts";

const loadInput = async (): Promise<string> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text;
}

const equations = code.parseEquations(await loadInput());
const sum = code.sumSolvableEquations(equations);
console.log(`sum: ${sum}`);
