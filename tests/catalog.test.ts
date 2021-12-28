// catalog.test.ts
// Jest test suite for Catalog class

import { Catalog, TokenData, Proof, } from '../src';
import { Wallet } from '@ethersproject/wallet';
import { JsonRpcProvider } from '@ethersproject/providers';
import { addresses as CatalogAddresses } from '../src/addresses';
import { BigNumber, Bytes } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { AddressZero } from '@ethersproject/constants';
import { TD606__factory as Catalog__factory } from '@catalogworks/catalog-contracts/dist/types/typechain';

let provider = new JsonRpcProvider();
// let blockchain = new Blockchain(provider)

jest.setTimeout(30000);


describe('Catalog', () => {

    describe('constructor', () => {


        // 01
        it('throws an error if no contract address is provided with an invalid chain', () => {
            const wallet = Wallet.createRandom();

            expect(() => {
                new Catalog(wallet, 420);
            }).toThrow(
                'Invariant failed: chainId: 420 is not currently supported'
            )

        });

        // 02
        it('throws an error if the chainId does not map to a deployed instance of the catalog contract', () => {
            const wallet = Wallet.createRandom();

            expect(() => {
                new Catalog(wallet, 69, );
            }).toThrow(
                'Invariant failed: chainId: 69 is not currently supported'
            )

        });

        // 03
        it('throws an error if the contract address is not a valid ethereum address', () => {
            const wallet = Wallet.createRandom();

            expect(() => {
                new Catalog(wallet, 4, 'pee in me pants');
            }).toThrow(
                'Invariant failed: pee in me pants is not a valid address'
            )

        });

        // 04
        it('sets the Catalog instance to readOnly=false if signer is specified', () => {
            const wallet = Wallet.createRandom();
            const catalog = new Catalog(wallet, 4);

            expect(catalog.readOnly).toBe(false);
        });

        // 05 
        it('sets the Catalog instane of readOnly=true is a Provider is specified', () => {
            const provider = new JsonRpcProvider();
            const catalog = new Catalog(provider, 4, CatalogAddresses.rinkeby.Catalog);

            expect(catalog.readOnly).toBe(true);
        });

        // 06
        it('initializes a Catalog instance with the checksummed contract address for the specific chainId', () => {
            const wallet = Wallet.createRandom();
            const rinkebyAddress = CatalogAddresses['rinkeby'].catalog;
            const catalog = new Catalog(wallet, 4);

            expect(catalog.contractAddress).toBe(rinkebyAddress);
        });




    });

    // CONTRACT FUNCTIONS

    describe('contract functions', () => {

        // let catalogConfig: CatalogConfiguredAddresses;
        let provider = new JsonRpcProvider();

    });





});