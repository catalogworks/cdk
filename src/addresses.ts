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
  goerli: {
    moduleManager: ZoraGoerliAddresses.ZoraModuleManager,
    erc20TransferHelper: ZoraGoerliAddresses.ERC20TransferHelper,
    erc721TransferHelper: ZoraGoerliAddresses.ERC721TransferHelper,
    asks: ZoraGoerliAddresses.AsksV1_1,
    offers: ZoraGoerliAddresses.OffersV1,
    reserveAuctionCoreEth: ZoraGoerliAddresses.ReserveAuctionCoreEth,
    reserveAuctionCoreErc20: ZoraGoerliAddresses.ReserveAuctionCoreErc20,
    reserveAuctionFindersEth: ZoraGoerliAddresses.ReserveAuctionFindersEth,
    reserveAuctionFindersErc20: ZoraGoerliAddresses.ReserveAuctionFindersErc20,
    reserveAuctionListingEth: ZoraGoerliAddresses.ReserveAuctionListingEth,
    reserveAuctionListingErc20: ZoraGoerliAddresses.ReserveAuctionListingErc20,
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
