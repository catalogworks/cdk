// Addresses.ts
// Utility File to store deployed addresses relative to SDK


import rinkebyAddresses from '@catalogworks/catalog-contracts/dist/addresses/4.json';

interface AddressBook {
    [key: string]: {
        [key: string]: string;
    }
}


// mappings
export const addresses: AddressBook = {
    rinkeby: rinkebyAddresses
}