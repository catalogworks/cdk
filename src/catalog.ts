// catalog.ts
// Class for Catalog Shared Creator Contract
// Currenly based on TD606 Catalog Shared Creator Contract 

import { TokenData, Proof, RoyaltyInfo } from "./types";

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ContractTransaction } from "@ethersproject/contracts";
import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import  invariant  from 'tiny-invariant';

import { TD606 } from '@catalogworks/catalog-contracts/dist/types/typechain';
import { TD606__factory } from '@catalogworks/catalog-contracts/dist/types/typechain';
import { addresses } from "./addresses";
import { chainIdToNetwork, constructTokenData, validateAndParseAddress, validateBytes32, validateBytes32Array, validateURI } from "./utils";
import { BytesLike } from "ethers";



export class Catalog {
    
    public chainId: number;
    public contractAddress: string;
    public signerOrProvider: Signer | Provider;
    // public cnft: CNFT
    public contract: TD606;
    public readOnly: boolean;


    // Constructor
    constructor(
        signerOrProvider: Signer | Provider,
        chainId: number,
        contractAddress?: string,
    ) {

        if (!contractAddress) {
            invariant(false, 'Catalog Constructor: contractAddress cannot be null');
        }

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
            const network = chainIdToNetwork(chainId);
            this.contractAddress = addresses[network].catalog;
            // get contract address based on chainId/network
            
        }

