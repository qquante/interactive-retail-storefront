import type { CurrencyCode, Money } from './types';

const DECIMAL_PATTERN = /^(0|[1-9]\d*)\.\d{2}$/;

export const BRL = 'BRL' as CurrencyCode;

export function money(amount: string, currencyCode: CurrencyCode = BRL): Money {
  assertCanonicalAmount(amount);
  return { amount, currencyCode };
}

export function assertCanonicalAmount(amount: string): void {
  if (!DECIMAL_PATTERN.test(amount)) {
    throw new Error(`Valor monetário inválido: ${amount}`);
  }
}

function normalizeDigits(value: string): string {
  return value.replace(/^0+(?=\d)/, '');
}

function toMinor(amount: string): string {
  assertCanonicalAmount(amount);
  const [whole, fraction] = amount.split('.');
  return normalizeDigits(`${whole}${fraction}`);
}

function fromMinor(value: string): string {
  if (!/^\d+$/.test(value)) {
    throw new Error('Valor monetário interno inválido.');
  }

  const padded = normalizeDigits(value).padStart(3, '0');
  const whole = normalizeDigits(padded.slice(0, -2));
  const fraction = padded.slice(-2);
  return `${whole}.${fraction}`;
}

function addDigits(left: string, right: string): string {
  let carry = 0;
  let output = '';
  let leftIndex = left.length - 1;
  let rightIndex = right.length - 1;

  while (leftIndex >= 0 || rightIndex >= 0 || carry > 0) {
    const leftDigit = leftIndex >= 0 ? left.charCodeAt(leftIndex) - 48 : 0;
    const rightDigit = rightIndex >= 0 ? right.charCodeAt(rightIndex) - 48 : 0;
    const sum = leftDigit + rightDigit + carry;
    output = String(sum % 10) + output;
    carry = Math.floor(sum / 10);
    leftIndex -= 1;
    rightIndex -= 1;
  }

  return normalizeDigits(output);
}

function multiplyDigits(value: string, multiplier: number): string {
  if (multiplier === 0) return '0';
  let output = '0';
  for (let index = 0; index < multiplier; index += 1) {
    output = addDigits(output, value);
  }
  return output;
}

function assertSameCurrency(left: Money, right: Money): void {
  if (left.currencyCode !== right.currencyCode) {
    throw new Error('Não é possível combinar moedas diferentes.');
  }
}

export function addMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  return money(
    fromMinor(addDigits(toMinor(left.amount), toMinor(right.amount))),
    left.currencyCode,
  );
}

export function multiplyMoney(value: Money, quantity: number): Money {
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99) {
    throw new Error('Quantidade inválida para cálculo da fixture.');
  }

  return money(
    fromMinor(multiplyDigits(toMinor(value.amount), quantity)),
    value.currencyCode,
  );
}

export function compareMoney(left: Money, right: Money): number {
  assertSameCurrency(left, right);
  const leftMinor = normalizeDigits(toMinor(left.amount));
  const rightMinor = normalizeDigits(toMinor(right.amount));
  if (leftMinor === rightMinor) return 0;
  if (leftMinor.length !== rightMinor.length) {
    return leftMinor.length < rightMinor.length ? -1 : 1;
  }
  return leftMinor < rightMinor ? -1 : 1;
}

export function formatMoney(value: Money): string {
  assertCanonicalAmount(value.amount);
  if (value.currencyCode !== BRL) {
    return `${value.currencyCode} ${value.amount}`;
  }

  const [whole, fraction] = value.amount.split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$\u00a0${grouped},${fraction}`;
}
