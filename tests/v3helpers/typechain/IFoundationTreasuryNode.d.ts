import { ethers, Signer, BigNumber, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IFoundationTreasuryNodeInterface extends ethers.utils.Interface {
    functions: {
        "getFoundationTreasury()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getFoundationTreasury", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getFoundationTreasury", data: BytesLike): Result;
    events: {};
}
export interface IFoundationTreasuryNode extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IFoundationTreasuryNodeInterface;
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
        getFoundationTreasury(overrides?: CallOverrides): Promise<[string]>;
    };
    getFoundationTreasury(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        getFoundationTreasury(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        getFoundationTreasury(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getFoundationTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
