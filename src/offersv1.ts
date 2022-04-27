// offersv1.ts
// Class for Zora V3 Offers Module (V1)

import {BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer, utils} from 'ethers';

import {
  OffersV1 as OffersV1Type,
  OffersV1__factory,
} from '@zoralabs/v3/dist/typechain';
import {zoraAddresses} from './addresses';
import {chainIdToNetwork, validateAndParseAddress} from './utils';
import type {OfferStructOutput} from './types';

export class OffersV1 {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: OffersV1Type;
  public readOnly: boolean;

  // constructor
  constructor(
    signerOrProvider: Signer | Provider,
    chainId: number,
    contractAddress?: string
  ) {
    Signer.isSigner(signerOrProvider)
      ? (this.readOnly = false)
      : (this.readOnly = true);

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainId;

    if (contractAddress) {
      const parsedContractAddress = validateAndParseAddress(contractAddress);
      this.contractAddress = parsedContractAddress;
    } else {
      // Get contract address from chainId
      const network = chainIdToNetwork(this.chainId);
      this.contractAddress = zoraAddresses[network].offers;
    }

    this.contract = OffersV1__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View Methods [Getters]

  // fetchOffers
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @param {BigNumberish} inputOfferId - Offer ID
  // @returns {Promise<OfferStruct>} - Offer data for the NFT
  public async fetchOffers(
    inputAddress: string,
    inputTokenId: BigNumberish,
    inputOfferId: BigNumberish
  ): Promise<OfferStructOutput> {
    return this.contract.offers(inputAddress, inputTokenId, inputOfferId);
  }

  // fetchOffersForNFT
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @param {BigNumberish} length - Length of the array (?) unclear why from reading documentation
  // @returns {Promise<BigNumberish>} - Offer IDs for the NFT
  public async fetchOffersForNFT(
    inputAddress: string,
    tokenId: BigNumberish,
    length: BigNumberish
  ): Promise<BigNumberish> {
    return this.contract.offersForNFT(inputAddress, tokenId, length);
  }

  // Write Methods [Transactions]

  // createOffer
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {string} offerCurrency - Address of the ERC20/ETH contract
  // @param {BigNumberish} offerAmount - Amount of the offer
  // @param {BigNumberish} findersFeeBPS - Finders fee in BPS
  // @param {string} amount - optional payable amount in ETH
  // @returns {Promise<ContractTransaction>} - Contract transaction object
  public async createOffer(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    offerCurrency: string,
    offerAmount: BigNumberish,
    findersFeeBPS: BigNumberish,
    amount?: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(offerCurrency);
    } catch (err) {
      return Promise.reject(err);
    }

    if (amount) {
      return this.contract.createOffer(
        tokenContractAddress,
        tokenId,
        offerCurrency,
        offerAmount,
        findersFeeBPS,
        {
          value: utils.parseEther(amount),
        }
      );
    } else {
      return this.contract.createOffer(
        tokenContractAddress,
        tokenId,
        offerCurrency,
        offerAmount,
        findersFeeBPS
      );
    }
  }

  // setOfferAmount
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} offerId - Offer ID
  // @param {string} offerCurrency - Address of the ERC20/ETH contract
  // @param {BigNumberish} offerAmount - Amount of the offer
  // @param {string} amount - optional payable amount in ETH
  // @returns {Promise<ContractTransaction>} - Contract transaction object
  public async setOfferAmount(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    offerId: BigNumberish,
    offerCurrency: string,
    offerAmount: BigNumberish,
    amount?: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(offerCurrency);
    } catch (err) {
      return Promise.reject(err);
    }

    if (amount) {
      return this.contract.setOfferAmount(
        tokenContractAddress,
        tokenId,
        offerId,
        offerCurrency,
        offerAmount,
        {
          value: utils.parseEther(amount),
        }
      );
    } else {
      return this.contract.setOfferAmount(
        tokenContractAddress,
        tokenId,
        offerId,
        offerCurrency,
        offerAmount
      );
    }
  }

  // cancelOffer
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} offerId - Offer ID
  // @returns {Promise<ContractTransaction>} - Contract transaction object
  public async cancelOffer(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    offerId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.cancelOffer(tokenContractAddress, tokenId, offerId);
  }

  // fillOffer
  // @param {string} tokenContractAddress - Address of the token contract
  // @param {BigNumberish} tokenId - Token ID
  // @param {BigNumberish} offerId - Offer ID
  // @param {string} offerCurrency - Address of the ERC20/ETH contract
  // @param {BigNumberish} offerAmount - Amount of the offer
  // @param {string} finderAddress - Address of the finder
  // @returns {Promise<ContractTransaction>} - Contract transaction object
  public async fillOffer(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    offerId: BigNumberish,
    offerCurrency: string,
    offerAmount: BigNumberish,
    finderAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(offerCurrency);
      validateAndParseAddress(finderAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.fillOffer(
      tokenContractAddress,
      tokenId,
      offerId,
      offerCurrency,
      offerAmount,
      finderAddress
    );
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
