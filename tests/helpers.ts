// test helpers
// helpers.ts

import {Catalog__factory} from '@catalogworks/catalog-contracts/dist/types/typechain';
import {Wallet} from '@ethersproject/wallet';
import {BigNumber} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {MaxUint256} from '@ethersproject/constants';

// Type def for catalog protocol contracts
export type CatalogConfiguredAddresses = {
  cnft: string;
};

export async function setupCatalog(
  wallet: Wallet
): Promise<CatalogConfiguredAddresses> {
  // setup the catalog shared creator contract (cnft)
  const cnft = await (
    await (await new Catalog__factory(wallet)).deploy()
  )._deployed();
  // console.log('cnft: ', cnft.deployTransaction);
  console.log('wallet:', wallet.address);
  const cnftAddress = cnft.address;

  return {
    cnft: cnftAddress,
  };
}
