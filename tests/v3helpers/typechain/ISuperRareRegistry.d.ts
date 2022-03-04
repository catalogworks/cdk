import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ISuperRareRegistryInterface extends ethers.utils.Interface {
    functions: {
        "calculateRoyaltyFee(address,uint256,uint256)": FunctionFragment;
        "getERC721TokenRoyaltyPercentage(address,uint256)": FunctionFragment;
        "tokenCreator(address,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "calculateRoyaltyFee", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getERC721TokenRoyaltyPercentage", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "tokenCreator", values: [string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "calculateRoyaltyFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getERC721TokenRoyaltyPercentage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenCreator", data: BytesLike): Result;
    events: {};
}
export interface ISuperRareRegistry extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISuperRareRegistryInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        calculateRoyaltyFee(_contractAddress: string, _tokenId: BigNumberish, _amount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        getERC721TokenRoyaltyPercentage(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<[number]>;
        tokenCreator(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
    };
    calculateRoyaltyFee(_contractAddress: string, _tokenId: BigNumberish, _amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getERC721TokenRoyaltyPercentage(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<number>;
    tokenCreator(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        calculateRoyaltyFee(_contractAddress: string, _tokenId: BigNumberish, _amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getERC721TokenRoyaltyPercentage(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<number>;
        tokenCreator(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        calculateRoyaltyFee(_contractAddress: string, _tokenId: BigNumberish, _amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getERC721TokenRoyaltyPercentage(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        tokenCreator(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        calculateRoyaltyFee(_contractAddress: string, _tokenId: BigNumberish, _amount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getERC721TokenRoyaltyPercentage(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenCreator(_contractAddress: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
