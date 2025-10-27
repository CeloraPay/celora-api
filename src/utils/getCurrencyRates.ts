import { vsCurrencies } from '../constants/currencies';
import { BASE_CURRENCY, COIN_GECKO_API } from '../constants/api';

type Rates = Record<string, number>;

export const getCoinGeckoRates = async () => {
  const response = await fetch(
    `${COIN_GECKO_API}/simple/price?ids=${BASE_CURRENCY}&vs_currencies=${vsCurrencies}`,
  );

  if (response.status >= 400) {
    throw 'Failed to get currencies';
  }

  const result = await response.json();
  const rates = result.usd as Rates;

  return rates;
};

const getCurrencyRates = async () => {
  const coinGeckoRates = await getCoinGeckoRates();

  return coinGeckoRates;
};

export default getCurrencyRates;
