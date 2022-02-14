// addresses.ts
// Utility File to store deployed addresses relative to SDK

import rinkebyAddresses from '@catalogworks/catalog-contracts/dist/addresses/4.json';

import ZoraRinkebyAddresses from '@zoralabs/v3/dist/addresses/4.json';
import ZoraMainnetAddresses from '@zoralabs/v3/dist/addresses/1.json';

// AddressBook Interface for Catalog Contracts
interface AddressBook {
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
  },
  mainnet: {
    moduleManager: ZoraMainnetAddresses.ZoraModuleManager,
    asks: ZoraMainnetAddresses.AsksV1_1,
  },
};
