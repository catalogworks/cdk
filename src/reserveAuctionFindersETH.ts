//reserveAuctionFindersETH.ts
// Class for Zora V3 Reserve Auction Modules

import {BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer, utils} from 'ethers';

import {
  ReserveAuctionFindersEth as ReserveAuctionFindersEthType,
  ReserveAuctionFindersEth__factory,
} from '@catalogworks/zorav3-with-types/dist/';

import {zoraAddresses} from './addresses';
import {chainIdToNetwork, validateAndParseAddress} from './utils';
import type {AuctionStructOutputFindersETH} from './types';
export class ReserveAuctionFindersETH {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: ReserveAuctionFindersEthType;
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
      this.contractAddress = zoraAddresses[network].reserveAuctionFindersEth;
    }

    this.contract = ReserveAuctionFindersEth__factory.connect(
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
  ): Promise<AuctionStructOutputFindersETH> {
    return this.contract.auctionForNFT(inputAddress, inputTokenId);
  }

  // erc721TransferHelper
  // @returns {string} - Contract address of deployer erc721 transfer helper
  // @note This is here as a helper
  public async fetchERC721TransferHelper(): Promise<string> {
    return this.contract.erc721TransferHelper();
  }

  // Write Methods [Transactions]

  // createAuction
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} duration - Auction duration (unspecified units in natspec)
  // @param {BigNumberish} reservePrice - Auction reserve price
  // @param {string} sellerFundsRecipient - Address of the funds recipient
  // @param {BigNumberish} startTime - Auction start time
  // @param {BigNumberish} findersFeeBPS - Auction finders fee BPS
  // @returns {Promise<ContractTransaction>}
  public async createAuction(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    duration: BigNumberish,
    reservePrice: BigNumberish,
    sellerFundsRecipient: string,
    startTime: BigNumberish,
    findersFeeBPS: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(sellerFundsRecipient);
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
  // @param {string} amount - Amount of ETH to send (payable function)
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @returns {Promise<ContractTransaction>}
  public async createBid(
    amount: string,
    tokenContractAddress: string,
    tokenId: BigNumberish,
    finderAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(finderAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.createBid(
      tokenContractAddress,
      tokenId,
      finderAddress,
      {
        value: utils.parseEther(amount),
      }
    );
  }

  // setAuctionReservePrice
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} reservePrice - Auction reserve price
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
