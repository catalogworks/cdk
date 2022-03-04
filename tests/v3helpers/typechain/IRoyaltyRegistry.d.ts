import { ethers, Signer, BigNumber, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IRoyaltyRegistryInterface extends ethers.utils.Interface {
    functions: {
        "getRoyaltyLookupAddress(address)": FunctionFragment;
        "overrideAllowed(address)": FunctionFragment;
        "setRoyaltyLookupAddress(address,address)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getRoyaltyLookupAddress", values: [string]): string;
    encodeFunctionData(functionFragment: "overrideAllowed", values: [string]): string;
    encodeFunctionData(functionFragment: "setRoyaltyLookupAddress", values: [string, string]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "getRoyaltyLookupAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "overrideAllowed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRoyaltyLookupAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    events: {
        "RoyaltyOverride(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "RoyaltyOverride"): EventFragment;
}
export declare type RoyaltyOverrideEvent = TypedEvent<[
    string,
    string,
    string
], {
    owner: string;
    tokenAddress: string;
    royaltyAddress: string;
}>;
export declare type RoyaltyOverrideEventFilter = TypedEventFilter<RoyaltyOverrideEvent>;
export interface IRoyaltyRegistry extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IRoyaltyRegistryInterface;
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
        getRoyaltyLookupAddress(tokenAddress: string, overrides?: CallOverrides): Promise<[string]>;
        overrideAllowed(tokenAddress: string, overrides?: CallOverrides): Promise<[boolean]>;
        setRoyaltyLookupAddress(tokenAddress: string, royaltyAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
    };
    getRoyaltyLookupAddress(tokenAddress: string, overrides?: CallOverrides): Promise<string>;
    overrideAllowed(tokenAddress: string, overrides?: CallOverrides): Promise<boolean>;
    setRoyaltyLookupAddress(tokenAddress: string, royaltyAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        getRoyaltyLookupAddress(tokenAddress: string, overrides?: CallOverrides): Promise<string>;
        overrideAllowed(tokenAddress: string, overrides?: CallOverrides): Promise<boolean>;
        setRoyaltyLookupAddress(tokenAddress: string, royaltyAddress: string, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "RoyaltyOverride(address,address,address)"(owner?: null, tokenAddress?: null, royaltyAddress?: null): RoyaltyOverrideEventFilter;
        RoyaltyOverride(owner?: null, tokenAddress?: null, royaltyAddress?: null): RoyaltyOverrideEventFilter;
    };
    estimateGas: {
        getRoyaltyLookupAddress(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber>;
        overrideAllowed(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber>;
        setRoyaltyLookupAddress(tokenAddress: string, royaltyAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getRoyaltyLookupAddress(tokenAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        overrideAllowed(tokenAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setRoyaltyLookupAddress(tokenAddress: string, royaltyAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
