function rangeValue(value: number, step1: number = 1, step2: number = 2): number {
  const temp: number = Math.random();
  if (temp > 0.5) {
    return temp * value - step1 / value;
  } else {
    return temp * value + value / step2;
  }
}

function rangeVal(val1: number): number {
  const temp1: number = Math.random();
  const temp2: number = Math.random();
  return temp2 > 0.5 ? val1 * temp1 * -1 : val1 * temp1;
}

export { rangeValue, rangeVal }
