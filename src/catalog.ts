// catalog.ts
// Class for Catalog Shared Creator Contract
// Currenly based on TD606 Catalog Shared Creator Contract

import {TokenData, Proof, RoyaltyInfo} from './types';

import {BigNumber, BigNumberish} from '@ethersproject/bignumber';
import {ContractTransaction} from '@ethersproject/contracts';
import {Provider} from '@ethersproject/providers';
import {Signer} from '@ethersproject/abstract-signer';
import invariant from 'tiny-invariant';

import {TD606} from '@catalogworks/catalog-contracts/dist/types/typechain';
import {TD606__factory} from '@catalogworks/catalog-contracts/dist/types/typechain';
import {addresses} from './addresses';
import {
  chainIdToNetwork,
  constructTokenData,
  validateAndParseAddress,
  validateBytes32,
  validateBytes32Array,
  validateURI,
} from './utils';
import {BytesLike} from 'ethers';

export class Catalog {
  public chainId: number;
  public contractAddress: string;
  public signerOrProvider: Signer | Provider;
  // public cnft: CNFT
  public contract: TD606;
  public readOnly: boolean;

  // Constructor
  // @param {Signer | Provider} signerOrProvider Signer or Provider to use for contract calls
  // @param {number} chainId Chain ID of the network to use
  // @param {string} contractAddress deployed Address of the CNFT Proxy to use
  // @returns {Promise<Catalog>} A new Catalog instance
  constructor(
    signerOrProvider: Signer | Provider,
    chainId: number,
    contractAddress?: string
  ) {
    // unecessary
    // if (!contractAddress && !chainId) {
    //     invariant(false, 'Catalog Constructor: contractAddress cannot be null');
    // }

    if (Signer.isSigner(signerOrProvider)) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainId;

    if (contractAddress) {
      const parsedContractAddress = validateAndParseAddress(contractAddress);
      this.contractAddress = parsedContractAddress;
    } else {
      // get contract address based on chainId/network
      const network = chainIdToNetwork(chainId);
      this.contractAddress = addresses[network].catalog;
    }

    this.contract = TD606__factory.connect(
      this.contractAddress,
      this.signerOrProvider
    );
  }

  // View Methods [Getters]

  // Content URI
  // @param {BigNumberish} tokenId uint256 ID of token to fetch content URI of
  // @returns {Promise<string>} The content URI of the token
  public async fetchContentURI(tokenId: BigNumberish): Promise<string> {
    return this.contract.tokenContentURI(tokenId);
  }

  // Metadata URI
  // @param {BigNumberish} tokenId uint256 ID of token to fetch metadata URI of
  // @returns {Promise<string>} The metadata URI of the token
  // @note This is the same as fetchTokenURI
  public async fetchMetadataURI(tokenId: BigNumberish): Promise<string> {
    return this.contract.tokenURI(tokenId);
  }

  // Creator
  // @param {BigNumberish} tokenId uint256 ID of token to fetch creator of
  // @returns {Promise<string>} The creator of the token
  public async fetchCreator(tokenId: BigNumberish): Promise<string> {
    return this.contract.creator(tokenId);
  }

  // Royalty Payout Address
  // @param {BigNumberish} tokenId uint256 ID of token to fetch royalty payout address of
  // @returns {Promise<string>} The address to receive the royalty
  public async fetchRoyaltyPayoutAddress(
    tokenId: BigNumberish
  ): Promise<string> {
    return this.contract.royaltyPayoutAddress(tokenId);
  }

  // Token URI
  // @param {BigNumberish} tokenId uint256 ID of token to fetch tokenURI (metadata) of
  // @returns {Promise<string>} The token URI of the token
  public async fetchTokenURI(tokenId: BigNumberish): Promise<string> {
    return this.contract.tokenURI(tokenId);
  }

  // Royalty Info
  // @param {BigNumberish} tokenId uint256 ID of token to fetch royalty info of
  // @param {BigNumberish} salePrice BigNumberish The input sale price of the token (See EIP-2981 for more info)
  // @returns {Promise<RoyaltyInfo>} The royalty info of the token
  public async fetchRoyaltyInfo(
    tokenId: BigNumberish,
    salePrice: BigNumberish
  ): Promise<RoyaltyInfo> {
    return this.contract.royaltyInfo(tokenId, salePrice);
  }

  // Merkle Root
  // @returns {Promise<string>} The merkle root of the catalog contract
  // @note view only for Merkle Root
  public async fetchMerkleRoot(): Promise<string> {
    return this.contract.merkleRoot();
  }

  // Write Methods [Transactions]

  // Update Content URI
  // @param {BigNumberish} tokenId uint256 ID of token to update
  // @param {string} contentURI string The new content URI
  // @returns {Promise<ContractTransaction>} The transaction object
  public async updateContentURI(
    tokenId: BigNumberish,
    contentURI: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateURI(contentURI);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.updateContentURI(tokenId, contentURI);
  }

  // Update Metadata URI
  // @param {BigNumberish} tokenId uint256 ID of token to update
  // @param {string} metadataURI string The new metadata URI
  // @returns {Promise<ContractTransaction>} The transaction object
  public async updateMetadataURI(
    tokenId: BigNumberish,
    metadataURI: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateURI(metadataURI);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.updateMetadataURI(tokenId, metadataURI);
  }

