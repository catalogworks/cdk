// utils.ts
// Various helper functions
import {getAddress} from '@ethersproject/address';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import {TokenData, Proof, ContentData} from './types';

import {
  arrayify,
  BytesLike,
  hexDataLength,
  hexlify,
  isHexString,
} from '@ethersproject/bytes';
import {BigNumber, BigNumberish} from '@ethersproject/bignumber';
import {ethers, Wallet} from 'ethers';
import {ContractTransaction} from '@ethersproject/contracts';
import sjcl from 'sjcl';
import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';

// Function to validate URI of IPFS hash
// @param {string} uri - URI of IPFS hash
// @returns {boolean} - true if valid, false if invalid
export function validateURI(uri: string) {
  if (!uri.match(/^(https)|(ipfs):\/\/(.*)/)) {
    invariant(false, `${uri} must begin with \`https://\` or \`ipfs://\``);
  }
}

// Validates the input address is a valid Ethereum address
// @param {string} address - Ethereum address
// @returns {string} - validated and parsed address
export function validateAndParseAddress(address: string): string {
  try {
    const checksumAddress = getAddress(address);
    warning(address === checksumAddress, `${address} is not checksummed`);
    return checksumAddress;
  } catch (error) {
    invariant(false, `${address} is not a valid address`);
  }
}

// Validates the input address is a valid Ethereum address
// @param {string} address - Ethereum address
// @returns {string} - validated and parsed address
export function validateAndParseAddresses(address: string[]): string[] {
  address.forEach((addr) => validateAndParseAddress(addr));
  return address;
}

// Returns string network name corresponding to Chain ID
// @param {number} chainId - Chain ID
// @returns {string} - network name
export function chainIdToNetwork(chainId: number): string {
  switch (chainId) {
    case 1: {
      return 'mainnet';
    }
    case 4: {
      return 'rinkeby';
    }
  }

  invariant(false, `chainId: ${chainId} is not currently supported`);
}

// Validates BytesLike input as valid Bytes32 Data
// @param {BytesLike} value - BytesLike input
// @returns {Bytes32} - validated and parsed Bytes32 Data
export function validateBytes32(value: BytesLike) {
  if (typeof value == 'string') {
    if (isHexString(value) && hexDataLength(value) == 32) {
      return;
    }
    invariant(false, `${value} is not a valid Bytes32 hex string`);
  } else {
    if (hexDataLength(hexlify(value)) == 32) {
      return;
    }
    invariant(false, `${value} is not of length 32 byte array`);
  }
}

// does this shit work
// @param {string} value - BytesLike[] array input
// @returns {Bytes32[]} - validated and parsed Bytes32[] Data
export function validateBytes32Array(value: BytesLike[]) {
  value.forEach(validateBytes32);
}

// Constructs an object of TokenData type.
// @param {string} metadataURI - URI of IPFS hash of metadata
// @param {string} creator - Ethereum address of creator
// @param {string} royaltyPayout - Ethereum address of royalty payout
// @param {BigNumberish} royaltyBPS - BigNumber of royalty BPS
// @returns {TokenData} - TokenData type
export function constructTokenData(
  metadataURI: string,
  creator: string,
  royaltyPayout: string,
  royaltyBPS: BigNumberish
): TokenData {
  // Validate Inputs
  // validateURI
  validateURI(metadataURI);
  return {
    metadataURI,
    creator,
    royaltyPayout,
    royaltyBPS,
  };
}

// Constructs an object of ContentData type.
// @param {string} contentURI - URI of IPFS hash of content
// @param {BytesLike} contentHash - SHA256 hash of content
// @returns {ContentData} - ContentData type
export function constructContentData(
  contentURI: string,
  contentHash: BytesLike
): ContentData {
  // Validate Inputs
  validateURI(contentURI);
  return {
    contentURI,
    contentHash,
  };
}

// Utility function to strip 0x from hex strings
// @param {string} hex - hex string
// @returns {string} - hex string without 0x
export function stripHexPrefix(hex: string) {
  return hex.slice(0, 2) == '0x' ? hex.slice(2) : hex;
}

// Hash utils

// Generates SHA256 hash from a buffer and returns hash hex encoded
// @param {Buffer} buffer - Buffer to hash
// @returns {string} - hex encoded hash
export function sha256FromBuffer(buffer: Buffer): string {
  const bitArray = sjcl.codec.hex.toBits(buffer.toString('hex'));
  const hashArray = sjcl.hash.sha256.hash(bitArray);
  return '0x'.concat(sjcl.codec.hex.fromBits(hashArray));
}

// generates sha256 hash from a 0x hex string and returns hash hex encoded
// @param {string} data - hex string to hash
// @returns {string} - SHA256 encoded hash string
export function sha256FromHexString(data: string): string {
  if (!isHexString(data)) {
    // invariant(false, `${data} is not a valid hex string`);
    throw new Error(`${data} is not a valid hex string`);
  }

  const bitArray = sjcl.codec.hex.toBits(stripHexPrefix(data));
  const hashArray = sjcl.hash.sha256.hash(bitArray);
  return '0x'.concat(sjcl.codec.hex.fromBits(hashArray));
}

// MERKLE TREE UTILITIES
// prob can refactor

// Generates Merkle Tree from an input array of strings
// @param {string[]} data - array of strings
// @returns {MerkleTree} arb object of type MerkleTree
// @note this operation does not provide any checks on validity of the input data
export function generateMerkleTree(data: string[]): MerkleTree {
  const leaves = data.map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, {sortPairs: true});
  return tree;
}

// Gets the merkle root from an input MerkleTree
// @param {MerkleTree} inputTree - MerkleTree the pre-generated merkle tree
// @returns {string} merkle root hex encoded
export function generateMerkleRootFromTree(inputTree: MerkleTree): string {
  return inputTree.getHexRoot();
}

// Generates Merkle Proof from an input MerkleTree and single address
// @param {MerkleTree} inputTree - MerkleTree the pre-generated merkle tree
// @param {string} address - string address to generate proof for
// @returns {Proof} contains proof bytesLike array
export function generateMerkleProof(
  inputTree: MerkleTree,
  address: string
): Proof {
  const leaf = keccak256(address);
  const proof = inputTree.getHexProof(leaf);
  return {proof};
}

/// Generates Merkle Proof from an input MerkleTree and array of addresses (strings)
/// @param {MerkleTree} inputTree - MerkleTree the pre-generated merkle tree
/// @param {string[]} addresses - array of string addresses to generate proofs for
/// @returns {Proof[]} Proof - array of Proof objects
export function generateMerkleProofs(
  inputTree: MerkleTree,
  addresses: string[]
): Proof[] {
  return addresses.map((address) => generateMerkleProof(inputTree, address));
}
