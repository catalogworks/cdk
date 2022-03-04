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
export declare type AuctionStruct = {
  seller: string;
  auctionCurrency: string;
  sellerFundsRecipient: string;
  bidder: string;
  finder: string;
  findersFeeBps: BigNumberish;
  amount: BigNumberish;
  duration: BigNumberish;
  startTime: BigNumberish;
  firstBidTime: BigNumberish;
  reservePrice: BigNumberish;
};
export declare type AuctionStructOutput = [
  string,
  string,
  string,
  string,
  string,
  number,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  seller: string;
  auctionCurrency: string;
  sellerFundsRecipient: string;
  bidder: string;
  finder: string;
  findersFeeBps: number;
  amount: BigNumber;
  duration: BigNumber;
  startTime: BigNumber;
  firstBidTime: BigNumber;
  reservePrice: BigNumber;
};
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
export interface ReserveAuctionV1Interface extends ethers.utils.Interface {
  functions: {
    'ZoraV1Market()': FunctionFragment;
    'ZoraV1Media()': FunctionFragment;
    '_handleRoyaltyEnginePayout(address,uint256,uint256,address)': FunctionFragment;
    'auctionForNFT(address,uint256)': FunctionFragment;
    'cancelAuction(address,uint256)': FunctionFragment;
    'createAuction(address,uint256,uint256,uint256,address,uint16,address,uint256)': FunctionFragment;
    'createBid(address,uint256,uint256,address)': FunctionFragment;
    'erc20TransferHelper()': FunctionFragment;
    'erc721TransferHelper()': FunctionFragment;
    'name()': FunctionFragment;
    'registrar()': FunctionFragment;
    'setAuctionReservePrice(address,uint256,uint256)': FunctionFragment;
    'setRoyaltyEngineAddress(address)': FunctionFragment;
    'settleAuction(address,uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'ZoraV1Market',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'ZoraV1Media',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: '_handleRoyaltyEnginePayout',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'auctionForNFT',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'cancelAuction',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'createAuction',
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'createBid',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'erc20TransferHelper',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'erc721TransferHelper',
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'registrar', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setAuctionReservePrice',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setRoyaltyEngineAddress',
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: 'settleAuction',
    values: [string, BigNumberish]
  ): string;
  decodeFunctionResult(
    functionFragment: 'ZoraV1Market',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'ZoraV1Media',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: '_handleRoyaltyEnginePayout',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'auctionForNFT',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'cancelAuction',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'createAuction',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'createBid', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'erc20TransferHelper',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'erc721TransferHelper',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registrar', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setAuctionReservePrice',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setRoyaltyEngineAddress',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'settleAuction',
    data: BytesLike
  ): Result;
  events: {
    'AuctionBid(address,uint256,uint256,address,bool,bool,tuple)': EventFragment;
    'AuctionCanceled(address,uint256,tuple)': EventFragment;
    'AuctionCreated(address,uint256,tuple)': EventFragment;
    'AuctionDurationExtended(address,uint256,uint256,tuple)': EventFragment;
    'AuctionEnded(address,uint256,address,address,tuple)': EventFragment;
    'AuctionReservePriceUpdated(address,uint256,uint256,tuple)': EventFragment;
    'ExchangeExecuted(address,address,tuple,tuple)': EventFragment;
    'RoyaltyPayout(address,uint256,address,uint256)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'AuctionBid'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionCanceled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionDurationExtended'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionEnded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionReservePriceUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ExchangeExecuted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RoyaltyPayout'): EventFragment;
}
export declare type AuctionBidEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, boolean, boolean, AuctionStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    amount: BigNumber;
    bidder: string;
    firstBid: boolean;
    extended: boolean;
    auction: AuctionStructOutput;
  }
>;
export declare type AuctionBidEventFilter = TypedEventFilter<AuctionBidEvent>;
export declare type AuctionCanceledEvent = TypedEvent<
  [string, BigNumber, AuctionStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    auction: AuctionStructOutput;
  }
>;
export declare type AuctionCanceledEventFilter =
  TypedEventFilter<AuctionCanceledEvent>;
export declare type AuctionCreatedEvent = TypedEvent<
  [string, BigNumber, AuctionStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    auction: AuctionStructOutput;
  }
>;
export declare type AuctionCreatedEventFilter =
  TypedEventFilter<AuctionCreatedEvent>;
export declare type AuctionDurationExtendedEvent = TypedEvent<
  [string, BigNumber, BigNumber, AuctionStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    duration: BigNumber;
    auction: AuctionStructOutput;
  }
>;
export declare type AuctionDurationExtendedEventFilter =
  TypedEventFilter<AuctionDurationExtendedEvent>;
export declare type AuctionEndedEvent = TypedEvent<
  [string, BigNumber, string, string, AuctionStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    winner: string;
    finder: string;
    auction: AuctionStructOutput;
  }
>;
export declare type AuctionEndedEventFilter =
  TypedEventFilter<AuctionEndedEvent>;
export declare type AuctionReservePriceUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber, AuctionStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    reservePrice: BigNumber;
    auction: AuctionStructOutput;
  }
