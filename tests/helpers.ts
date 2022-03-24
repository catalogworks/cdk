// test helpers
// helpers.ts

import {Catalog__factory} from '@catalogworks/catalog-contracts/dist/types/typechain';
import {Wallet} from '@ethersproject/wallet';
import {
  ZoraModuleManager__factory,
  AsksV11__factory,
  ERC20TransferHelper__factory,
  ERC721TransferHelper__factory,
  ZoraProtocolFeeSettings__factory,
  OffersV1__factory,
  ReserveAuctionCoreEth__factory,
  ReserveAuctionCoreErc20__factory,
  ReserveAuctionFindersEth__factory,
  ReserveAuctionFindersErc20__factory,
  ReserveAuctionListingEth__factory,
  ReserveAuctionListingErc20__factory,
} from '@zoralabs/v3/dist/typechain';
import {Contract} from 'ethers';

// smh - manually copied helper types/contracts from previous version of '@zoralabs/v3'
import {
  WETH__factory,
  RoyaltyEngineV1__factory,
  TestERC721__factory,
} from './v3helpers/typechain';

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
  offersV1: string;
};

export type ZoraReserveAuctionConfiguredAddresses = {
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
  reserveAuctionETH: string;
  reserveAuctionERC20: string;
  reserveAuctionFindersETH: string;
  reserveAuctionFindersERC20: string;
  reserveAuctionListingETH: string;
  reserveAuctionListingERC20: string;
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

export async function setupZoraAuctions(
  wallet: Wallet
): Promise<ZoraReserveAuctionConfiguredAddresses> {
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

  // SETUP RESERVE AUCTION MODULES

  const reserveAuctionETH = await (
    await new ReserveAuctionCoreEth__factory(wallet).deploy(
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();
  await reserveAuctionETH.deployTransaction.wait();
  const reserveAuctionETHAddress = reserveAuctionETH.address;

  const reserveAuctionERC20 = await (
    await new ReserveAuctionCoreErc20__factory(wallet).deploy(
      erc20TransferHelperAddress,
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();
  await reserveAuctionERC20.deployTransaction.wait();
  const reserveAuctionERC20Address = reserveAuctionERC20.address;

  const reserveAuctionFindersETH = await (
    await new ReserveAuctionFindersEth__factory(wallet).deploy(
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();
  await reserveAuctionFindersETH.deployTransaction.wait();
  const reserveAuctionFindersETHAddress = reserveAuctionFindersETH.address;

  const reserveAuctionFindersERC20 = await (
    await new ReserveAuctionFindersErc20__factory(wallet).deploy(
      erc20TransferHelperAddress,
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();
  await reserveAuctionFindersERC20.deployTransaction.wait();
  const reserveAuctionFindersERC20Address = reserveAuctionFindersERC20.address;

  const reserveAuctionListingETH = await (
    await new ReserveAuctionListingEth__factory(wallet).deploy(
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();
  await reserveAuctionListingETH.deployTransaction.wait();
  const reserveAuctionListingETHAddress = reserveAuctionListingETH.address;

  const reserveAuctionListingERC20 = await (
    await new ReserveAuctionListingErc20__factory(wallet).deploy(
      erc20TransferHelperAddress,
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();
  await reserveAuctionListingERC20.deployTransaction.wait();
  const reserveAuctionListingERC20Address = reserveAuctionListingERC20.address;

  return {
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
    reserveAuctionETH: reserveAuctionETHAddress,
    reserveAuctionERC20: reserveAuctionERC20Address,
    reserveAuctionFindersETH: reserveAuctionFindersETHAddress,
    reserveAuctionFindersERC20: reserveAuctionFindersERC20Address,
    reserveAuctionListingETH: reserveAuctionListingETHAddress,
    reserveAuctionListingERC20: reserveAuctionListingERC20Address,
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

  // setup offers v1 contract
  const offersV1 = await (
    await new OffersV1__factory(wallet).deploy(
      erc20TransferHelperAddress,
      erc721TransferHelperAddress,
      royaltyEngineV1Address,
      zoraProtocolFeeSettingsAddress,
      wethAddress
    )
  )._deployed();

  await offersV1.deployTransaction.wait();
  const offersV1Address = offersV1.address;

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
    offersV1: offersV1Address,
  };
}
