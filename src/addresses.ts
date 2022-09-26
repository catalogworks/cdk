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
    // V1 Contracts (Deprecated)
    v1Market: '0xf21ec35b3143611eFF8318D686DE0d5Efd14b7A5',
    v1Media: '0x3F012C2e7c35fE523c8B70d6268dB72d3B4D77EC',
    auctionHouse: '0x5089Ce87993c4D8EE48745800570C1e4bc6889Ed',
    weth: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
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
