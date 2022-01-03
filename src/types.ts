// types.ts
// Data types to suppot Catalog Contracts

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { BytesLike } from '@ethersproject/bytes';


// Catalog cNFT Data Type
// @param {string} metadataURI - URI of IPFS hash
// @param {string} contentURI - URI of IPFS hash
// @param {string} creator - Ethereum address of creator
// @param {string} royaltyPayout - Ethereum address of royalty payout
// @param {BigNumberish} royaltyBPS - BigNumber of royalty BPS
export type TokenData = {
    metadataURI: string;
    contentURI: string;
    creator: string;
    royaltyPayout: string;
    royaltyBPS: BigNumberish;
};

// Catalog cNFT Input Proof Type
// @param {BytesLike[]} proof - Bytes32[] merkle proof
export type Proof = { proof: BytesLike[] };

// Catalog cNFT Royalty Info Type
// @param {string} receiver - Ethereum address of receiver
// @param {BigNumberish} royaltyAmount - BigNumber of amount
export type RoyaltyInfo = {
    receiver: string;
    royaltyAmount: BigNumberish;
}