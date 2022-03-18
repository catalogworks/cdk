//aksv11.ts
// Class for Zora Asks V1.1 Module
import {BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer} from 'ethers';
import {
  AsksV11 as AsksV11Type,
  AsksV11__factory,
} from '@zoralabs/v3/dist/typechain';
import {zoraAddresses} from './addresses';
import {chainIdToNetwork, validateAndParseAddress} from './utils';
import type {AskStruct} from '@zoralabs/v3/dist/typechain/AsksV11';

export class AsksV11 {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: AsksV11Type;
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
      this.contractAddress = zoraAddresses[network].asks;
    }

    this.contract = AsksV11__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View Methods [Getters]

  // askForNFT
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @returns {Promise<AskStruct>} - Ask data for the NFT
  public async fetchAskForNFT(
    inputAddress: string,
    tokenId: BigNumberish
  ): Promise<AskStruct> {
    return this.contract.askForNFT(inputAddress, tokenId);
  }

  // erc721TransferHelper
  // @returns {string} - Contract address of deployer erc721 transfer helper
  // @note This is here as a helper
  public async fetchERC721TransferHelper(): Promise<string> {
    return this.contract.erc721TransferHelper();
  }

  // Write Methods [Transactions]

  // Create Ask
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @param {BigNumberish} askPrice - Ask price
  // @param {string} askCurrency - Ask currency contract address
  // @param {string} sellerFundsRecipient - Address of the funds recipient
  // @param {BigNumberish} findersFeeBPS - Finders fee BPS
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async createAsk(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    askPrice: BigNumberish,
    askCurrency: string,
    sellerFundsRecipient: string,
    findersFeeBPS: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(sellerFundsRecipient);
      validateAndParseAddress(askCurrency);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.createAsk(
      tokenContractAddress,
      tokenId,
      askPrice,
      askCurrency,
      sellerFundsRecipient,
      findersFeeBPS
    );
  }

  // setAskPrice
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @param {BigNumberish} askPrice - Ask price
  // @param {string} askCurrency - Ask currency contract address
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async setAskPrice(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    askPrice: BigNumberish,
    askCurrency: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(askCurrency);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.setAskPrice(
      tokenContractAddress,
      tokenId,
      askPrice,
      askCurrency
    );
  }

  // cancelAsk
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async cancelAsk(
    tokenContractAddress: string,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.cancelAsk(tokenContractAddress, tokenId);
  }

  // fillAsk
  // @param {string} inputAddress - Address of the token contract
  // @param {BigNumberish} inputTokenId - Token ID
  // @param {string} fillCurrency - Fill currency contract address
  // @param {BigNumberish} fillAmount - Fill amount
  // @param {string} finder - Address of the finder
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async fillAsk(
    tokenContractAddress: string,
    tokenId: BigNumberish,
    fillCurrency: string,
    fillAmount: BigNumberish,
    finder: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(fillCurrency);
      validateAndParseAddress(finder);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.fillAsk(
      tokenContractAddress,
      tokenId,
      fillCurrency,
      fillAmount,
      finder
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