  // Update Royalty Info
  // @param {BigNumberish} tokenId uint256 ID of token to update
  // @param {string} royaltyPayoutAddress address The address to receive the royalty
  // @returns {Promise<ContractTransaction>} The transaction object
  public async updateRoyaltyInfo(
    tokenId: BigNumberish,
    royaltyPayoutAddress: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(royaltyPayoutAddress);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.updateRoyaltyInfo(tokenId, royaltyPayoutAddress);
  }

  // Update Root
  // @param {BytesLike} merkleRoot bytes32 The new root of the merkle tree
  // @returns {Promise<ContractTransaction>} The transaction object
  public async updateRoot(merkleRoot: BytesLike): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateBytes32(merkleRoot);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.updateRoot(merkleRoot);
  }

  // Mint
  // @param {TokenData} tokenData The token data to mint
  // @param {Proof} proof The bytes32 merkle proof for the TokenData.creator
  // @returns {Promise<ContractTransaction>} The transaction object
  public async mint(
    tokenData: TokenData,
    proof: Proof
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateURI(tokenData.metadataURI);
      validateURI(tokenData.contentURI);
      // validate the proof as a valid Bytes32 array
      validateBytes32Array(proof.proof);
    } catch (err) {
      return Promise.reject(err);
    }

    const gasEstimate = await this.contract.estimateGas.mint(
      tokenData,
      proof.proof
    );
    const paddedEstimate = gasEstimate.mul(110).div(100);

    return this.contract.mint(tokenData, proof.proof, {
      gasLimit: paddedEstimate.toString(),
    });
  }

  // Burn
  // @param {BigNumberish} tokenId uint256 ID of token to burn
  // @returns {Promise<ContractTransaction>} The transaction object
  public async burn(tokenId: BigNumberish): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.burn(tokenId);
  }

  // Initialize
  // Replacement for constructor, needed for tests
  // @param {string} name string The name of the catalog contract
  // @param {string} symbol string The symbol of the catalog contract
  // @returns {Promise<ContractTransaction>} The transaction object
  // @note Do not use this function on deployed contracts, it's for testing purposes only.
  public async initialize(
    name: string,
    symbol: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.initialize(name, symbol);
  }

  // ERC721 View Methods

  // Balance of
  // @param {string} owner address The address to query the balance of
  // @returns {Promise<BigNumber>} The balance of the address
  public async fetchBalanceOf(owner: string): Promise<BigNumber> {
    return this.contract.balanceOf(owner);
  }

  // Owner of
  // @param {BigNumberish} tokenId uint256 ID of token to check
  // @returns {Promise<string>} The owner of the token
  public async fetchOwnerOf(tokenId: BigNumberish): Promise<string> {
    return this.contract.ownerOf(tokenId);
  }

  // Approved
  // @param {BigNumberish} tokenId uint256 The token ID to check
  // @returns {Promise<string>} The approved address of the token
  public async fetchApproved(tokenId: BigNumberish): Promise<string> {
    return this.contract.getApproved(tokenId);
  }

  // Is Approved For All
  // @param {string} owner address The owner of the tokens
  // @param {string} operator address The operator to check for
  // @returns {Promise<boolean>} Whether or not the operator is approved for all
  public async fetchIsApprovedForAll(
    owner: string,
    operator: string
  ): Promise<boolean> {
    return this.contract.isApprovedForAll(owner, operator);
  }

  // Contract Owner
  // @returns {Promise<string>} The owner of the contract
  // @note view only for contract owner
  public async fetchOwner(): Promise<string> {
    return this.contract.owner();
  }

  // ERC721 Write Methods

  // Approve
  // @param {string} to address The address which will have approval aftet the call
  // @param {BigNumberish} tokenId BigNumber The tokenId to approve
  // @returns {Promise<ContractTransaction>} The transaction object
  public async approve(
    to: string,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(to);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.approve(to, tokenId);
  }

  // Set Approval For All
  // @param {string} operator The address which is able to transfer the tokens.
  // @param {boolean} approved Whether the operator is approved or not.
  // @returns {Promise<ContractTransaction>} The transaction object
  public async setApprovalForAll(
    operator: string,
    approved: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(operator);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.setApprovalForAll(operator, approved);
  }

  // Transfer From
  // @param {string} from address The address which you want to transfer from
  // @param {string} to address The address which you want to transfer to
  // @param {BigNumberish} tokenId BigNumber The tokenId you want to transfer
  // @returns {Promise<ContractTransaction>} The transaction object
  public async transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(from);
      validateAndParseAddress(to);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.contract.transferFrom(from, to, tokenId);
  }

  // Safe Transfer Method
  // @param {string} from - The address of the sender
  // @param {string} to - The address of the receiver
  // @param {BigNumberish} tokenId - The ID of the token to be transferred
  // @returns {Promise<ContractTransaction>} The transaction object
  public async safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      validateAndParseAddress(from);
      validateAndParseAddress(to);
    } catch (err) {
      return Promise.reject(err);
    }
    // unsure why this is exported like this
    return this.contract['safeTransferFrom(address,address,uint256)'](
      from,
      to,
      tokenId
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
