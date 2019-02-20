import { percentToDecimal, moneyRound, realRateOfReturn, futureValue, valueAfterTax } from './formulas';

// Percent to Decimal
test('should return the decimal representation of the percentage', () => {
  expect(percentToDecimal(5)).toBe(0.05);
  expect(percentToDecimal(0)).toBe(0);
  expect(percentToDecimal(-3)).toBe(-0.03);
});

// Javascript rounding sometimes fails with flaoting points
test('should round as you would expect', () => {
  expect(moneyRound(1.005, 2)).toBe(1.01);
  expect(moneyRound(1.05, 2)).toBe(1.05);
  expect(moneyRound(1)).toBe(1.0);
});

test('should round to a default of 2 places', () => {
  const longDecimal = 1.9417475728155331;
  expect(moneyRound(longDecimal)).toBe(1.94);
});

// Real Rate of Return = ((1 + nominal rate) / (1 + inflation rate)) -1
test('should return a real rate of return based on nominal rate and inflation rate', () => {
  const nominalRate = 6;
  const inflationRate = 3;
  const realRatePercentage = 2.9126213592232997;

  expect(realRateOfReturn(nominalRate, inflationRate)).toBe(realRatePercentage);
});

// Future Value = Present Value * ( 1 + rate of return in decimal)^number of periods
test('should return future value based on formula above', () => {
  const presentValue = 1000;
  const rateOfReturn = 0.005;
  const numberOfPeriods = 12;

  expect(futureValue(presentValue, rateOfReturn, numberOfPeriods)).toBe(1061.6778118644977);
});

test('should return value after tax', () => {
  const value = 1000;
  const tax = 40;

  expect(valueAfterTax(value, tax)).toBe(600);
});
