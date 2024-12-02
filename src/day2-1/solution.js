import { inRange } from "./math";

const MIN_VAL = 1;
const MAX_VAL = 3;

const safe = (report) => {
  let sign;
  for (let i = 0; i < report.length - 1; i++) {
    const currLevel = report[i];
    const nextLevel = report[i + 1];

    const diff = nextLevel - currLevel;

    const currSign = Math.sign(diff);

    if (![1, -1].includes(currSign)) {
      return false;
    }

    if (!sign) sign = currSign;

    if (sign !== currSign) {
      return false;
    }

    const absDiff = Math.abs(diff);

    const diffInRange = inRange(absDiff, MIN_VAL, MAX_VAL, true);

    if (!diffInRange) {
      return false;
    }
  }

  return true;
};

export const getSolution = (reports) => {
  const safeReports = reports.filter((report) => safe(report));

  return safeReports.length;
};
