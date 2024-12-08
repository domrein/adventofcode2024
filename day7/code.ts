interface Point {
  x: number
  y: number
}

interface Guard extends Point {
  facing: "up"|"down"|"left"|"right"
}

export default {
  parseEquations(input: string): {left: number, right: number[]}[] {
    const lines = input
      .split("\n")
      .filter(l => l.trim());

    const equations: {left: number, right: number[]}[]  = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      equations.push({
        left: Number.parseInt(line.split(":")[0].trim()),
        right: line.split(":")[1].split(" ").filter(s => s.trim()).map(n => Number.parseInt(n)),
      });
    }

    return equations;
  },

  sumSolvableEquations(equations: {left: number, right: number[]}[]): number {
    let total = 0;
    for (let i = 0; i < equations.length; i++) {
      const equation = equations[i];
      for (let j = 0; j < 2 ** (equation.right.length - 1); j++) {
        const operands = [];
        for (let k = 0; k < equation.right.length - 1; k++) {
          const mask = 1 << k;
          if ((j & mask) === 0) {
            operands.push("+");
          }
          else {
            operands.push("*");
          }
        }
        const right = [...equation.right];
        let sum = right[0];
        for (let k = 0; k < operands.length; k++) {
          if (operands[k] === "+") {
            sum += right[k+1];
          }
          else {
            sum *= right[k+1];
          }
        }
        if (sum === equation.left) {
          total += equation.left;
          break;
        }
      }
    }

    return total;
  },
}
