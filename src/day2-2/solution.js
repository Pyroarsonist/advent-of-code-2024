import { inRange } from "./math";

const MIN_VAL = 1;
const MAX_VAL = 3;

const safe = (_report, isTolerated = false) => {
  const report = [..._report];

  let sign;
  for (let i = 0; i < report.length - 1; i++) {
    const isSafeWithoutSingleLevel = () => {
      if (isTolerated) return false;

      for (const index of [0, i, i + 1]) {
        const newReport = _report.toSpliced(index, 1);
        const isSafe = safe(newReport, true);
        if (isSafe) return true;
      }

      return false;
    };

    const currLevel = report[i];
    const nextLevel = report[i + 1];

    const diff = nextLevel - currLevel;

    const currSign = Math.sign(diff);

    if (![1, -1].includes(currSign)) {
      return isSafeWithoutSingleLevel();
    }

    if (!sign) sign = currSign;

    if (sign !== currSign) {
      return isSafeWithoutSingleLevel();
    }

    const absDiff = Math.abs(diff);

    const diffInRange = inRange(absDiff, MIN_VAL, MAX_VAL, true);

    if (!diffInRange) {
      return isSafeWithoutSingleLevel();
    }
  }

  return true;
};

export const getSolution = (reports) => {
  const safeReports = reports.filter((report) => safe(report));

  return safeReports.length;
};
