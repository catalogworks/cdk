import {
  ethers,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from 'ethers';
import {BytesLike} from '@ethersproject/bytes';
import {Listener, Provider} from '@ethersproject/providers';
import {FunctionFragment, EventFragment, Result} from '@ethersproject/abi';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from './common';
export declare type ExchangeDetailsStruct = {
  tokenContract: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
};
export declare type ExchangeDetailsStructOutput = [
  string,
  BigNumber,
  BigNumber
] & {
  tokenContract: string;
  tokenId: BigNumber;
  amount: BigNumber;
};
export declare type OfferStruct = {
  seller: string;
  currency: string;
  findersFeeBps: BigNumberish;
  amount: BigNumberish;
};
export declare type OfferStructOutput = [string, string, number, BigNumber] & {
  seller: string;
  currency: string;
  findersFeeBps: number;
  amount: BigNumber;
};
export interface OffersV1Interface extends ethers.utils.Interface {
  functions: {
    '_handleRoyaltyEnginePayout(address,uint256,uint256,address)': FunctionFragment;
    'cancelNFTOffer(address,uint256,uint256)': FunctionFragment;
    'createNFTOffer(address,uint256,uint256,address,uint16)': FunctionFragment;
    'erc20TransferHelper()': FunctionFragment;
    'erc721TransferHelper()': FunctionFragment;
    'fillNFTOffer(address,uint256,uint256,address)': FunctionFragment;
    'name()': FunctionFragment;
    'offerCount()': FunctionFragment;
    'offers(address,uint256,uint256)': FunctionFragment;
    'offersForNFT(address,uint256,uint256)': FunctionFragment;
    'registrar()': FunctionFragment;
    'setNFTOfferAmount(address,uint256,uint256,uint256)': FunctionFragment;
    'setRoyaltyEngineAddress(address)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: '_handleRoyaltyEnginePayout',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'cancelNFTOffer',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'createNFTOffer',
    values: [string, BigNumberish, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'erc20TransferHelper',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'erc721TransferHelper',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'fillNFTOffer',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'offerCount',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'offers',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'offersForNFT',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'registrar', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setNFTOfferAmount',
    values: [string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setRoyaltyEngineAddress',
    values: [string]
  ): string;
  decodeFunctionResult(
    functionFragment: '_handleRoyaltyEnginePayout',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'cancelNFTOffer',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'createNFTOffer',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'erc20TransferHelper',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'erc721TransferHelper',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'fillNFTOffer',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'offerCount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'offers', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'offersForNFT',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'registrar', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setNFTOfferAmount',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setRoyaltyEngineAddress',
    data: BytesLike
  ): Result;
  events: {
    'ExchangeExecuted(address,address,tuple,tuple)': EventFragment;
    'NFTOfferAmountUpdated(address,uint256,uint256,tuple)': EventFragment;
    'NFTOfferCanceled(address,uint256,uint256,tuple)': EventFragment;
    'NFTOfferCreated(address,uint256,uint256,tuple)': EventFragment;
    'NFTOfferFilled(address,uint256,uint256,address,address,tuple)': EventFragment;
    'RoyaltyPayout(address,uint256,address,uint256)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'ExchangeExecuted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'NFTOfferAmountUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'NFTOfferCanceled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'NFTOfferCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'NFTOfferFilled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RoyaltyPayout'): EventFragment;
}
export declare type ExchangeExecutedEvent = TypedEvent<
  [string, string, ExchangeDetailsStructOutput, ExchangeDetailsStructOutput],
  {
    userA: string;
    userB: string;
    a: ExchangeDetailsStructOutput;
    b: ExchangeDetailsStructOutput;
  }
>;
export declare type ExchangeExecutedEventFilter =
  TypedEventFilter<ExchangeExecutedEvent>;
export declare type NFTOfferAmountUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber, OfferStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    id: BigNumber;
    offer: OfferStructOutput;
  }
>;
export declare type NFTOfferAmountUpdatedEventFilter =
  TypedEventFilter<NFTOfferAmountUpdatedEvent>;
export declare type NFTOfferCanceledEvent = TypedEvent<
  [string, BigNumber, BigNumber, OfferStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    id: BigNumber;
    offer: OfferStructOutput;
  }
>;
export declare type NFTOfferCanceledEventFilter =
  TypedEventFilter<NFTOfferCanceledEvent>;
export declare type NFTOfferCreatedEvent = TypedEvent<
  [string, BigNumber, BigNumber, OfferStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    id: BigNumber;
    offer: OfferStructOutput;
  }
>;
export declare type NFTOfferCreatedEventFilter =
  TypedEventFilter<NFTOfferCreatedEvent>;
export declare type NFTOfferFilledEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, string, OfferStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    id: BigNumber;
    buyer: string;
    finder: string;
    offer: OfferStructOutput;
  }
>;
export declare type NFTOfferFilledEventFilter =
  TypedEventFilter<NFTOfferFilledEvent>;
export declare type RoyaltyPayoutEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  {
    tokenContract: string;
    tokenId: BigNumber;
    recipient: string;
    amount: BigNumber;
  }
>;
export declare type RoyaltyPayoutEventFilter =
  TypedEventFilter<RoyaltyPayoutEvent>;
export interface OffersV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: OffersV1Interface;
  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;
  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;
  functions: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    cancelNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    createNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _currency: string,
      _findersFeeBps: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<[string]>;
    fillNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _finder: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
    offerCount(overrides?: CallOverrides): Promise<[BigNumber]>;
    offers(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, number, BigNumber] & {
        seller: string;
        currency: string;
        findersFeeBps: number;
        amount: BigNumber;
      }
    >;
    offersForNFT(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
    registrar(overrides?: CallOverrides): Promise<[string]>;
    setNFTOfferAmount(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _amount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  _handleRoyaltyEnginePayout(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _payoutCurrency: string,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  cancelNFTOffer(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _offerId: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  createNFTOffer(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _currency: string,
    _findersFeeBps: BigNumberish,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
  erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
  fillNFTOffer(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _offerId: BigNumberish,
    _finder: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
  offerCount(overrides?: CallOverrides): Promise<BigNumber>;
  offers(
    arg0: string,
    arg1: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, number, BigNumber] & {
      seller: string;
      currency: string;
      findersFeeBps: number;
      amount: BigNumber;
    }
  >;
  offersForNFT(
    arg0: string,
    arg1: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;
  registrar(overrides?: CallOverrides): Promise<string>;
  setNFTOfferAmount(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _offerId: BigNumberish,
    _amount: BigNumberish,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  setRoyaltyEngineAddress(
    _royaltyEngine: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    cancelNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    createNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _currency: string,
      _findersFeeBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
    fillNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _finder: string,
      overrides?: CallOverrides
    ): Promise<void>;
    name(overrides?: CallOverrides): Promise<string>;
    offerCount(overrides?: CallOverrides): Promise<BigNumber>;
    offers(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, number, BigNumber] & {
        seller: string;
        currency: string;
        findersFeeBps: number;
        amount: BigNumber;
      }
    >;
    offersForNFT(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    registrar(overrides?: CallOverrides): Promise<string>;
    setNFTOfferAmount(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };
  filters: {
    'ExchangeExecuted(address,address,tuple,tuple)'(
      userA?: string | null,
      userB?: string | null,
      a?: null,
      b?: null
    ): ExchangeExecutedEventFilter;
    ExchangeExecuted(
      userA?: string | null,
      userB?: string | null,
      a?: null,
      b?: null
    ): ExchangeExecutedEventFilter;
    'NFTOfferAmountUpdated(address,uint256,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      offer?: null
    ): NFTOfferAmountUpdatedEventFilter;
    NFTOfferAmountUpdated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      offer?: null
    ): NFTOfferAmountUpdatedEventFilter;
    'NFTOfferCanceled(address,uint256,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      offer?: null
    ): NFTOfferCanceledEventFilter;
    NFTOfferCanceled(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      offer?: null
    ): NFTOfferCanceledEventFilter;
    'NFTOfferCreated(address,uint256,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      offer?: null
    ): NFTOfferCreatedEventFilter;
    NFTOfferCreated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      offer?: null
    ): NFTOfferCreatedEventFilter;
    'NFTOfferFilled(address,uint256,uint256,address,address,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      buyer?: null,
      finder?: null,
      offer?: null
    ): NFTOfferFilledEventFilter;
    NFTOfferFilled(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      id?: BigNumberish | null,
      buyer?: null,
      finder?: null,
      offer?: null
    ): NFTOfferFilledEventFilter;
    'RoyaltyPayout(address,uint256,address,uint256)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      recipient?: string | null,
      amount?: null
    ): RoyaltyPayoutEventFilter;
    RoyaltyPayout(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      recipient?: string | null,
      amount?: null
    ): RoyaltyPayoutEventFilter;
  };
  estimateGas: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    cancelNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    createNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _currency: string,
      _findersFeeBps: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
    fillNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _finder: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    offerCount(overrides?: CallOverrides): Promise<BigNumber>;
    offers(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    offersForNFT(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    registrar(overrides?: CallOverrides): Promise<BigNumber>;
    setNFTOfferAmount(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _amount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    cancelNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    createNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _currency: string,
      _findersFeeBps: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    erc20TransferHelper(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    erc721TransferHelper(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    fillNFTOffer(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _finder: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    offerCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    offers(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    offersForNFT(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setNFTOfferAmount(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _offerId: BigNumberish,
      _amount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
