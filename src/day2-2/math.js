export const inRange = (value, start, end, inclusive = false) =>
  inclusive ? value >= start && value <= end : value >= start && value < end;
