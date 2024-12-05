const sumMul = (text: string): number => {
  let matches = text.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);

  let sum = 0;
  for (const match of matches) {
    let [first, second] = match[0]
      .split(",")
      .map(m => Number.parseInt(m.replaceAll(/[^\d]/g, "")));
    sum += first * second;
  }

  return sum;
};

const sumConditionalMul = (text: string): number => {
  let matches = text.matchAll(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);

  let sum = 0;
  let enabled = true;
  for (const match of matches) {
    if (match[0] === "don't()") {
      enabled = false;
      continue;
    }
    if (match[0] === "do()") {
      enabled = true;
      continue;
    }

    if (enabled) {
      let [first, second] = match[0]
        .split(",")
        .map(m => Number.parseInt(m.replaceAll(/[^\d]/g, "")));
      sum += first * second;
    }
  }

  return sum;
};

const loadProgram = async (): Promise<string> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text;
}

export default {
  sumMul,
  sumConditionalMul,
}

let program = await loadProgram();
console.log(`sum: ${sumMul(program)}`);

program = await loadProgram();
console.log(`safe reports: ${sumConditionalMul(program)}`);
