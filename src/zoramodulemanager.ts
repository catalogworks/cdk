// zoramodule.ts
// Class for Zora V3 Module Manager

import {BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer, BytesLike} from 'ethers';
import {
  ZoraModuleManager as ZoraModuleManagerType,
  ZoraModuleManager__factory,
} from '@catalogworks/zorav3-with-types/dist/';
import {zoraAddresses} from './addresses';
import {
  chainIdToNetwork,
  validateAndParseAddress,
  validateAndParseAddresses,
} from './utils';

export class ZoraModuleManager {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: ZoraModuleManagerType;
  public readOnly: boolean;

  // Constructor
  // @param {Signer | Provider} signerOrProvider Signer or Provider to use for contract calls
  // @param {number} chainId Chain ID of the network to use
  // @param {string} contractAddress deployed Address of the Zora Module Manager
  // @returns {Promise<ZoraModuleManager>} A new ZoraModuleManager instance
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
      this.contractAddress = zoraAddresses[network].moduleManager;
    }

    this.contract = ZoraModuleManager__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View Methods [Getters]

  // IsModuleApproved
  // @param {string} userAddress Address of the user
  // @param {string} moduleAddress Address of the module
  // @returns {Promise<boolean>} True if the user has approved the module
  public async fetchIsModuleApproved(
    userAddress: string,
    moduleAddress: string
  ): Promise<boolean> {
    return this.contract.isModuleApproved(userAddress, moduleAddress);
  }
  // userApproval
  // @param {string} userAddress Address of the user
  // @param {string} moduleAddress Address of the module
  // @returns {Promise<boolean>} True if the user has approved the module
  public async fetchUserApproval(
    userAddress: string,
    moduleAddress: string
  ): Promise<boolean> {
    return this.contract.userApprovals(userAddress, moduleAddress);
  }

  // Write Methods [Transactions]

  // setApprovalForModule
  // @param {string} moduleAddress Address of the module to approve
  // @param {boolean} approved True if the user should be approved
  // @returns {Promise<ContractTransaction>} Transaction object
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

  // setBatchApprovalForModules
  // @param {string[]} moduleAddresses Array of module addresses to approve
  // @param {boolean} approved True if the user should be approved
  // @returns {Promise<ContractTransaction>} Transaction object
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

  // setApprovalForModuleBySig
  // @param {string} moduleAddress Address of the module to approve
  // @param {string} userAddress Address of the user
  // @param {boolean} approved True if the user should be approved
  // @param {BigNumberish} deadline Time in seconds before the transaction is invalid
  // @param {BigNumberish} v EC signature parameter
  // @param {BytesLike} r EC signature parameter
  // @param {BytesLike} s EC signature parameter
  // @returns {Promise<ContractTransaction>} Transaction object
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

  // registerModule
  // @note used for testing purposes only
  // @param {string} moduleAddress Address of the module to register
  // @returns {Promise<ContractTransaction>} Transaction object
  public async registerModule(
    moduleAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(moduleAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.registerModule(moduleAddress);
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
