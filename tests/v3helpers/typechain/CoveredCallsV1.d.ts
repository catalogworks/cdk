import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type CallStruct = {
    seller: string;
    buyer: string;
    currency: string;
    premium: BigNumberish;
    strike: BigNumberish;
    expiration: BigNumberish;
};
export declare type CallStructOutput = [
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber
] & {
    seller: string;
    buyer: string;
    currency: string;
    premium: BigNumber;
    strike: BigNumber;
    expiration: BigNumber;
};
export declare type ExchangeDetailsStruct = {
    tokenContract: string;
    tokenId: BigNumberish;
    amount: BigNumberish;
};
export declare type ExchangeDetailsStructOutput = [string, BigNumber, BigNumber] & {
    tokenContract: string;
    tokenId: BigNumber;
    amount: BigNumber;
};
export interface CoveredCallsV1Interface extends ethers.utils.Interface {
    functions: {
        "_handleRoyaltyEnginePayout(address,uint256,uint256,address)": FunctionFragment;
        "buyCall(address,uint256)": FunctionFragment;
        "callForNFT(address,uint256)": FunctionFragment;
        "cancelCall(address,uint256)": FunctionFragment;
        "createCall(address,uint256,uint256,uint256,uint256,address)": FunctionFragment;
        "erc20TransferHelper()": FunctionFragment;
        "erc721TransferHelper()": FunctionFragment;
        "exerciseCall(address,uint256)": FunctionFragment;
        "name()": FunctionFragment;
        "reclaimCall(address,uint256)": FunctionFragment;
        "registrar()": FunctionFragment;
        "setRoyaltyEngineAddress(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "_handleRoyaltyEnginePayout", values: [string, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "buyCall", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "callForNFT", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "cancelCall", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "createCall", values: [
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        string
    ]): string;
    encodeFunctionData(functionFragment: "erc20TransferHelper", values?: undefined): string;
    encodeFunctionData(functionFragment: "erc721TransferHelper", values?: undefined): string;
    encodeFunctionData(functionFragment: "exerciseCall", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "reclaimCall", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "registrar", values?: undefined): string;
    encodeFunctionData(functionFragment: "setRoyaltyEngineAddress", values: [string]): string;
    decodeFunctionResult(functionFragment: "_handleRoyaltyEnginePayout", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "callForNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erc20TransferHelper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erc721TransferHelper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exerciseCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reclaimCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registrar", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRoyaltyEngineAddress", data: BytesLike): Result;
    events: {
        "CallCanceled(address,uint256,tuple)": EventFragment;
        "CallCreated(address,uint256,tuple)": EventFragment;
        "CallExercised(address,uint256,tuple)": EventFragment;
        "CallPurchased(address,uint256,tuple)": EventFragment;
        "CallReclaimed(address,uint256,tuple)": EventFragment;
        "ExchangeExecuted(address,address,tuple,tuple)": EventFragment;
        "RoyaltyPayout(address,uint256,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CallCanceled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CallCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CallExercised"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CallPurchased"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CallReclaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ExchangeExecuted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoyaltyPayout"): EventFragment;
}
export declare type CallCanceledEvent = TypedEvent<[
    string,
    BigNumber,
    CallStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    call: CallStructOutput;
}>;
export declare type CallCanceledEventFilter = TypedEventFilter<CallCanceledEvent>;
export declare type CallCreatedEvent = TypedEvent<[
    string,
    BigNumber,
    CallStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    call: CallStructOutput;
}>;
export declare type CallCreatedEventFilter = TypedEventFilter<CallCreatedEvent>;
export declare type CallExercisedEvent = TypedEvent<[
    string,
    BigNumber,
    CallStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    call: CallStructOutput;
}>;
export declare type CallExercisedEventFilter = TypedEventFilter<CallExercisedEvent>;
export declare type CallPurchasedEvent = TypedEvent<[
    string,
    BigNumber,
    CallStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    call: CallStructOutput;
}>;
export declare type CallPurchasedEventFilter = TypedEventFilter<CallPurchasedEvent>;
export declare type CallReclaimedEvent = TypedEvent<[
    string,
    BigNumber,
    CallStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    call: CallStructOutput;
}>;
export declare type CallReclaimedEventFilter = TypedEventFilter<CallReclaimedEvent>;
export declare type ExchangeExecutedEvent = TypedEvent<[
    string,
    string,
    ExchangeDetailsStructOutput,
    ExchangeDetailsStructOutput
], {
    userA: string;
    userB: string;
    a: ExchangeDetailsStructOutput;
    b: ExchangeDetailsStructOutput;
}>;
export declare type ExchangeExecutedEventFilter = TypedEventFilter<ExchangeExecutedEvent>;
export declare type RoyaltyPayoutEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber
], {
    tokenContract: string;
    tokenId: BigNumber;
    recipient: string;
    amount: BigNumber;
}>;
export declare type RoyaltyPayoutEventFilter = TypedEventFilter<RoyaltyPayoutEvent>;
export interface CoveredCallsV1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CoveredCallsV1Interface;
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
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        buyCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        callForNFT(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            seller: string;
            buyer: string;
            currency: string;
            premium: BigNumber;
            strike: BigNumber;
            expiration: BigNumber;
        }>;
        cancelCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        createCall(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikePrice: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<[string]>;
        exerciseCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        reclaimCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        registrar(overrides?: CallOverrides): Promise<[string]>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    buyCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callForNFT(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        seller: string;
        buyer: string;
        currency: string;
        premium: BigNumber;
        strike: BigNumber;
        expiration: BigNumber;
    }>;
    cancelCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    createCall(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikePrice: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
    exerciseCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    reclaimCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    registrar(overrides?: CallOverrides): Promise<string>;
    setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: CallOverrides): Promise<BigNumber>;
        buyCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        callForNFT(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            seller: string;
            buyer: string;
            currency: string;
            premium: BigNumber;
            strike: BigNumber;
            expiration: BigNumber;
        }>;
        cancelCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        createCall(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikePrice: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: CallOverrides): Promise<void>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
        exerciseCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        name(overrides?: CallOverrides): Promise<string>;
        reclaimCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        registrar(overrides?: CallOverrides): Promise<string>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "CallCanceled(address,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallCanceledEventFilter;
        CallCanceled(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallCanceledEventFilter;
        "CallCreated(address,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallCreatedEventFilter;
        CallCreated(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallCreatedEventFilter;
        "CallExercised(address,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallExercisedEventFilter;
        CallExercised(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallExercisedEventFilter;
        "CallPurchased(address,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallPurchasedEventFilter;
        CallPurchased(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallPurchasedEventFilter;
        "CallReclaimed(address,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallReclaimedEventFilter;
        CallReclaimed(tokenContract?: string | null, tokenId?: BigNumberish | null, call?: null): CallReclaimedEventFilter;
        "ExchangeExecuted(address,address,tuple,tuple)"(userA?: string | null, userB?: string | null, a?: null, b?: null): ExchangeExecutedEventFilter;
        ExchangeExecuted(userA?: string | null, userB?: string | null, a?: null, b?: null): ExchangeExecutedEventFilter;
        "RoyaltyPayout(address,uint256,address,uint256)"(tokenContract?: string | null, tokenId?: BigNumberish | null, recipient?: string | null, amount?: null): RoyaltyPayoutEventFilter;
        RoyaltyPayout(tokenContract?: string | null, tokenId?: BigNumberish | null, recipient?: string | null, amount?: null): RoyaltyPayoutEventFilter;
    };
    estimateGas: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        buyCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        callForNFT(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        cancelCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        createCall(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikePrice: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
        exerciseCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        reclaimCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        registrar(overrides?: CallOverrides): Promise<BigNumber>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        buyCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        callForNFT(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        createCall(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikePrice: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exerciseCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reclaimCall(_tokenContract: string, _tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
