import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IFoundationInterface extends ethers.utils.Interface {
    functions: {
        "getFees(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getFees", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getFees", data: BytesLike): Result;
    events: {};
}
export interface IFoundation extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IFoundationInterface;
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
        getFees(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string[], BigNumber[]]>;
    };
    getFees(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string[], BigNumber[]]>;
    callStatic: {
        getFees(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string[], BigNumber[]]>;
    };
    filters: {};
    estimateGas: {
        getFees(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getFees(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
