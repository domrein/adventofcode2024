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

export default {
  calcDist,
}

const input = Bun.file("./input.txt");
const text = await input.text();
// console.log(text);
const rows = text.split("\n");
// console.log(rows);
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
console.log(calcDist(list1, list2));
