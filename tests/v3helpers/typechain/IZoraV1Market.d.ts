import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type DecimalStruct = {
    value: BigNumberish;
};
export declare type DecimalStructOutput = [BigNumber] & {
    value: BigNumber;
};
export declare type BidSharesStruct = {
    prevOwner: DecimalStruct;
    creator: DecimalStruct;
    owner: DecimalStruct;
};
export declare type BidSharesStructOutput = [
    DecimalStructOutput,
    DecimalStructOutput,
    DecimalStructOutput
] & {
    prevOwner: DecimalStructOutput;
    creator: DecimalStructOutput;
    owner: DecimalStructOutput;
};
export interface IZoraV1MarketInterface extends ethers.utils.Interface {
    functions: {
        "bidSharesForToken(uint256)": FunctionFragment;
        "isValidBid(uint256,uint256)": FunctionFragment;
        "splitShare((uint256),uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "bidSharesForToken", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isValidBid", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "splitShare", values: [DecimalStruct, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "bidSharesForToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isValidBid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "splitShare", data: BytesLike): Result;
    events: {};
}
export interface IZoraV1Market extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IZoraV1MarketInterface;
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
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[BidSharesStructOutput]>;
        isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        splitShare(share: DecimalStruct, amount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BidSharesStructOutput>;
    isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    splitShare(share: DecimalStruct, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BidSharesStructOutput>;
        isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        splitShare(share: DecimalStruct, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        splitShare(share: DecimalStruct, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        splitShare(share: DecimalStruct, amount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
