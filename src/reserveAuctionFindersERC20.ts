//reserveAuctionFindersERC20.ts
// Class for Zora V3 Reserve Auction Modules

import {BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer} from 'ethers';

import {
  ReserveAuctionFindersErc20 as ReserveAuctionFindersErc20Type,
  ReserveAuctionFindersErc20__factory,
} from '@zoralabs/v3/dist/typechain';

import {zoraAddresses} from './addresses';
import {chainIdToNetwork, validateAndParseAddress} from './utils';
import type {AuctionStructOutputFindersERC20} from './types';

export class ReserveAuctionFindersERC20 {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: ReserveAuctionFindersErc20Type;
  public readOnly: boolean;

  // Constructor
  constructor(
    signerOrProvider: Signer | Provider,
    chainid: number,
    contractAddress?: string
  ) {
    Signer.isSigner(signerOrProvider)
      ? (this.readOnly = false)
      : (this.readOnly = true);

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainid;

    if (contractAddress) {
      const parsedContractAddress = validateAndParseAddress(contractAddress);
      this.contractAddress = parsedContractAddress;
    } else {
      // Get contract address from chainId
      const network = chainIdToNetwork(this.chainId);
      this.contractAddress = zoraAddresses[network].reserveAuction;
    }

    this.contract = ReserveAuctionFindersErc20__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View Methods [Getters]

  // auctionForNFT
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  public async fetchAuctionForNFT(
    inputAddress: string,
    inputTokenId: BigNumberish
  ): Promise<AuctionStructOutputFindersERC20> {
    return this.contract.auctionForNFT(inputAddress, inputTokenId);
  }

  // erc721TransferHelper
  // @returns {string} - Contract address of deployed erc721 transfer helper
  // @note This is here as a helper
  public async fetchERC721TransferHelper(): Promise<string> {
    return this.contract.erc721TransferHelper();
  }

  // erc20TransferHelper
  // @returns {string} - Contract address of deployed erc20 transfer helper
  // @note This is here as a helper
  public async fetchERC20TransferHelper(): Promise<string> {
    return this.contract.erc20TransferHelper();
  }

  // Write Methods [Transactions]

  // createAuction
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} duration - Duration of auction in units
  // @param {BigNumberish} reservePrice - Reserve price of auction in units
  // @param {string} sellerFundsRecipient - Address of funds recipient
  // @param {BigNumberish} startTime - Start time of auction in seconds
  // @param {string} bidCurrency - ERC20 token address
  // @param {BigNumberish} findersFeeBPS - Finders fee in units
  // @returns {Promise<ContractTransaction>}
  public async createAuction(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    duration: BigNumberish,
    reservePrice: BigNumberish,
    sellerFundsRecipient: string,
    startTime: BigNumberish,
    bidCurrency: string,
    findersFeeBPS: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(sellerFundsRecipient);
      validateAndParseAddress(bidCurrency);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.createAuction(
      tokenContractAddress,
      tokenId,
      duration,
      reservePrice,
      sellerFundsRecipient,
      startTime,
      bidCurrency,
      findersFeeBPS
    );
  }

  // cancelAuction
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @returns {Promise<ContractTransaction>}
  public async cancelAuction(
    tokenContractAddress: string,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.cancelAuction(tokenContractAddress, tokenId);
  }

  // createBid
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} amount - Amount of bid
  // @returns {Promise<ContractTransaction>}
  public async createBid(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    finderAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.createBid(
      tokenContractAddress,
      tokenId,
      amount,
      finderAddress
    );
  }

  // setAuctionReservePrice
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} reservePrice - Reserve price of auction in units
  // @returns {Promise<ContractTransaction>}
  public async setAuctionReservePrice(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    reservePrice: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.setAuctionReservePrice(
      tokenContractAddress,
      tokenId,
      reservePrice
    );
  }

  // settleAuction
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @returns {Promise<ContractTransaction>}
  public async settleAuction(
    tokenContractAddress: string,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.settleAuction(tokenContractAddress, tokenId);
  }

  // Private methods
  // Throws an error if called on read-only instance
  // @returns {void}
  private ensureNotReadOnly() {
    if (this.readOnly) {
      throw new Error('ensureReadOnly: Cannot modify read-only instance');
    }
  }
}
