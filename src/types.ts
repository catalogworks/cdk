// types.ts
// Data types to suppot Catalog Contracts

import {BigNumber, BigNumberish} from '@ethersproject/bignumber';
import {BytesLike} from '@ethersproject/bytes';
import {Catalog20210202} from './schemas/types/catalog/20210202';
import {Catalog20220000} from './schemas/types/catalog/20220000';
import {Mnft20220222} from './schemas/types/mnft/20220222';

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
export type MetadataLike = Catalog20210202 | Catalog20220000 | Mnft20220222;

// Export schema typing
export {Catalog20210202};
export {Catalog20220000};
export {Mnft20220222};

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

// Ask Return Data Type
export type AskStructOutput = [string, string, string, number, BigNumber] & {
  seller: string;
  sellerFundsRecipient: string;
  askCurrency: string;
  findersFeeBps: number;
  askPrice: BigNumber;
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
// Offer Return Data Type
export type OfferStructOutput = [string, string, number, BigNumber] & {
  maker: string;
  currency: string;
  findersFeeBps: number;
  amount: BigNumber;
};

export type AuctionInputDataETH = {
  tokenContractAddress: string;
  tokenId: BigNumberish;
  duration: BigNumberish;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  startTime: BigNumberish;
};

export type AuctionInputDataFindersETH = {
  tokenContractAddress: string;
  tokenId: BigNumberish;
  duration: BigNumberish;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  startTime: BigNumberish;
  findersFeeBPS: BigNumberish;
};

export type AuctionInputDataListingETH = {
  tokenContractAddress: string;
  tokenId: BigNumberish;
  duration: BigNumberish;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  startTime: BigNumberish;
  listingFeeBPS: BigNumberish;
  listingFeeRecipient: string;
};

export type AuctionInputDataERC20 = {
  tokenContractAddress: string;
  tokenId: BigNumberish;
  duration: BigNumberish;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  startTime: BigNumberish;
  bidCurrency: string;
};

export type AuctionInputDataFindersERC20 = {
  tokenContractAddress: string;
  tokenId: BigNumberish;
  duration: BigNumberish;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  startTime: BigNumberish;
  bidCurrency: string;
  findersFeeBPS: BigNumberish;
};

export type AuctionStructETH = {
  seller: string;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  highestBid: BigNumberish;
  highestBidder: string;
  duration: BigNumberish;
  startTime: BigNumberish;
  firstBidTime: BigNumberish;
};

export type AuctionStructOutputETH = [
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  number,
  number,
  number
] & {
  seller: string;
  reservePrice: BigNumber;
  sellerFundsRecipient: string;
  highestBid: BigNumber;
  highestBidder: string;
  duration: number;
  startTime: number;
  firstBidTime: number;
};

export type AuctionStructERC20 = {
  seller: string;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  highestBid: BigNumberish;
  highestBidder: string;
  duration: BigNumberish;
  startTime: BigNumberish;
  currency: string;
  firstBidTime: BigNumberish;
};
export type AuctionStructOutputERC20 = [
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  number,
  number,
  string,
  BigNumber
] & {
  seller: string;
  reservePrice: BigNumber;
  sellerFundsRecipient: string;
  highestBid: BigNumber;
  highestBidder: string;
  duration: number;
  startTime: number;
  currency: string;
  firstBidTime: BigNumber;
};

export type AuctionStructFindersETH = {
  seller: string;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  highestBid: BigNumberish;
  highestBidder: string;
  duration: BigNumberish;
  startTime: BigNumberish;
  finder: string;
  firstBidTime: BigNumberish;
  findersFeeBps: BigNumberish;
};
export type AuctionStructOutputFindersETH = [
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  number,
  number,
  string,
  BigNumber,
  number
] & {
  seller: string;
  reservePrice: BigNumber;
  sellerFundsRecipient: string;
  highestBid: BigNumber;
  highestBidder: string;
  duration: number;
  startTime: number;
  finder: string;
  firstBidTime: BigNumber;
  findersFeeBps: number;
};

export type AuctionStructFindersERC20 = {
  seller: string;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  highestBid: BigNumberish;
  highestBidder: string;
  startTime: BigNumberish;
  currency: string;
  firstBidTime: BigNumberish;
  finder: string;
  duration: BigNumberish;
  findersFeeBps: BigNumberish;
};
export type AuctionStructOutputFindersERC20 = [
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  BigNumber,
  number
] & {
  seller: string;
  reservePrice: BigNumber;
  sellerFundsRecipient: string;
  highestBid: BigNumber;
  highestBidder: string;
  startTime: BigNumber;
  currency: string;
  firstBidTime: BigNumber;
  finder: string;
  duration: BigNumber;
  findersFeeBps: number;
};

export type AuctionStructListingETH = {
  seller: string;
  reservePrice: BigNumberish;
  sellerFundsRecipient: string;
  highestBid: BigNumberish;
  highestBidder: string;
  duration: BigNumberish;
  startTime: BigNumberish;
  listingFeeRecipient: string;
  firstBidTime: BigNumberish;
  listingFeeBps: BigNumberish;
};

export type AuctionStructOutputListingETH = [
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  number,
  number,
  string,
  BigNumber,
  number
] & {
  seller: string;
  reservePrice: BigNumber;
  sellerFundsRecipient: string;
  highestBid: BigNumber;
  highestBidder: string;
  duration: number;
  startTime: number;
  listingFeeRecipient: string;
  firstBidTime: BigNumber;
  listingFeeBps: number;
};
