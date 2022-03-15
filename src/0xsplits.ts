// zeroXsplits.ts
// Class for 0xSplits Protocol Contracts (SplitMain & SplitWallet)

import {BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer} from '@ethersproject/abstract-signer';

import {
  SplitMain as SplitMainType,
  SplitMain__factory,
} from '../lib/0xsplits/typechain';
import {splitsAddresses} from './addresses';
import {
  chainIdToNetwork,
  validateAndParseAddress,
  validateAndParseAddresses,
} from './utils';

export class ZeroXSplits {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  public contract: SplitMainType;
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
      this.contractAddress = splitsAddresses[network].splitMain;
    }

    this.contract = SplitMain__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View Methods [Getters]

  // getController
  // @param {string} inputAddress - Address of the split
  // @returns {Promise<string>} - Address of the controller
  public async fetchController(inputAddress: string): Promise<string> {
    return this.contract.getController(inputAddress);
  }

  // getERC20Balance
  // @param {string} inputAddress - Address of account to check balance
  // @param {string} tokenContractAddress - Address of the ERC20 token contract
  // @returns {Promise<BigNumberish>} - Balance of the ERC20 token
  public async fetchERC20Balance(
    inputAddress: string,
    tokenContractAddress: string
  ): Promise<BigNumberish> {
    return this.contract.getERC20Balance(inputAddress, tokenContractAddress);
  }

  // getETHBalance
  // @param {string} inputAddress - Address of account to check balance
  // @returns {Promise<BigNumberish>} - Balance of ETH
  public async fetchETHBalance(inputAddress: string): Promise<BigNumberish> {
    return this.contract.getETHBalance(inputAddress);
  }

  // getHash
  // @param {string} inputAddress - Address of the split
  // @returns {Promise<string>} - Hash of the split
  public async fetchHash(inputAddress: string): Promise<string> {
    return this.contract.getHash(inputAddress);
  }

  // getNewPotentialController
  // @param {string} inputAddress - Address of the split
  // @returns {Promise<string>} - Address of the new potential controller
  public async fetchNewPotentialController(
    inputAddress: string
  ): Promise<string> {
    return this.contract.getNewPotentialController(inputAddress);
  }

  // predictImmutableSplitAddress
  // @param {string[]} inputAddresses - Addresses of the split participants
  // @param {BigNumberish[]} inputPercentAllocations - Percent allocations of the split participants
  // @param {BigNumberish} inputDistributorFee - Distributor fee of the split
  // @returns {Promise<string>} - Address of the predicted split
  public async fetchPredictedSplitAddress(
    inputAddresses: string[],
    inputPercentAllocations: BigNumberish[],
    inputDistributorFee: BigNumberish
  ): Promise<string> {
    return this.contract.predictImmutableSplitAddress(
      inputAddresses,
      inputPercentAllocations,
      inputDistributorFee
    );
  }

  // walletImplementation
  // @returns {Promise<string>} - Address of the wallet implementation
  public async fetchWalletImplementation(): Promise<string> {
    return this.contract.walletImplementation();
  }

  // percentageScale
  // @returns {Promise<BigNumberish>} - Percentage scale
  public async fetchPercentageScale(): Promise<BigNumberish> {
    return this.contract.PERCENTAGE_SCALE();
  }

  // Write Methods [Transactions]

  // createSplit
  // @param {string[]} inputAddresses - Addresses of the split participants
  // @param {BigNumberish[]} inputPercentAllocations - Percent allocations of the split participants
  // @param {BigNumberish} inputDistributorFee - Distributor fee of the split
  // @param {string} inputController - Address of the controller
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async createSplit(
    inputAddresses: string[],
    inputPercentAllocations: BigNumberish[],
    inputDistributorFee: BigNumberish,
    inputController: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputController);
      validateAndParseAddresses(inputAddresses);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.createSplit(
      inputAddresses,
      inputPercentAllocations,
      inputDistributorFee,
      inputController
    );
  }

  // acceptControl
  // @param {string} inputAddress - Address of the split
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async acceptControl(
    inputAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.acceptControl(inputAddress);
  }

  // cancelControlTransfer
  // @param {string} inputAddress - Address of the split
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async cancelControlTransfer(
    inputAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.cancelControlTransfer(inputAddress);
  }

  // distributeERC20
  // @param {string} inputAddress - Address of the split
  // @param {string} tokenContractAddress - Address of the ERC20 token contract
  // @param {string[]} inputRecipients - Addresses of the recipients
  // @param {BigNumberish[]} percentAllocations - Percent allocations of the recipients
  // @param {BigNumberish} distributorFee - Distributor fee of the split
  // @param {string} distributorAddress - Address of the distributor
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async distributeERC20(
    inputAddress: string,
    tokenContractAddress: string,
    inputRecipients: string[],
    percentAllocations: BigNumberish[],
    distributorFee: BigNumberish,
    distributorAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(distributorAddress);
      validateAndParseAddresses(inputRecipients);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.distributeERC20(
      inputAddress,
      tokenContractAddress,
      inputRecipients,
      percentAllocations,
      distributorFee,
      distributorAddress
    );
  }

  // distributeETH
  // @param {string} inputAddress - Address of the split
  // @param {string[]} inputRecipients - Addresses of the recipients
  // @param {BigNumberish[]} percentAllocations - Percent allocations of the recipients
  // @param {BigNumberish} distributorFee - Distributor fee of the split
  // @param {string} distributorAddress - Address of the distributor
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async distributeETH(
    inputAddress: string,
    inputRecipients: string[],
    percentAllocations: BigNumberish[],
    distributorFee: BigNumberish,
    distributorAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
      validateAndParseAddress(distributorAddress);
      validateAndParseAddresses(inputRecipients);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.distributeETH(
      inputAddress,
      inputRecipients,
      percentAllocations,
      distributorFee,
      distributorAddress
    );
  }

  // makeSplitImmutable
  // @param {string} inputAddress - Address of the split
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async makeSplitImmutable(
    inputAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.makeSplitImmutable(inputAddress);
  }

  // transferControl
  // @param {string} inputAddress - Address of the split
  // @param {string} newController - Address of the new controller
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async transferControl(
    inputAddress: string,
    newController: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
      validateAndParseAddress(newController);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.transferControl(inputAddress, newController);
  }

  // updateAndDistributeERC20
  // @param {string} inputAddress - Address of the split
  // @param {string} tokenContractAddress - Address of the ERC20 token contract
  // @param {string[]} inputRecipients - Addresses of the recipients
  // @param {BigNumberish[]} percentAllocations - Percent allocations of the recipients
  // @param {BigNumberish} distributorFee - Distributor fee of the split
  // @param {string} distributorAddress - Address of the distributor
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async updateAndDistributeERC20(
    inputAddress: string,
    tokenContractAddress: string,
    inputRecipients: string[],
    percentAllocations: BigNumberish[],
    distributorFee: BigNumberish,
    distributorAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
      validateAndParseAddress(tokenContractAddress);
      validateAndParseAddress(distributorAddress);
      validateAndParseAddresses(inputRecipients);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.updateAndDistributeERC20(
      inputAddress,
      tokenContractAddress,
      inputRecipients,
      percentAllocations,
      distributorFee,
      distributorAddress
    );
  }

  // updateAndDistributeETH
  // @param {string} inputAddress - Address of the split
  // @param {string[]} inputRecipients - Addresses of the recipients
  // @param {BigNumberish[]} percentAllocations - Percent allocations of the recipients
  // @param {BigNumberish} distributorFee - Distributor fee of the split
  // @param {string} distributorAddress - Address of the distributor
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async updateAndDistributeETH(
    inputAddress: string,
    inputRecipients: string[],
    percentAllocations: BigNumberish[],
    distributorFee: BigNumberish,
    distributorAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
      validateAndParseAddress(distributorAddress);
      validateAndParseAddresses(inputRecipients);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.updateAndDistributeETH(
      inputAddress,
      inputRecipients,
      percentAllocations,
      distributorFee,
      distributorAddress
    );
  }

  // updateSplit
  // @param {string} inputAddress - Address of the split
  // @param {string[]} inputRecipients - Addresses of the recipients
  // @param {BigNumberish[]} percentAllocations - Percent allocations of the recipients
  // @param {BigNumberish} distributorFee - Distributor fee of the split
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async updateSplit(
    inputAddress: string,
    inputRecipients: string[],
    percentAllocations: BigNumberish[],
    distributorFee: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
      validateAndParseAddresses(inputRecipients);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.updateSplit(
      inputAddress,
      inputRecipients,
      percentAllocations,
      distributorFee
    );
  }

  // withdraw
  // @param {string} inputAddress - Address of account to withdraw from
  // @param {BigNumberish} withdrawETH - Amount of ETH to withdraw (if nonzero)
  // @param {string[]} tokenContractAddresses - Addresses of ERC20 token contracts to withdraw (if nonzero)
  // @returns {Promise<ContractTransaction>} - Transaction object
  public async withdraw(
    inputAddress: string,
    withdrawETH: BigNumberish,
    tokenContractAddresses: string[]
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(inputAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.withdraw(
      inputAddress,
      withdrawETH,
      tokenContractAddresses
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
