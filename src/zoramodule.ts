// zoramodule.ts
// Class for Zora V3 Module Manager

import {BigNumber, BigNumberish} from 'ethers';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer} from '@ethersproject/abstract-signer';
import {BytesLike} from 'ethers';
import {
  ZoraModuleManager as ZoraModuleManagerType,
  ZoraModuleManager__factory,
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

export class ZoraModuleManager {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: ZoraModuleManagerType;
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
      this.contractAddress = zoraAddresses[network].moduleManager;
    }

    this.contract = ZoraModuleManager__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View/Read Function

  // IsModuleApproved
  public async fetchIsModuleApproved(
    userAddress: string,
    moduleAddress: string
  ): Promise<boolean> {
    return this.contract.isModuleApproved(userAddress, moduleAddress);
  }

  // Write Functions

  // set module approval
  public async setApprovalForModule(
    moduleAddress: string,
    approved: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(moduleAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.setApprovalForModule(moduleAddress, approved);
  }

  // set batch approval
  public async setBatchApprovalForModules(
    moduleAddresses: string[],
    approved: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddresses(moduleAddresses);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.setBatchApprovalForModules(moduleAddresses, approved);
  }

  // set approval via EIP-712 signature
  public async setApprovalForModuleBySig(
    moduleAddress: string,
    userAddress: string,
    approved: boolean,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(moduleAddress);
      validateAndParseAddress(userAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.setApprovalForModuleBySig(
      moduleAddress,
      userAddress,
      approved,
      deadline,
      v,
      r,
      s
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
