// types.ts
// Data types to suppot Catalog Contracts

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { BytesLike } from '@ethersproject/bytes';


// Catalog cNFT Data Type
export type TokenData = {
    metadataURI: string;
    contentURI: string;
    creator: string;
    royaltyPayout: string;
    royaltyBPS: BigNumberish;
};

// Catalog cNFT Input Proof Type
export type Proof = { proof: BytesLike[] };


export type RoyaltyInfo = {
    receiver: string;
    royaltyAmount: BigNumberish;
}