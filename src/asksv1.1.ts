//aksv1.1.ts
// Class for Zora Asks V1.1 Module
import {BigNumber, BigNumberish} from 'ethers';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer} from '@ethersproject/abstract-signer';
import {BytesLike} from 'ethers';

import {
  AsksV11 as AsksV11Type,
  AsksV11__factory,
} from '@zoralabs/v3/dist/typechain';
import {zoraAddresses} from './addresses';

import {
  chainIdToNetwork,
  validateAndParseAddress,
  validateAndParseAddresses,
  validateBytes32,
  validateBytes32Array,
  validateURI,
} from './utils';

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
    if (Signer.isSigner(signerOrProvider)) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainid;

    if (contractAddress) {
      const parsedContractAddress = validateAndParseAddress(contractAddress);
      this.contractAddress = parsedContractAddress;
    } else {
      // Get contract address from chainId
      const network = chainIdToNetwork(this.chainId);
      this.contractAddress = zoraAddresses[network].asksV11;
    }

    this.contract = AsksV11__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View/Read Function
  public async fetchAskForNFT(
    inputAddress: string,
    tokenId: string
  ): Promise<AskStruct> {
    return this.contract.askForNFT(inputAddress, tokenId);
  }

  // Write Functions

  // Create Ask
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
