// addresses.ts
// Utility File to store deployed addresses relative to SDK

import rinkebyAddresses from '@catalogworks/catalog-contracts/dist/addresses/4.json';

import ZoraRinkebyAddresses from '@zoralabs/v3/dist/addresses/4.json';
import ZoraMainnetAddresses from '@zoralabs/v3/dist/addresses/1.json';

// AddressBook Interface for Catalog Contracts
export interface AddressBook {
  [key: string]: {
    [key: string]: string;
  };
}

// Mapping of network names to addresses
export const addresses: AddressBook = {
  rinkeby: rinkebyAddresses,
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

export const splitsAddresses: AddressBook = {
  rinkeby: {
    splitMain: '0x2ed6c4B5dA6378c7897AC67Ba9e43102Feb694EE',
  },
  mainnet: {
    splitMain: '0x2ed6c4B5dA6378c7897AC67Ba9e43102Feb694EE',
  },
};
