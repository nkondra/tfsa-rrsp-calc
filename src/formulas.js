export function decimalToPercent(number) {
  return number * 100;
}

export function percentToDecimal(number) {
  return number / 100;
}

export function formatPrice(value) {
  return moneyRound(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

// using exponent notation to calculate rounding variables correctly.
// Number((1.005).toFixed(2)); would give 1 instead of 1.01
export function moneyRound(value, decimals = 2) {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}

export function realRateOfReturn(nominalRate, inflationRate) {
  return decimalToPercent((1 + percentToDecimal(nominalRate)) / (1 + percentToDecimal(inflationRate)) - 1);
}

export function futureValue(currentValue, rateOfReturn, numberOfPeroids) {
  return currentValue * (1 + rateOfReturn) ** numberOfPeroids;
}

export function valueAfterTax(value, tax) {
  return value - value * percentToDecimal(tax);
}

export function valueOfTax(value, tax) {
  return value * percentToDecimal(tax);
}
