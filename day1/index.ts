const calcDist = (l1: number[], l2: number[]): number => {
  if (l1.length !== l2.length) {
    throw new Error("Cannot calc distance because lengths differ");
  }

  // sort each list ascending
  l1.sort((a, b) => a - b);
  l2.sort((a, b) => a - b);

  let dist = 0;
  // compare each pair and save off distance
  for (let i = 0; i < l1.length; i++) {
    dist += Math.abs(l1[i] - l2[i]);
  }

  return dist;
};

const calcSimilarity = (l1: number[], l2: number[]): number => {
  let similarity = 0;

  for (let i = 0; i < l1.length; i++) {
    let val = l1[i];
    let matchCount = 0;
    for (let j = 0; j < l2.length; j++) {
      if (val === l2[j]) {
        matchCount++;
      }
    }
    similarity += val * matchCount;
  }

  return similarity;
};

const parseLists = async (): Promise<number[][]> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  const rows = text.split("\n");
  const list1: number[] = [];
  const list2: number[] = [];
  for (let i = 0; i < rows.length; i++) {
    const trimmed = rows[i].trim();

    if (!trimmed) {
      continue;
    }

    let [r1, r2] = trimmed.split(/\s+/);

    let val1 = Number.parseInt(r1);
    let val2 = Number.parseInt(r2);

    if (Number.isNaN(val1)) {
      throw new Error("Invalid input");
    }
    if (Number.isNaN(val2)) {
      throw new Error("Invalid input");
    }

    list1.push(val1);
    list2.push(val2);
  }

  return [list1, list2];
}

export default {
  calcDist,
  calcSimilarity,
  parseLists,
}

let [list1, list2] = await parseLists();
console.log(`distance score: ${calcDist(list1, list2)}`);

[list1, list2] = await parseLists();
console.log(`similarity score: ${calcSimilarity(list1, list2)}`);
