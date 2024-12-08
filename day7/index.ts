import code from "./code.ts";

const loadInput = async (): Promise<string> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text;
}

const equations = code.parseEquations(await loadInput());
const sum = code.sumSolvableEquations(equations);
console.log(`sum: ${sum}`);

const sum2 = code.sumSolvableEquations2(equations);
console.log(`sum2: ${sum2}`);
