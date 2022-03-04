import { ethers, Signer, BigNumber, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IncomingTransferSupportV1Interface extends ethers.utils.Interface {
    functions: {
        "erc20TransferHelper()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "erc20TransferHelper", values?: undefined): string;
    decodeFunctionResult(functionFragment: "erc20TransferHelper", data: BytesLike): Result;
    events: {};
}
export interface IncomingTransferSupportV1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IncomingTransferSupportV1Interface;
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
        erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;
    };
    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        erc20TransferHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
