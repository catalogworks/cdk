// utils.ts
// Various helper functions
import { getAddress } from "@ethersproject/address";
import invariant from "tiny-invariant";
import warning from 'tiny-warning';
import { TokenData, Proof } from "./types";


import { arrayify, BytesLike, hexDataLength, hexlify, isHexString } from "@ethersproject/bytes";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ethers, Wallet } from 'ethers';
import { ContractTransaction } from "@ethersproject/contracts";




// Regex to validate URI of IPFS hash
export function validateURI(uri: string) {
    if (!uri.match(/^(https)|(ipfs):\/\/(.*)/)) {
        invariant(false, `${uri} must begin with \`https://\` or \`ipfs://\``);
    }
}

// Validates the input address is a valid Ethereum address
export function validateAndParseAddress(address: string): string {

    try {
        const checksumAddress = getAddress(address);
        warning(address === checksumAddress, `${address} is not checksummed`);
        return checksumAddress;
    } catch (error) {
        invariant(false, `${address} is not a valid address`);
    }
}

// Returns string network name corresponding to Chain ID
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
export function validateBytes32(value: BytesLike) {

    if (typeof value == 'string') {
        if (isHexString(value) && hexDataLength(value) == 32) {
            return
        }
        invariant(false, `${value} is not a valid Bytes32 hex string`);
    } else {
        if (hexDataLength(hexlify(value)) == 32) {
            return
        }
        invariant(false, `${value} is not of length 32 byte array`);
    }
}

// does this shit work
export function validateBytes32Array(value: BytesLike[]) {
    value.forEach(validateBytes32);
}



// Constructs a TokenData type.
export function constructTokenData(
    metadataURI: string,
    contentURI: string,
    creator: string,
    royaltyPayout: string,
    royaltyBPS: BigNumberish,
): TokenData {

    // Validate Inputs
    // validateURI
    validateURI(metadataURI);
    validateURI(contentURI);
    return {
        metadataURI,
        contentURI,
        creator,
        royaltyPayout,
        royaltyBPS,
    };
}


// CLEAN
export function stripHexPrefix(hex: string) {
    return hex.slice(0, 2) == '0x' ? hex.slice(2) : hex;
}





