// addresses.ts
// Utility File to store deployed addresses relative to SDK

import rinkebyAddresses from '@catalogworks/catalog-contracts/dist/addresses/4.json';

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
