// utils.test.ts
// Jest test suite for exported Utils functions

import { constructTokenData, chainIdToNetwork, validateBytes32, validateBytes32Array, stripHexPrefix, validateAndParseAddress, validateURI, sha256FromHexString, sha256FromBuffer } from "../src/utils";
import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumber } from '@ethersproject/bignumber';
import { MaxUint256 } from "@ethersproject/constants";
import { ethers } from 'ethers';


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
    })
});