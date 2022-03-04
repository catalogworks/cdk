import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface CollectionOfferBookV1Interface extends ethers.utils.Interface {
    functions: {
        "ceilingOfferAmount(address)": FunctionFragment;
        "ceilingOfferId(address)": FunctionFragment;
        "findersFeeOverrides(address,uint256)": FunctionFragment;
        "floorOfferAmount(address)": FunctionFragment;
        "floorOfferId(address)": FunctionFragment;
        "offerCount()": FunctionFragment;
        "offers(address,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "ceilingOfferAmount", values: [string]): string;
    encodeFunctionData(functionFragment: "ceilingOfferId", values: [string]): string;
    encodeFunctionData(functionFragment: "findersFeeOverrides", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "floorOfferAmount", values: [string]): string;
    encodeFunctionData(functionFragment: "floorOfferId", values: [string]): string;
    encodeFunctionData(functionFragment: "offerCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "offers", values: [string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "ceilingOfferAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ceilingOfferId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "findersFeeOverrides", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "floorOfferAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "floorOfferId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "offerCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "offers", data: BytesLike): Result;
    events: {};
}
export interface CollectionOfferBookV1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CollectionOfferBookV1Interface;
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
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[number]>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        offerCount(overrides?: CallOverrides): Promise<[BigNumber]>;
        offers(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            seller: string;
            amount: BigNumber;
            id: BigNumber;
            prevId: BigNumber;
            nextId: BigNumber;
        }>;
    };
    ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<number>;
    floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    floorOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    offerCount(overrides?: CallOverrides): Promise<BigNumber>;
    offers(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        seller: string;
        amount: BigNumber;
        id: BigNumber;
        prevId: BigNumber;
        nextId: BigNumber;
    }>;
    callStatic: {
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<number>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        offerCount(overrides?: CallOverrides): Promise<BigNumber>;
        offers(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            seller: string;
            amount: BigNumber;
            id: BigNumber;
            prevId: BigNumber;
            nextId: BigNumber;
        }>;
    };
    filters: {};
    estimateGas: {
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        offerCount(overrides?: CallOverrides): Promise<BigNumber>;
        offers(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        offerCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        offers(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
