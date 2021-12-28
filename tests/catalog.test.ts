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

    describe('#constructor', () => {

        // 01
        it('throws an error if contract address is null', () => {
            const wallet = Wallet.createRandom();

            expect(() => {
                new Catalog(wallet, 4, '');
            }).toThrow(
                'Catalog Constructor: contractAddress cannot be null'
            )

        });

        // 02
        it('throws an error if no contract address is provided with an invalid chain', () => {
            const wallet = Wallet.createRandom();

            expect(() => {
                new Catalog(wallet, 420);
            }).toThrow(
                'Invariant failed: chainId: 420 is not currently supported'
            )

        });

        // 03
        it('throws an error if the chainId does not map to a deployed instance of the catalog contract', () => {
            const wallet = Wallet.createRandom();

            expect(() => {
                new Catalog(wallet, 69, );
            }).toThrow(
                'Invariant failed: chainId: 69 is not currently supported'
            )

        });

        // 04
        it('throws an error if the contract address is not a valid ethereum address', () => {
            const wallet = Wallet.createRandom();

            expect(() => {
                new Catalog(wallet, 4, 'pee in me pants');
            }).toThrow(
                'Invariant failed: pee in me pants is not a valid address'
            )

        });




    })

});