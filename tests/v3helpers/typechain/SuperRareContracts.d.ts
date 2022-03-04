import { ethers, Signer, BigNumber, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface SuperRareContractsInterface extends ethers.utils.Interface {
    functions: {
        "SUPERRARE_REGISTRY()": FunctionFragment;
        "SUPERRARE_V1()": FunctionFragment;
        "SUPERRARE_V2()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "SUPERRARE_REGISTRY", values?: undefined): string;
    encodeFunctionData(functionFragment: "SUPERRARE_V1", values?: undefined): string;
    encodeFunctionData(functionFragment: "SUPERRARE_V2", values?: undefined): string;
    decodeFunctionResult(functionFragment: "SUPERRARE_REGISTRY", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "SUPERRARE_V1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "SUPERRARE_V2", data: BytesLike): Result;
    events: {};
}
export interface SuperRareContracts extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SuperRareContractsInterface;
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
        SUPERRARE_REGISTRY(overrides?: CallOverrides): Promise<[string]>;
        SUPERRARE_V1(overrides?: CallOverrides): Promise<[string]>;
        SUPERRARE_V2(overrides?: CallOverrides): Promise<[string]>;
    };
    SUPERRARE_REGISTRY(overrides?: CallOverrides): Promise<string>;
    SUPERRARE_V1(overrides?: CallOverrides): Promise<string>;
    SUPERRARE_V2(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        SUPERRARE_REGISTRY(overrides?: CallOverrides): Promise<string>;
        SUPERRARE_V1(overrides?: CallOverrides): Promise<string>;
        SUPERRARE_V2(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        SUPERRARE_REGISTRY(overrides?: CallOverrides): Promise<BigNumber>;
        SUPERRARE_V1(overrides?: CallOverrides): Promise<BigNumber>;
        SUPERRARE_V2(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        SUPERRARE_REGISTRY(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        SUPERRARE_V1(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        SUPERRARE_V2(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
