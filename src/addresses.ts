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
    reserveAuctionsCoreEth: ZoraRinkebyAddresses.ReserveAuctionCoreEth,
    reserveAuctionsCoreErc20: ZoraRinkebyAddresses.ReserveAuctionCoreErc20,
    reserveAuctionsFindersEth: ZoraRinkebyAddresses.ReserveAuctionFindersEth,
    reserveAuctionsFindersErc20:
      ZoraRinkebyAddresses.ReserveAuctionFindersErc20,
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
  },
};
