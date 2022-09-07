// addresses.ts
// Utility File to store deployed addresses relative to SDK

import rinkebyAddresses from '@catalogworks/catalog-contracts/dist/addresses/4.json';
import mainnetAddresses from '@catalogworks/catalog-contracts/dist/addresses/1.json';
import goerliAddresses from '@catalogworks/catalog-contracts/dist/addresses/5.json';

import ZoraRinkebyAddresses from '@zoralabs/v3/dist/addresses/4.json';
import ZoraMainnetAddresses from '@zoralabs/v3/dist/addresses/1.json';
import ZoraGoerliAddresses from '@zoralabs/v3/dist/addresses/5.json';

// AddressBook Interface for Catalog Contracts
export interface AddressBook {
  [key: string]: {
    [key: string]: string;
  };
}

// Mapping of network names to addresses
export const addresses: AddressBook = {
  rinkeby: rinkebyAddresses,
  mainnet: mainnetAddresses,
  goerli: goerliAddresses,
};

export const zoraAddresses: AddressBook = {
  rinkeby: {
    moduleManager: ZoraRinkebyAddresses.ZoraModuleManager,
    asks: ZoraRinkebyAddresses.AsksV1_1,
    erc721TransferHelper: ZoraRinkebyAddresses.ERC721TransferHelper,
    erc20TransferHelper: ZoraRinkebyAddresses.ERC20TransferHelper,
    offers: ZoraRinkebyAddresses.OffersV1,
    reserveAuctionCoreEth: ZoraRinkebyAddresses.ReserveAuctionCoreEth,
    reserveAuctionCoreErc20: ZoraRinkebyAddresses.ReserveAuctionCoreErc20,
    reserveAuctionFindersEth: ZoraRinkebyAddresses.ReserveAuctionFindersEth,
    reserveAuctionFindersErc20: ZoraRinkebyAddresses.ReserveAuctionFindersErc20,
    reserveAuctionListingEth: ZoraRinkebyAddresses.ReserveAuctionListingEth,
    reserveAuctionListingErc20: ZoraRinkebyAddresses.ReserveAuctionListingErc20,
  },
  /// NOTE: I am hardcoding these due to inconsitent package support from Zora
  goerli: {
    moduleManager: ZoraGoerliAddresses.ZoraModuleManager,
    erc20TransferHelper: ZoraGoerliAddresses.ERC20TransferHelper,
    erc721TransferHelper: ZoraGoerliAddresses.ERC721TransferHelper,
    /// NOTE: AsksV1.1 goerli deployment address from here (not available in package) https://github.com/richardryangarcia/zora-v3-ask-goerli
    asks: '0x4Ae7072bbfF93F452855d32Bf90E1230Bf7deB26',
    offers: '',
    reserveAuctionCoreEth: '0x2506d9f5a2b0e1a2619bcce01cd3e7c289a13163',
    reserveAuctionCoreErc20: '0x1ee71c10e7dd6c7fbdc891de4e902e041e1f5d33',
    reserveAuctionFindersEth: '0x29a6237e646a5a189db197a48cb96fa7944a32a2',
    reserveAuctionFindersErc20: '0x36ab5200426715a9dd414513912970cb7d659b3c',
    reserveAuctionListingEth: '0xfcebe0788d5772df2cbcf5079815de98a4d62b09',
    reserveAuctionListingErc20: '0x517f7721f3c3762f7048e03919761e027d900082',
  },
  mainnet: {
    moduleManager: ZoraMainnetAddresses.ZoraModuleManager,
    asks: ZoraMainnetAddresses.AsksV1_1,
    erc721TransferHelper: ZoraMainnetAddresses.ERC721TransferHelper,
    erc20TransferHelper: ZoraMainnetAddresses.ERC20TransferHelper,
    offers: ZoraMainnetAddresses.OffersV1,
    reserveAuctionCoreEth: ZoraMainnetAddresses.ReserveAuctionCoreEth,
    reserveAuctionCoreErc20: ZoraMainnetAddresses.ReserveAuctionCoreErc20,
    reserveAuctionFindersEth: ZoraMainnetAddresses.ReserveAuctionFindersEth,
    reserveAuctionFindersErc20: ZoraMainnetAddresses.ReserveAuctionFindersErc20,
    reserveAuctionListingEth: ZoraMainnetAddresses.ReserveAuctionListingEth,
    reserveAuctionListingErc20: ZoraMainnetAddresses.ReserveAuctionListingErc20,
  },
};
