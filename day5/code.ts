export default {
  parseInput(input: string): [Map<number, number[]>, number[][]] {
    const lines = input.split("\n");

    const rules: Map<number, number[]> = new Map();
    const updates: number[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("|")) {
        const [page, rule] = line.split("|").map(n => Number.parseInt(n));
        if (Number.isNaN(page)) {
          throw new Error("invalid input");
        }
        if (Number.isNaN(rule)) {
          throw new Error("invalid input");
        }

        if (rules.has(page)) {
          rules.get(page)?.push(rule);
        }
        else {
          rules.set(page, [rule]);
        }
      }
      else if (line.trim()) {
        updates.push(line.split(",").map(n => Number.parseInt(n)));
      }
    }

    return [rules, updates];
  },

  sumMiddle(rules: Map<number, number[]>, updates: number[][]): number {
    let sum = 0;
    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      let valid = true;
      for (let j = 0; j < update.length; j++) {
        const r = rules.get(update[j]);
        if (r) {
          for (let k = 0; k < j; k++) {
            if (r.includes(update[k])) {
              valid = false;
            }
          }
        }
      }
      if (valid) {
        sum += update[Math.floor(update.length / 2)];
      }
    }

    return sum;
  },

  sumInvalidMiddle(rules: Map<number, number[]>, updates: number[][]): number {
    let sum = 0;
    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      let valid = true;
      for (let j = 0; j < update.length; j++) {
        const val = update[j];
        const r = rules.get(update[j]);
        // console.log("rule " + r);
        if (r) {
          for (let k = 0; k < j; k++) {
            if (r.includes(update[k])) {
              valid = false;
              // bump up one in list and try again
              const ruleVal = update[k];
              update.splice(j, 1);
              update.splice(j - 1, 0, val);
              j = -1
              break;
            }
          }
        }
      }
      if (!valid) {
        sum += update[Math.floor(update.length / 2)];
      }
    }

    return sum;
  },
}
