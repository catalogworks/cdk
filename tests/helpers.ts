// test helpers
// helpers.ts

import {Catalog__factory} from '@catalogworks/catalog-contracts/dist/types/typechain';
import {Wallet} from '@ethersproject/wallet';
import {
  ZoraModuleManager__factory,
  WETH__factory,
  AsksV11__factory,
  ERC20TransferHelper__factory,
  ERC721TransferHelper__factory,
  RoyaltyEngineV1__factory,
  ZoraProtocolFeeSettings__factory,
  TestERC721__factory,
} from '@zoralabs/v3/dist/typechain';
import {Contract} from 'ethers';

// Type def for catalog protocol contracts
export type CatalogConfiguredAddresses = {
  cnft: string;
};

export type ZoraConfiguredAddresses = {
  asksV11: string;
  moduleManager: string;
  weth: string;
  erc20TransferHelper: string;
  erc721TransferHelper: string;
  royaltyEngineV1: string;
  zoraProtocolFeeSettings: string;
  erc721: string;
  erc721Test: Contract;
  moduleManagerTest: Contract;
  wethTest: Contract;
};

export async function setupCatalog(
  wallet: Wallet
): Promise<CatalogConfiguredAddresses> {
  // setup the catalog shared creator contract (cnft)
  const cnft = await (await new Catalog__factory(wallet).deploy())._deployed();

  await cnft.deployTransaction.wait();
  const cnftAddress = cnft.address;

  return {
    cnft: cnftAddress,
  };
}
// Nasty helper function to deploy required zora protocol modules
export async function setupZora(
  wallet: Wallet
): Promise<ZoraConfiguredAddresses> {
  // setup dummy ERC721 contract
  const erc721Test = await (
    await new TestERC721__factory(wallet).deploy()
  )._deployed();

  await erc721Test.deployTransaction.wait();
  const erc721TestAddress = erc721Test.address;

  // setup the protocol fee settings contract
  const zoraProtocolFeeSettings = await (
    await new ZoraProtocolFeeSettings__factory(wallet).deploy()
  )._deployed();
  await zoraProtocolFeeSettings.deployTransaction.wait();
  const zoraProtocolFeeSettingsAddress = zoraProtocolFeeSettings.address;

  // setup WETH contract so we have an ERC20 for fees
  const weth = await (await new WETH__factory(wallet).deploy())._deployed();
  await weth.deployTransaction.wait();
  const wethAddress = weth.address;

  // setup the zora module manager contract (moduleManager)
  const moduleManager = await (
    await new ZoraModuleManager__factory(wallet).deploy(
      wallet.address,
      zoraProtocolFeeSettingsAddress
    )
  )._deployed();
  await moduleManager.deployTransaction.wait();
  const moduleManagerAddress = moduleManager.address;

  // init settings
  const initSettings = await zoraProtocolFeeSettings.init(
    moduleManagerAddress,
    erc721TestAddress
  );
  await initSettings.wait();

  // setup Transfer Helpers
  const erc20TransferHelper = await (
    await new ERC20TransferHelper__factory(wallet).deploy(moduleManagerAddress)
  )._deployed();
  await erc20TransferHelper.deployTransaction.wait();
  const erc20TransferHelperAddress = erc20TransferHelper.address;

  const erc721TransferHelper = await (
    await new ERC721TransferHelper__factory(wallet).deploy(moduleManagerAddress)
  )._deployed();
  await erc721TransferHelper.deployTransaction.wait();
  const erc721TransferHelperAddress = erc721TransferHelper.address;

  // Setup royalty Engine
  const royaltyEngineV1 = await (
    await new RoyaltyEngineV1__factory(wallet).deploy()
  )._deployed();
  await royaltyEngineV1.deployTransaction.wait();
  const royaltyEngineV1Address = royaltyEngineV1.address;

  // setup the asksV11 contract (asksV11)
  const asksV11 = await (
    await new AsksV11__factory(wallet).deploy(
      erc20TransferHelperAddress,
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();

  await asksV11.deployTransaction.wait();
  const asksV11Address = asksV11.address;

  return {
    asksV11: asksV11Address,
    moduleManager: moduleManagerAddress,
    weth: wethAddress,
    erc20TransferHelper: erc20TransferHelperAddress,
    erc721TransferHelper: erc721TransferHelperAddress,
    royaltyEngineV1: royaltyEngineV1Address,
    zoraProtocolFeeSettings: zoraProtocolFeeSettingsAddress,
    erc721: erc721TestAddress,
    erc721Test: erc721Test,
    moduleManagerTest: moduleManager,
    wethTest: weth,
  };
}
