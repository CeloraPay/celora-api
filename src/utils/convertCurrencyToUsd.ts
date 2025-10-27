import BigNumber from 'bignumber.js';

const convertCurrencyToUsd = (amount: string, rate: number) => {
  const bn = new BigNumber(amount)
    .times(1 / rate)
    .times(1.02)
    .toFixed(4);

  return bn;
};

export default convertCurrencyToUsd;