>;
export declare type AuctionReservePriceUpdatedEventFilter =
  TypedEventFilter<AuctionReservePriceUpdatedEvent>;
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
export interface ReserveAuctionV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ReserveAuctionV1Interface;
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
    ZoraV1Market(overrides?: CallOverrides): Promise<[string]>;
    ZoraV1Media(overrides?: CallOverrides): Promise<[string]>;
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    auctionForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        string,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        seller: string;
        auctionCurrency: string;
        sellerFundsRecipient: string;
        bidder: string;
        finder: string;
        findersFeeBps: number;
        amount: BigNumber;
        duration: BigNumber;
        startTime: BigNumber;
        firstBidTime: BigNumber;
        reservePrice: BigNumber;
      }
    >;
    cancelAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    createAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _duration: BigNumberish,
      _reservePrice: BigNumberish,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      _auctionCurrency: string,
      _startTime: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    createBid(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<[string]>;
    name(overrides?: CallOverrides): Promise<[string]>;
    registrar(overrides?: CallOverrides): Promise<[string]>;
    setAuctionReservePrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    settleAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  ZoraV1Market(overrides?: CallOverrides): Promise<string>;
  ZoraV1Media(overrides?: CallOverrides): Promise<string>;
  _handleRoyaltyEnginePayout(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _payoutCurrency: string,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  auctionForNFT(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      string,
      string,
      string,
      number,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      seller: string;
      auctionCurrency: string;
      sellerFundsRecipient: string;
      bidder: string;
      finder: string;
      findersFeeBps: number;
      amount: BigNumber;
      duration: BigNumber;
      startTime: BigNumber;
      firstBidTime: BigNumber;
      reservePrice: BigNumber;
    }
  >;
  cancelAuction(
    _tokenContract: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  createAuction(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _duration: BigNumberish,
    _reservePrice: BigNumberish,
    _sellerFundsRecipient: string,
    _findersFeeBps: BigNumberish,
    _auctionCurrency: string,
    _startTime: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  createBid(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _finder: string,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
  erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
  name(overrides?: CallOverrides): Promise<string>;
  registrar(overrides?: CallOverrides): Promise<string>;
  setAuctionReservePrice(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _reservePrice: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  setRoyaltyEngineAddress(
    _royaltyEngine: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  settleAuction(
    _tokenContract: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    ZoraV1Market(overrides?: CallOverrides): Promise<string>;
    ZoraV1Media(overrides?: CallOverrides): Promise<string>;
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    auctionForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        string,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        seller: string;
        auctionCurrency: string;
        sellerFundsRecipient: string;
        bidder: string;
        finder: string;
        findersFeeBps: number;
        amount: BigNumber;
        duration: BigNumber;
        startTime: BigNumber;
        firstBidTime: BigNumber;
        reservePrice: BigNumber;
      }
    >;
    cancelAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    createAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _duration: BigNumberish,
      _reservePrice: BigNumberish,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      _auctionCurrency: string,
      _startTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    createBid(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _finder: string,
      overrides?: CallOverrides
    ): Promise<void>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
    name(overrides?: CallOverrides): Promise<string>;
    registrar(overrides?: CallOverrides): Promise<string>;
    setAuctionReservePrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: CallOverrides
    ): Promise<void>;
    settleAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };
  filters: {
    'AuctionBid(address,uint256,uint256,address,bool,bool,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      amount?: BigNumberish | null,
      bidder?: null,
      firstBid?: null,
      extended?: null,
      auction?: null
    ): AuctionBidEventFilter;
    AuctionBid(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      amount?: BigNumberish | null,
      bidder?: null,
      firstBid?: null,
      extended?: null,
      auction?: null
    ): AuctionBidEventFilter;
    'AuctionCanceled(address,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      auction?: null
    ): AuctionCanceledEventFilter;
    AuctionCanceled(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      auction?: null
    ): AuctionCanceledEventFilter;
    'AuctionCreated(address,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      auction?: null
    ): AuctionCreatedEventFilter;
    AuctionCreated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      auction?: null
    ): AuctionCreatedEventFilter;
    'AuctionDurationExtended(address,uint256,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      duration?: BigNumberish | null,
      auction?: null
    ): AuctionDurationExtendedEventFilter;
    AuctionDurationExtended(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      duration?: BigNumberish | null,
      auction?: null
    ): AuctionDurationExtendedEventFilter;
    'AuctionEnded(address,uint256,address,address,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      winner?: string | null,
      finder?: null,
      auction?: null
    ): AuctionEndedEventFilter;
    AuctionEnded(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      winner?: string | null,
      finder?: null,
      auction?: null
    ): AuctionEndedEventFilter;
    'AuctionReservePriceUpdated(address,uint256,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      reservePrice?: BigNumberish | null,
      auction?: null
    ): AuctionReservePriceUpdatedEventFilter;
    AuctionReservePriceUpdated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      reservePrice?: BigNumberish | null,
      auction?: null
    ): AuctionReservePriceUpdatedEventFilter;
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
    ZoraV1Market(overrides?: CallOverrides): Promise<BigNumber>;
    ZoraV1Media(overrides?: CallOverrides): Promise<BigNumber>;
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    auctionForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    cancelAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    createAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _duration: BigNumberish,
      _reservePrice: BigNumberish,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      _auctionCurrency: string,
      _startTime: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    createBid(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    registrar(overrides?: CallOverrides): Promise<BigNumber>;
    setAuctionReservePrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    settleAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    ZoraV1Market(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    ZoraV1Media(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    auctionForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    cancelAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    createAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _duration: BigNumberish,
      _reservePrice: BigNumberish,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      _auctionCurrency: string,
      _startTime: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    createBid(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _finder: string,
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
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setAuctionReservePrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    settleAuction(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
