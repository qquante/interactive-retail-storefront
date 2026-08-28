export {
  FIXTURE_BANNER,
  FIXTURE_COLLECTIONS,
  FIXTURE_PRODUCTS,
  FIXTURE_PROVENANCE,
  FIXTURE_SUMMARY,
  findFixtureProductByHandle,
  findFixtureVariant,
} from './fixture-data';
export {
  FixtureCommerceAdapter,
  buildFixtureCartSnapshot,
  fixtureCommerce,
  prepareFixtureHandoff,
} from './fixture-adapter';
export type { FixtureCartDraft, FixtureCartLineInput } from './fixture-adapter';
export { BRL, addMoney, compareMoney, formatMoney, money, multiplyMoney } from './money';
export type * from './types';

