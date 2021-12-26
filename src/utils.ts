import { getAddress } from "@ethersproject/address";
import invariant from "tiny-invariant";
import warning from 'tiny-warning';
import { TokenData, Proof } from "./types";


import { arrayify, BytesLike, hexDataLength, hexlify, isHexString } from "@ethersproject/bytes";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ethers, Wallet } from 'ethers';
import { ContractTransaction } from "@ethersproject/contracts";



// Type Constructors

// Regex to validate URI
export function validateURI(uri: string) {
    if (!uri.match(/^(https)|(ipfs):\/\/(.*)/)) {
        invariant(false, `${uri} must begin with \`https://\` or \`ipfs://\``);
    }
}

export function validateAndParseAddress(address: string): string {

    try {
        const checksumAddress = getAddress(address);
        warning(address === checksumAddress, `${address} is not checksummed`);
        return checksumAddress;
    } catch (error) {
        invariant(false, `${address} is not a valid address`);
    }
}


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





