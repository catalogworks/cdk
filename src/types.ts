// types.ts
// Data types to suppot Catalog Contracts

import {BigNumberish} from '@ethersproject/bignumber';
import {BytesLike} from '@ethersproject/bytes';
import {Catalog20210202} from './schemas/types/catalog/20210202';
import {Catalog20220000} from './schemas/types/catalog/20220000';

// Catalog cNFT Data Type
// @param {string} metadataURI - URI of IPFS hash
// @param {string} contentURI - URI of IPFS hash
// @param {string} creator - Ethereum address of creator
// @param {string} royaltyPayout - Ethereum address of royalty payout
// @param {BigNumberish} royaltyBPS - BigNumber of royalty BPS
export type TokenData = {
  metadataURI: string;
  creator: string;
  royaltyPayout: string;
  royaltyBPS: BigNumberish;
};

// Catalog cNFT Calldata Data Type
// @param {string} contentURI - URI of IPFS hash
// @param {BytesLike} contentHash - SHA256 hash of content
export type ContentData = {
  contentURI: string;
  contentHash: BytesLike;
};

// Catalog cNFT Input Proof Type
// @param {BytesLike[]} proof - Bytes32[] merkle proof
export type Proof = {proof: BytesLike[]};

// Catalog cNFT Royalty Info Type
// @param {string} receiver - Ethereum address of receiver
// @param {BigNumberish} royaltyAmount - BigNumber of amount
export type RoyaltyInfo = {
  receiver: string;
  royaltyAmount: BigNumberish;
};

// Metadata
export type MetadataLike = Catalog20210202 | Catalog20220000;

// Export schema typing
export {Catalog20210202};
export {Catalog20220000};

// Zora V3 Ask Type
export type Ask = {
  sellerAddress: string;
  sellerFundsRecipient: string;
  askCurrency: string;
  findersFeeBPS: BigNumberish;
  askPrice: BigNumberish;
};

// Ask Input Data Type
export type AskData = {
  tokenContract: string;
  tokenId: BigNumberish;
  askPrice: BigNumberish;
  askCurrency: string;
  sellerFundsRecipient: string;
  findersFeeBPS: BigNumberish;
};

// Zora V3 Offer Type
export type Offer = {
  makerAddress: string;
  currency: string;
  findersFeeBPS: BigNumberish;
  amount: BigNumberish;
};

// Offer Input Data Type
export type OfferData = {
  tokenContract: string;
  tokenId: BigNumberish;
  currency: string;
  amount: BigNumberish;
  findersFeeBPS: BigNumberish;
};
