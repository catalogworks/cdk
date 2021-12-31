// catalog.test.ts
// Jest test suite for Catalog class

import { Catalog, TokenData, Proof, generateMerkleTree, generateMerkleProofs, generateMerkleRootFromTree, generateMerkleProof, } from '../src';
import { Wallet } from '@ethersproject/wallet';
import { JsonRpcProvider } from '@ethersproject/providers';
import { addresses as CatalogAddresses } from '../src/addresses';
import { BigNumber, Bytes } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { AddressZero } from '@ethersproject/constants';
import { TD606__factory as Catalog__factory } from '@catalogworks/catalog-contracts/dist/types/typechain';
import { Blockchain } from './utils/blockchain';
import { generatedWallets}  from './utils/wallets';
import { setupCatalog, CatalogConfiguredAddresses } from './helpers';

let provider = new JsonRpcProvider();
let blockchain = new Blockchain(provider)

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

        let catalogConfig: CatalogConfiguredAddresses;
        let provider = new JsonRpcProvider();
        let [mainWallet, otherWallet] = generatedWallets(provider);

        beforeEach(async () => {
            await blockchain.resetAsync();
            catalogConfig = await setupCatalog(mainWallet);
        });

        // 01
        describe('write functions', () => {
            let defaultTokendata: TokenData;
            let defaultProof: Proof;
            let otherProof: Proof;
            let metadata: string;
            let content: string;
            let defaultRoot: string;

            beforeEach(() => {
                metadata = 'https://catalog.com/metadata';
                content = 'https://catalog.com/content';
                defaultTokendata = {
                    metadataURI: metadata,
                    contentURI: content,
                    creator: mainWallet.address,
                    royaltyPayout: mainWallet.address,
                    royaltyBPS: 1000,
                };
                // generate proof/tree/root
                const tree = generateMerkleTree([mainWallet.address, otherWallet.address]);
                
                const mainProof = generateMerkleProof(tree, mainWallet.address);
                otherProof = generateMerkleProof(tree, otherWallet.address);
                defaultRoot = generateMerkleRootFromTree(tree);
                defaultProof = mainProof;
            });

            // 02 Update Content URI
            describe('update content URI', () => {
                it('throws error on read only instance', async () => {
                    const provider = new JsonRpcProvider();
                    const catalog = new Catalog(provider, 50, catalogConfig.cnft);
                    expect(catalog.readOnly).toBe(true);

                    await expect(catalog.updateContentURI(0, content)
                    ).rejects.toThrowError('ensureReadOnly: Cannot modify read-only instance');
                });

                it('throws an error if the input URI is not valid', async() => {
                    const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
                    await catalog.initialize('catalog', 'CTST');
                    console.log(await catalog.fetchOwner());
                    await catalog.updateRoot(defaultRoot);
                    await catalog.mint(defaultTokendata, defaultProof);
                    await expect(catalog.updateContentURI(0, 'http://pee.com')).rejects
                    .toThrowError('Invariant failed: http://pee.com must begin with `https://` or `ipfs://`');
                });
            });

            // it('can set the root', async () => {
            //     const catalog =  new Catalog(mainWallet, 1337, catalogConfig.cnft);
            //     const setRoot = await catalog.updateRoot(defaultRoot);

            //     expect(await catalog.fetchMerkleRoot()).toBe(defaultRoot);
            // });

            // it('mints', async () => {
            //     const catalog = new Catalog(mainWallet, 1337, catalogConfig.cnft);
            //     const mint = await catalog.mint(defaultTokendata, defaultProof);

            //     await expect(catalog.fetchMetdataURI(1)).resolves.toEqual(metadata);
 
            // });
        });

        


    });





});