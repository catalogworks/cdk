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
    reserveAuctionsCoreEth: '0x3feAf4c06211680e5969A86aDB1423Fc8AD9e994', // TEMPORARY
    reserveAuctionsCoreErc20: '0x9eb86B88D13eD0e38348AB951b55a26cA468A262',
    reserveAuctionsFindersEth: '0x1b5A56DEa3d9760c6b14B709B9cf0ef9AaCD2730',
    reserveAuctionsFindersErc20: '0x81950e0CD9c51564583bFB80EC3d40f2B915A956',
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