        this.contract = TD606__factory.connect(this.contractAddress, this.signerOrProvider);

    }


    // View Methods [Getters]

    // Content URI
    // @param tokenId uint256 ID of token to fetch content URI of
    public async fetchContentURI(tokenId: BigNumberish): Promise<string> {
        return this.contract.tokenContentURI(tokenId);
    }

    // Metadata URI
    // @param tokenId uint256 ID of token to fetch metadata URI of
    // @note This is the same as fetchTokenURI
    public async fetchMetdataURI(tokenId: BigNumberish): Promise<string> {
        return this.contract.tokenURI(tokenId);
    }

    // Creator
    // @param tokenId uint256 ID of token to fetch creator of
    public async fetchCreator(tokenId: BigNumberish): Promise<string> {
        return this.contract.creator(tokenId);
    }

    // Royalty Payout Address
    // @param tokenId uint256 ID of token to fetch royalty payout address of
    public async fetchRoyaltyPayoutAddress(tokenId: BigNumberish): Promise<string> {
        return this.contract.royaltyPayoutAddress(tokenId);
    }

    // Token URI
    // @param tokenId uint256 ID of token to fetch tokenURI (metadata) of
    public async fetchTokenURI(tokenId: BigNumberish): Promise<string> {
        return this.contract.tokenURI(tokenId);
    }

    // Royalty Info
    // @param tokenId uint256 ID of token to fetch royalty info of
    // @param salePrice BigNumberish The input sale price of the token (See EIP-2981 for more info)
    public async fetchRoyaltyInfo(tokenId: BigNumberish, salePrice: BigNumberish): Promise<RoyaltyInfo> {
        return this.contract.royaltyInfo(tokenId, salePrice);
    }



    // Write Methods [Transactions]

    // Update Content URI
    // @param tokenId uint256 ID of token to update
    // @param contentURI string The new content URI
    public async updateContentURI(tokenId: BigNumberish, contentURI: string): Promise<ContractTransaction> {
        try {
            this.ensureNotReadOnly();
            validateURI(contentURI);
        } catch (err) {
            return Promise.reject(err);
        }

        return this.contract.updateContentURI(tokenId, contentURI);
    }

    // Update Metadata URI
    // @param tokenId uint256 ID of token to update
    // @param metadataURI string The new metadata URI
    public async updateMetadataURI(tokenId: BigNumberish, metadataURI: string): Promise<ContractTransaction> {

        try {
            this.ensureNotReadOnly();
            validateURI(metadataURI);
        } catch (err) {
            return Promise.reject(err);
        }

        return this.contract.updateMetadataURI(tokenId, metadataURI);
    }

    // Update Royalty Info
    // @param tokenId uint256 ID of token to update
    // @param royaltyPayoutAddress address The address to receive the royalty
    public async updateRoyaltyInfo(tokenId: BigNumberish, royaltyPayoutAddress: string): Promise<ContractTransaction> {
            
            try {
                this.ensureNotReadOnly();
                validateAndParseAddress(royaltyPayoutAddress);
            } catch (err) {
                return Promise.reject(err);
            }
    
            return this.contract.updateRoyaltyInfo(tokenId, royaltyPayoutAddress);
    }

    // Update Root
    // @param merkleRoot bytes32 The new root of the merkle tree
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
    // @param TokenData tokenData The token data to mint
    // @param Proof proof The bytes32 merkle proof for the TokenData.creator
    public async mint(tokenData: TokenData, proof: Proof): Promise<ContractTransaction> {

        try {
            this.ensureNotReadOnly();
            validateURI(tokenData.metadataURI);
            validateURI(tokenData.contentURI);
            // validate the proof as a valid Bytes32 array
            validateBytes32Array(proof.proof);
        } catch (err) {
            return Promise.reject(err);
        }


        const gasEstimate = await this.contract.estimateGas.mint(tokenData, proof.proof);
        const paddedEstimate = gasEstimate.mul(110).div(100);

        return this.contract.mint(tokenData, proof.proof, { gasLimit: paddedEstimate.toString() });
    }

    // Burn
    // @param tokenId uint256 ID of token to burn
    public async burn(tokenId: BigNumberish): Promise<ContractTransaction> {

        try {
            this.ensureNotReadOnly();
        } catch (err) {
            return Promise.reject(err);
        }

        return this.contract.burn(tokenId);
    }




    // ERC721 View Methods
    
    // Balance of
    // @param owner address The address to query the balance of
    public async fetchBalanceOf(owner: string): Promise<BigNumber> {
        return this.contract.balanceOf(owner);
    }

    // Owner of
    // @param tokenId uint256 ID of token to check
    public async fetchOwnerOf(tokenId: BigNumberish): Promise<string> {
        return this.contract.ownerOf(tokenId);
    }

    // Approved
    // @param tokenId uint256 The token ID to check
    public async fetchApproved(tokenId: BigNumberish): Promise<string> {
        return this.contract.getApproved(tokenId);
    }

    // Is Approved For All
    // @param owner address The owner of the tokens
    // @param operator address The operator to check for
    public async fetchIsApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return this.contract.isApprovedForAll(owner, operator);
    }



    // ERC721 Write Methods


    // Approve
    // @param to address The address which will have approval aftet the call
    // @param tokenId BigNumber The tokenId to approve
    public async approve(to: string, tokenId: BigNumberish): Promise<ContractTransaction> {
        try {
            this.ensureNotReadOnly();
            validateAndParseAddress(to);
        } catch (err) {
            return Promise.reject(err);
        }

        return this.contract.approve(to, tokenId);
    }

    // Set Approval For All
    // @param operator The address which is able to transfer the tokens.
    // @param approved Whether the operator is approved or not.
    public async setApprovalForAll(operator: string, approved: boolean): Promise<ContractTransaction> {
        try {
            this.ensureNotReadOnly();
            validateAndParseAddress(operator);
        } catch (err) {
            return Promise.reject(err);
        }

        return this.contract.setApprovalForAll(operator, approved);
    }

    // Transfer From
    // @param from address The address which you want to transfer from
    // @param to address The address which you want to transfer to
    // @param tokenId BigNumber The tokenId you want to transfer
    public async transferFrom(from: string, to: string, tokenId: BigNumberish): Promise<ContractTransaction> {
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
    // @param from - The address of the sender
    // @param to - The address of the receiver
    // @param tokenId - The ID of the token to be transferred
    public async safeTransferFrom(from: string, to: string, tokenId: BigNumberish): Promise<ContractTransaction> {
        try {
            this.ensureNotReadOnly();
            validateAndParseAddress(from);
            validateAndParseAddress(to);
        } catch (err) {
            return Promise.reject(err);
        }
        // unsure why this is exported like this
        return this.contract["safeTransferFrom(address,address,uint256)"](from, to, tokenId);
    }



    // Private methods

    // Thorws an error if called on read-only instance
    private ensureNotReadOnly(): void {
        if (this.readOnly) {
            throw new Error('Cannot modify read-only instance');
        }
    }



}