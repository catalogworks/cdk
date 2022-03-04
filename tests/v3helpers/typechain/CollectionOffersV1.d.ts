import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type OfferStruct = {
    seller: string;
    amount: BigNumberish;
    id: BigNumberish;
    prevId: BigNumberish;
    nextId: BigNumberish;
};
export declare type OfferStructOutput = [
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
export interface CollectionOffersV1Interface extends ethers.utils.Interface {
    functions: {
        "_handleRoyaltyEnginePayout(address,uint256,uint256,address)": FunctionFragment;
        "cancelCollectionOffer(address,uint256)": FunctionFragment;
        "ceilingOfferAmount(address)": FunctionFragment;
        "ceilingOfferId(address)": FunctionFragment;
        "createCollectionOffer(address)": FunctionFragment;
        "erc20TransferHelper()": FunctionFragment;
        "erc721TransferHelper()": FunctionFragment;
        "fillCollectionOffer(address,uint256,uint256,address)": FunctionFragment;
        "findersFeeOverrides(address,uint256)": FunctionFragment;
        "floorOfferAmount(address)": FunctionFragment;
        "floorOfferId(address)": FunctionFragment;
        "name()": FunctionFragment;
        "offerCount()": FunctionFragment;
        "offers(address,uint256)": FunctionFragment;
        "registrar()": FunctionFragment;
        "setCollectionOfferAmount(address,uint256,uint256)": FunctionFragment;
        "setCollectionOfferFindersFee(address,uint256,uint16)": FunctionFragment;
        "setRoyaltyEngineAddress(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "_handleRoyaltyEnginePayout", values: [string, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "cancelCollectionOffer", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "ceilingOfferAmount", values: [string]): string;
    encodeFunctionData(functionFragment: "ceilingOfferId", values: [string]): string;
    encodeFunctionData(functionFragment: "createCollectionOffer", values: [string]): string;
    encodeFunctionData(functionFragment: "erc20TransferHelper", values?: undefined): string;
    encodeFunctionData(functionFragment: "erc721TransferHelper", values?: undefined): string;
    encodeFunctionData(functionFragment: "fillCollectionOffer", values: [string, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "findersFeeOverrides", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "floorOfferAmount", values: [string]): string;
    encodeFunctionData(functionFragment: "floorOfferId", values: [string]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "offerCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "offers", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "registrar", values?: undefined): string;
    encodeFunctionData(functionFragment: "setCollectionOfferAmount", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setCollectionOfferFindersFee", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setRoyaltyEngineAddress", values: [string]): string;
    decodeFunctionResult(functionFragment: "_handleRoyaltyEnginePayout", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelCollectionOffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ceilingOfferAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ceilingOfferId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createCollectionOffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erc20TransferHelper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erc721TransferHelper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fillCollectionOffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "findersFeeOverrides", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "floorOfferAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "floorOfferId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "offerCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "offers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registrar", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setCollectionOfferAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setCollectionOfferFindersFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRoyaltyEngineAddress", data: BytesLike): Result;
    events: {
        "CollectionOfferCanceled(address,uint256,tuple)": EventFragment;
        "CollectionOfferCreated(address,uint256,tuple)": EventFragment;
        "CollectionOfferFilled(address,uint256,address,address,tuple)": EventFragment;
        "CollectionOfferFindersFeeUpdated(address,uint256,uint16,tuple)": EventFragment;
        "CollectionOfferPriceUpdated(address,uint256,tuple)": EventFragment;
        "ExchangeExecuted(address,address,tuple,tuple)": EventFragment;
        "RoyaltyPayout(address,uint256,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CollectionOfferCanceled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CollectionOfferCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CollectionOfferFilled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CollectionOfferFindersFeeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CollectionOfferPriceUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ExchangeExecuted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoyaltyPayout"): EventFragment;
}
export declare type CollectionOfferCanceledEvent = TypedEvent<[
    string,
    BigNumber,
    OfferStructOutput
], {
    collection: string;
    id: BigNumber;
    offer: OfferStructOutput;
}>;
export declare type CollectionOfferCanceledEventFilter = TypedEventFilter<CollectionOfferCanceledEvent>;
export declare type CollectionOfferCreatedEvent = TypedEvent<[
    string,
    BigNumber,
    OfferStructOutput
], {
    collection: string;
    id: BigNumber;
    offer: OfferStructOutput;
}>;
export declare type CollectionOfferCreatedEventFilter = TypedEventFilter<CollectionOfferCreatedEvent>;
export declare type CollectionOfferFilledEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    string,
    OfferStructOutput
], {
    collection: string;
    id: BigNumber;
    buyer: string;
    finder: string;
    offer: OfferStructOutput;
}>;
export declare type CollectionOfferFilledEventFilter = TypedEventFilter<CollectionOfferFilledEvent>;
export declare type CollectionOfferFindersFeeUpdatedEvent = TypedEvent<[
    string,
    BigNumber,
    number,
    OfferStructOutput
], {
    collection: string;
    id: BigNumber;
    findersFeeBps: number;
    offer: OfferStructOutput;
}>;
export declare type CollectionOfferFindersFeeUpdatedEventFilter = TypedEventFilter<CollectionOfferFindersFeeUpdatedEvent>;
export declare type CollectionOfferPriceUpdatedEvent = TypedEvent<[
    string,
    BigNumber,
    OfferStructOutput
], {
    collection: string;
    id: BigNumber;
    offer: OfferStructOutput;
}>;
export declare type CollectionOfferPriceUpdatedEventFilter = TypedEventFilter<CollectionOfferPriceUpdatedEvent>;
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
export interface CollectionOffersV1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CollectionOffersV1Interface;
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
        cancelCollectionOffer(_tokenContract: string, _offerId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        createCollectionOffer(_tokenContract: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<[string]>;
        fillCollectionOffer(_tokenContract: string, _tokenId: BigNumberish, _minAmount: BigNumberish, _finder: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[number]>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        name(overrides?: CallOverrides): Promise<[string]>;
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
        registrar(overrides?: CallOverrides): Promise<[string]>;
        setCollectionOfferAmount(_tokenContract: string, _offerId: BigNumberish, _newAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setCollectionOfferFindersFee(_tokenContract: string, _offerId: BigNumberish, _findersFeeBps: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    cancelCollectionOffer(_tokenContract: string, _offerId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    createCollectionOffer(_tokenContract: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
    fillCollectionOffer(_tokenContract: string, _tokenId: BigNumberish, _minAmount: BigNumberish, _finder: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<number>;
    floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    floorOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<string>;
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
    registrar(overrides?: CallOverrides): Promise<string>;
    setCollectionOfferAmount(_tokenContract: string, _offerId: BigNumberish, _newAmount: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setCollectionOfferFindersFee(_tokenContract: string, _offerId: BigNumberish, _findersFeeBps: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: CallOverrides): Promise<BigNumber>;
        cancelCollectionOffer(_tokenContract: string, _offerId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        createCollectionOffer(_tokenContract: string, overrides?: CallOverrides): Promise<BigNumber>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
        fillCollectionOffer(_tokenContract: string, _tokenId: BigNumberish, _minAmount: BigNumberish, _finder: string, overrides?: CallOverrides): Promise<void>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<number>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<string>;
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
        registrar(overrides?: CallOverrides): Promise<string>;
        setCollectionOfferAmount(_tokenContract: string, _offerId: BigNumberish, _newAmount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setCollectionOfferFindersFee(_tokenContract: string, _offerId: BigNumberish, _findersFeeBps: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "CollectionOfferCanceled(address,uint256,tuple)"(collection?: string | null, id?: BigNumberish | null, offer?: null): CollectionOfferCanceledEventFilter;
        CollectionOfferCanceled(collection?: string | null, id?: BigNumberish | null, offer?: null): CollectionOfferCanceledEventFilter;
        "CollectionOfferCreated(address,uint256,tuple)"(collection?: string | null, id?: BigNumberish | null, offer?: null): CollectionOfferCreatedEventFilter;
        CollectionOfferCreated(collection?: string | null, id?: BigNumberish | null, offer?: null): CollectionOfferCreatedEventFilter;
        "CollectionOfferFilled(address,uint256,address,address,tuple)"(collection?: string | null, id?: BigNumberish | null, buyer?: null, finder?: null, offer?: null): CollectionOfferFilledEventFilter;
        CollectionOfferFilled(collection?: string | null, id?: BigNumberish | null, buyer?: null, finder?: null, offer?: null): CollectionOfferFilledEventFilter;
        "CollectionOfferFindersFeeUpdated(address,uint256,uint16,tuple)"(collection?: string | null, id?: BigNumberish | null, findersFeeBps?: BigNumberish | null, offer?: null): CollectionOfferFindersFeeUpdatedEventFilter;
        CollectionOfferFindersFeeUpdated(collection?: string | null, id?: BigNumberish | null, findersFeeBps?: BigNumberish | null, offer?: null): CollectionOfferFindersFeeUpdatedEventFilter;
        "CollectionOfferPriceUpdated(address,uint256,tuple)"(collection?: string | null, id?: BigNumberish | null, offer?: null): CollectionOfferPriceUpdatedEventFilter;
        CollectionOfferPriceUpdated(collection?: string | null, id?: BigNumberish | null, offer?: null): CollectionOfferPriceUpdatedEventFilter;
        "ExchangeExecuted(address,address,tuple,tuple)"(userA?: string | null, userB?: string | null, a?: null, b?: null): ExchangeExecutedEventFilter;
        ExchangeExecuted(userA?: string | null, userB?: string | null, a?: null, b?: null): ExchangeExecutedEventFilter;
        "RoyaltyPayout(address,uint256,address,uint256)"(tokenContract?: string | null, tokenId?: BigNumberish | null, recipient?: string | null, amount?: null): RoyaltyPayoutEventFilter;
        RoyaltyPayout(tokenContract?: string | null, tokenId?: BigNumberish | null, recipient?: string | null, amount?: null): RoyaltyPayoutEventFilter;
    };
    estimateGas: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        cancelCollectionOffer(_tokenContract: string, _offerId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        createCollectionOffer(_tokenContract: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
        fillCollectionOffer(_tokenContract: string, _tokenId: BigNumberish, _minAmount: BigNumberish, _finder: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        offerCount(overrides?: CallOverrides): Promise<BigNumber>;
        offers(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        registrar(overrides?: CallOverrides): Promise<BigNumber>;
        setCollectionOfferAmount(_tokenContract: string, _offerId: BigNumberish, _newAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setCollectionOfferFindersFee(_tokenContract: string, _offerId: BigNumberish, _findersFeeBps: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        _handleRoyaltyEnginePayout(_tokenContract: string, _tokenId: BigNumberish, _amount: BigNumberish, _payoutCurrency: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        cancelCollectionOffer(_tokenContract: string, _offerId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        ceilingOfferAmount(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ceilingOfferId(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createCollectionOffer(_tokenContract: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        erc20TransferHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        erc721TransferHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        fillCollectionOffer(_tokenContract: string, _tokenId: BigNumberish, _minAmount: BigNumberish, _finder: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        findersFeeOverrides(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        floorOfferAmount(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        floorOfferId(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        offerCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        offers(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setCollectionOfferAmount(_tokenContract: string, _offerId: BigNumberish, _newAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setCollectionOfferFindersFee(_tokenContract: string, _offerId: BigNumberish, _findersFeeBps: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setRoyaltyEngineAddress(_royaltyEngine: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
