const countSafe = (reports: number[][]) => {
  let safeCount = 0;
  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];
    let safe = true;
    let ordering = 0; // 0 = unknown, 1 = ascending, 2 = descending
    for (let j = 0; j < report.length - 1; j++) {
      const val = report[j];
      const nextVal = report[j + 1];
      const distance = nextVal - val;
      if (Math.abs(distance) > 3 || distance === 0) {
        safe = false;
      }
      if (ordering === 1 && distance < 0) {
        safe = false;
      }
      if (ordering === 2 && distance > 0) {
        safe = false;
      }
      if (!ordering && distance > 0) {
        ordering = 1;
      }
      if (!ordering && distance < 0) {
        ordering = 2;
      }
    }
    if (safe) {
      safeCount++;
    }
  }

  return safeCount;
};

const parseReports = async (): Promise<number[][]> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  const rows = text.split("\n");
  const reports: number[][] = [];
  for (let i = 0; i < rows.length; i++) {
    const trimmed = rows[i].trim();

    if (!trimmed) {
      continue;
    }

    let vals = trimmed.split(/\s+/);
    let report: number[] = [];

    for (let j = 0; j < vals.length; j++) {
      let val = Number.parseInt(vals[j]);
      if (Number.isNaN(val)) {
        throw new Error("Invalid input");
      }
      report.push(val);
    }
    reports.push(report);
  }

  return reports;
}

export default {
  countSafe,
}

let list = await parseReports();
console.log(`safe reports: ${countSafe(list)}`);
