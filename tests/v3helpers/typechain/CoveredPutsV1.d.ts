import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
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
export declare type PutStruct = {
    seller: string;
    buyer: string;
    currency: string;
    premium: BigNumberish;
    strike: BigNumberish;
    expiration: BigNumberish;
};
export declare type PutStructOutput = [
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
export interface CoveredPutsV1Interface extends ethers.utils.Interface {
    functions: {
        "_handleRoyaltyEnginePayout(address,uint256,uint256,address)": FunctionFragment;
        "buyPut(address,uint256,uint256)": FunctionFragment;
        "cancelPut(address,uint256,uint256)": FunctionFragment;
        "createPut(address,uint256,uint256,uint256,uint256,address)": FunctionFragment;
        "erc20TransferHelper()": FunctionFragment;
        "erc721TransferHelper()": FunctionFragment;
        "exercisePut(address,uint256,uint256)": FunctionFragment;
        "name()": FunctionFragment;
        "putCount()": FunctionFragment;
        "puts(address,uint256,uint256)": FunctionFragment;
        "putsForNFT(address,uint256,uint256)": FunctionFragment;
        "reclaimPut(address,uint256,uint256)": FunctionFragment;
        "registrar()": FunctionFragment;
        "setRoyaltyEngineAddress(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "_handleRoyaltyEnginePayout", values: [string, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "buyPut", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "cancelPut", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "createPut", values: [
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        string
    ]): string;
    encodeFunctionData(functionFragment: "erc20TransferHelper", values?: undefined): string;
    encodeFunctionData(functionFragment: "erc721TransferHelper", values?: undefined): string;
    encodeFunctionData(functionFragment: "exercisePut", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "putCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "puts", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "putsForNFT", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "reclaimPut", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "registrar", values?: undefined): string;
    encodeFunctionData(functionFragment: "setRoyaltyEngineAddress", values: [string]): string;
    decodeFunctionResult(functionFragment: "_handleRoyaltyEnginePayout", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyPut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelPut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createPut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erc20TransferHelper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erc721TransferHelper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exercisePut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "puts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putsForNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reclaimPut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registrar", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRoyaltyEngineAddress", data: BytesLike): Result;
    events: {
        "ExchangeExecuted(address,address,tuple,tuple)": EventFragment;
        "PutCanceled(address,uint256,uint256,tuple)": EventFragment;
        "PutCreated(address,uint256,uint256,tuple)": EventFragment;
        "PutExercised(address,uint256,uint256,tuple)": EventFragment;
        "PutPurchased(address,uint256,uint256,tuple)": EventFragment;
        "PutReclaimed(address,uint256,uint256,tuple)": EventFragment;
        "RoyaltyPayout(address,uint256,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ExchangeExecuted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PutCanceled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PutCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PutExercised"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PutPurchased"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PutReclaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoyaltyPayout"): EventFragment;
}
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
export declare type PutCanceledEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    PutStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    putId: BigNumber;
    put: PutStructOutput;
}>;
export declare type PutCanceledEventFilter = TypedEventFilter<PutCanceledEvent>;
export declare type PutCreatedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    PutStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    putId: BigNumber;
    put: PutStructOutput;
}>;
export declare type PutCreatedEventFilter = TypedEventFilter<PutCreatedEvent>;
export declare type PutExercisedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    PutStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    putId: BigNumber;
    put: PutStructOutput;
}>;
export declare type PutExercisedEventFilter = TypedEventFilter<PutExercisedEvent>;
export declare type PutPurchasedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    PutStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    putId: BigNumber;
    put: PutStructOutput;
}>;
export declare type PutPurchasedEventFilter = TypedEventFilter<PutPurchasedEvent>;
export declare type PutReclaimedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    PutStructOutput
], {
    tokenContract: string;
    tokenId: BigNumber;
    putId: BigNumber;
    put: PutStructOutput;
}>;
export declare type PutReclaimedEventFilter = TypedEventFilter<PutReclaimedEvent>;
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
export interface CoveredPutsV1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CoveredPutsV1Interface;
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
        buyPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        cancelPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        createPut(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikeOffer: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<[string]>;
        exercisePut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        putCount(overrides?: CallOverrides): Promise<[BigNumber]>;
        puts(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<[
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
        putsForNFT(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        reclaimPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
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
    buyPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    cancelPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    createPut(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikeOffer: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
    exercisePut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    putCount(overrides?: CallOverrides): Promise<BigNumber>;
    puts(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<[
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
    putsForNFT(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    reclaimPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    registrar(overrides?: CallOverrides): Promise<string>;
    setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: CallOverrides): Promise<BigNumber>;
        buyPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        cancelPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        createPut(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikeOffer: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: CallOverrides): Promise<BigNumber>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
        exercisePut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        name(overrides?: CallOverrides): Promise<string>;
        putCount(overrides?: CallOverrides): Promise<BigNumber>;
        puts(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<[
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
        putsForNFT(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        reclaimPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        registrar(overrides?: CallOverrides): Promise<string>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "ExchangeExecuted(address,address,tuple,tuple)"(userA?: string | null, userB?: string | null, a?: null, b?: null): ExchangeExecutedEventFilter;
        ExchangeExecuted(userA?: string | null, userB?: string | null, a?: null, b?: null): ExchangeExecutedEventFilter;
        "PutCanceled(address,uint256,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutCanceledEventFilter;
        PutCanceled(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutCanceledEventFilter;
        "PutCreated(address,uint256,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutCreatedEventFilter;
        PutCreated(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutCreatedEventFilter;
        "PutExercised(address,uint256,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutExercisedEventFilter;
        PutExercised(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutExercisedEventFilter;
        "PutPurchased(address,uint256,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutPurchasedEventFilter;
        PutPurchased(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutPurchasedEventFilter;
        "PutReclaimed(address,uint256,uint256,tuple)"(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutReclaimedEventFilter;
        PutReclaimed(tokenContract?: string | null, tokenId?: BigNumberish | null, putId?: BigNumberish | null, put?: null): PutReclaimedEventFilter;
        "RoyaltyPayout(address,uint256,address,uint256)"(tokenContract?: string | null, tokenId?: BigNumberish | null, recipient?: string | null, amount?: null): RoyaltyPayoutEventFilter;
        RoyaltyPayout(tokenContract?: string | null, tokenId?: BigNumberish | null, recipient?: string | null, amount?: null): RoyaltyPayoutEventFilter;
    };
    estimateGas: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        buyPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        cancelPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        createPut(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikeOffer: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
        exercisePut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        putCount(overrides?: CallOverrides): Promise<BigNumber>;
        puts(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        putsForNFT(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        reclaimPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
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
        buyPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        cancelPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        createPut(_tokenContract: string, _tokenId: BigNumberish, _premiumPrice: BigNumberish, _strikeOffer: BigNumberish, _expiration: BigNumberish, _currency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exercisePut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        puts(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putsForNFT(arg0: string, arg1: BigNumberish, arg2: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reclaimPut(_tokenContract: string, _tokenId: BigNumberish, _putId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
