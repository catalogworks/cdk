import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type ZoraDecimalStruct = {
    value: BigNumberish;
};
export declare type ZoraDecimalStructOutput = [BigNumber] & {
    value: BigNumber;
};
export declare type ZoraBidSharesStruct = {
    prevOwner: ZoraDecimalStruct;
    creator: ZoraDecimalStruct;
    owner: ZoraDecimalStruct;
};
export declare type ZoraBidSharesStructOutput = [
    ZoraDecimalStructOutput,
    ZoraDecimalStructOutput,
    ZoraDecimalStructOutput
] & {
    prevOwner: ZoraDecimalStructOutput;
    creator: ZoraDecimalStructOutput;
    owner: ZoraDecimalStructOutput;
};
export interface IZoraMarketInterface extends ethers.utils.Interface {
    functions: {
        "bidSharesForToken(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "bidSharesForToken", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "bidSharesForToken", data: BytesLike): Result;
    events: {};
}
export interface IZoraMarket extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IZoraMarketInterface;
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
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[ZoraBidSharesStructOutput]>;
    };
    bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<ZoraBidSharesStructOutput>;
    callStatic: {
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<ZoraBidSharesStructOutput>;
    };
    filters: {};
    estimateGas: {
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
