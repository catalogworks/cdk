// utils.test.ts
// Jest test suite for exported Utils functions

import { constructTokenData, chainIdToNetwork, validateBytes32, validateBytes32Array, stripHexPrefix, validateAndParseAddress, validateURI, sha256FromHexString, sha256FromBuffer, generateMerkleTree, generateMerkleRootFromTree, generateMerkleProof, generateMerkleProofs } from "../src/utils";
import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumber } from '@ethersproject/bignumber';
import { MaxUint256 } from "@ethersproject/constants";
import { ethers } from 'ethers';
import MerkleTree from "merkletreejs";


jest.setTimeout(1000000);


describe('Utils', () => {
   
    let hash: string;
    let defaultContentURI: string;
    let defaultMetadataURI: string;


    let provider = new JsonRpcProvider()
    // let blockchain = new Blockchain(provider)

    beforeAll(() => {
        hash = "0xe5dc4ed07fa1a3464d618a5d52a983880bb908b99ffff479eb7ebb7f7b11dabb";
        defaultContentURI = "https://poop.com";
        defaultMetadataURI = "https://metapoop.com";
    });

    beforeEach(async () => {
        // await blockchain.resetAsync();
    })

    describe('Hashing Utilities', () => {

        // 01
        it('raises if hex string is invalid', async () => {
            const invalidHex='0xpoopinmepants';

            expect(() => {
                sha256FromHexString(invalidHex)
            }).toThrow(
                `${invalidHex} is not a valid hex string`
            )

        });
    });

    describe('Type Constructors', () => {
        let contentHash: string;
        let metadataHash: string;
        
        beforeAll(() => {
            contentHash = sha256FromBuffer(Buffer.from('some poopy content'));
            metadataHash = sha256FromBuffer(Buffer.from('some poopy metadata'));
        });

        // 01
        describe('#constructTokenData', () => {

            it('succesfully creates valid tokenData', () => {

                const data = constructTokenData(
                    defaultMetadataURI,
                    defaultContentURI,
                    '0x0000000000000000000000000000000000000000',
                    '0x0000000000000000000000000000000000000000',
                    '5000'
                );

                expect(data.metadataURI).toBe(defaultMetadataURI);
                expect(data.contentURI).toBe(defaultContentURI);
                expect(data.creator).toBe('0x0000000000000000000000000000000000000000');
                expect(data.royaltyPayout).toBe('0x0000000000000000000000000000000000000000');
                expect(data.royaltyBPS).toBe('5000');

            });
        });
    });


    describe('Merkle Tree', () => {
        let tree: MerkleTree;
        let addresses: string[];


        beforeAll(() => {
            addresses = [
                // test addresses
                '0x8a5847fd0e592B058c026C5fDc322AEE834B87F5',
                '0x1CD4935Eb3d7291b2B0782F9aF7525564D277E7B',
                '0x1cd4935eb3d7291b2b0782f9af7525564d277e7b',
                '0xb0b15521228ca513f168af37c3ea6a400308b64f',
                '0x0d423e07f4b2946ea5590b829636af3218b4c430',
                '0xe75906b48ed2c33e06bf6673340e0fdf20aabb82',
                '0x37b95b2fe82b35b01e475d3578e19614b2a8bef7',
                '0x8d165b4ca6055a9a41b1fe50d1ebaab2efe44385',
                '0x2ed0db8d2870ccac48b1693b9efe4341fedaecb1',
                '0x25a1735D2490F8f6a72874B8d1084E0745DC01f2',
                '0x77BbAC0F9340d5bffa8FDF433AfF3663d87CDbfF',
            ];
        });


        describe('generate Merkle Tree', () => {

            it('generates a Merkle Tree', () => {
                tree = generateMerkleTree(addresses);
                // print tree
                tree.print();
                expect(tree.getHexRoot).toBeDefined();
            });
        });

        describe('generate a merkle root from an input tree', () => {
           
            it('generates a Merkle Root', () => {
                const root = generateMerkleRootFromTree(tree);
                expect(root).toBeDefined();
            });

        });

        describe('generate merkle proofs', () => {

            it('generates a proof for a single address', () => {
                const proof = generateMerkleProof(tree, addresses[0]);
                expect(proof).toBeDefined();
            });

            it('generates multiple proofs', () => {
                const proofs = generateMerkleProofs(tree, addresses);
                expect(proofs).toBeDefined();
            });
        });

    });

});