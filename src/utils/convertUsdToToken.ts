import BigNumber from 'bignumber.js';
import Token from '../models/Token';
import envs from '../config/envs';

const convertUsdToToken = async (symbol: string, usdAmount: string) => {
  const { CRYPTO_COMPARE_API } = envs()

  const token = await Token.findOne({ symbol });

  if (!token) {
    return "0"
  }

  const response = await fetch(
    `${CRYPTO_COMPARE_API}/data/price?fsym=${symbol}&tsyms=usd`,
  );

  if (response.status >= 400) {
    throw 'Failed to get token price';
  }

  const result = await response.json();

  const amount = new BigNumber(usdAmount).div(result.USD).toFixed(18)

  return amount
};

export default convertUsdToToken;
