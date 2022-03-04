import { ethers, Signer, BigNumber, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface BaseTransferHelperInterface extends ethers.utils.Interface {
    functions: {
        "ZMM()": FunctionFragment;
        "isModuleApproved(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "ZMM", values?: undefined): string;
    encodeFunctionData(functionFragment: "isModuleApproved", values: [string]): string;
    decodeFunctionResult(functionFragment: "ZMM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isModuleApproved", data: BytesLike): Result;
    events: {};
}
export interface BaseTransferHelper extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BaseTransferHelperInterface;
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
        ZMM(overrides?: CallOverrides): Promise<[string]>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<[boolean]>;
    };
    ZMM(overrides?: CallOverrides): Promise<string>;
    isModuleApproved(_user: string, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        ZMM(overrides?: CallOverrides): Promise<string>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        ZMM(overrides?: CallOverrides): Promise<BigNumber>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ZMM(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
