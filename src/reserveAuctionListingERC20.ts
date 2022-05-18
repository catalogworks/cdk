//reserveAuctionListingERC20.ts
// Class for Zora V3 Reserve Auction Modules

import {BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer, utils} from 'ethers';

import {
  ReserveAuctionListingErc20 as ReserveAuctionListingErc20Type,
  ReserveAuctionListingErc20__factory,
} from '@zoralabs/v3/dist/typechain';

import {zoraAddresses} from './addresses';
import {chainIdToNetwork, validateAndParseAddress} from './utils';
import type {AuctionStructOutputListingERC20} from './types';

export class ReserveAuctionListingERC20 {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: ReserveAuctionListingErc20Type;
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
      this.contractAddress = zoraAddresses[network].reserveAuctionListingErc20;
    }

    this.contract = ReserveAuctionListingErc20__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View Methods [Getters]

  // auctionForNFT
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @returns {Promise<AuctionStructOutputListingERC20>}
  public async fetchAuctionForNFT(
    inputAddress: string,
    inputTokenId: BigNumberish
  ): Promise<AuctionStructOutputListingERC20> {
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
  // @param {BigNumberish} duration - Duration of the auction in units
  // @param {BigNumberish} reservePrice - Reserve price of the auction
  // @param {string} sellerFundsRecipient - Address of the funds recipient
  // @param {BigNumberish} startTime - Start time of the auction in units
  // @param {string} bidCurrency - Contract address for ERC20 Token
  // @param {BigNumberish} listingFeeBPS - Listing fee in BPS
  // @param {string} listingFeeRecipient - Address of the listing fee recipient
  // @returns {Promise<ContractTransaction>}
  public async createAuction(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    duration: BigNumberish,
    reservePrice: BigNumberish,
    sellerFundsRecipient: string,
    startTime: BigNumberish,
    bidCurrency: string,
    listingFeeBPS: BigNumberish,
    listingFeeRecipient: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(sellerFundsRecipient);
      validateAndParseAddress(bidCurrency);
      validateAndParseAddress(listingFeeRecipient);
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
      listingFeeBPS,
      listingFeeRecipient
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
  // @param {BigNumberish} amount - Bid amount
  // @param {string} payableAmount - amount (in eth, payable)
  // @returns {Promise<ContractTransaction>}
  public async createBid(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    payableAmount?: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    if (payableAmount) {
      return this.contract.createBid(tokenContractAddress, tokenId, amount, {
        value: utils.parseEther(payableAmount),
      });
    } else {
      return this.contract.createBid(tokenContractAddress, tokenId, amount);
    }
  }

  // setAuctionReservePrice
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} reservePrice - Reserve price of the auction
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
