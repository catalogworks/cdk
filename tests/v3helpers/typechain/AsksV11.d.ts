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
export declare type AskStruct = {
  seller: string;
  sellerFundsRecipient: string;
  askCurrency: string;
  findersFeeBps: BigNumberish;
  askPrice: BigNumberish;
};
export declare type AskStructOutput = [
  string,
  string,
  string,
  number,
  BigNumber
] & {
  seller: string;
  sellerFundsRecipient: string;
  askCurrency: string;
  findersFeeBps: number;
  askPrice: BigNumber;
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
export interface AsksV11Interface extends ethers.utils.Interface {
  functions: {
    '_handleRoyaltyEnginePayout(address,uint256,uint256,address)': FunctionFragment;
    'askForNFT(address,uint256)': FunctionFragment;
    'cancelAsk(address,uint256)': FunctionFragment;
    'createAsk(address,uint256,uint256,address,address,uint16)': FunctionFragment;
    'erc20TransferHelper()': FunctionFragment;
    'erc721TransferHelper()': FunctionFragment;
    'fillAsk(address,uint256,address,uint256,address)': FunctionFragment;
    'name()': FunctionFragment;
    'registrar()': FunctionFragment;
    'setAskPrice(address,uint256,uint256,address)': FunctionFragment;
    'setRoyaltyEngineAddress(address)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: '_handleRoyaltyEnginePayout',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'askForNFT',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'cancelAsk',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'createAsk',
    values: [string, BigNumberish, BigNumberish, string, string, BigNumberish]
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
    functionFragment: 'fillAsk',
    values: [string, BigNumberish, string, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'registrar', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setAskPrice',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'setRoyaltyEngineAddress',
    values: [string]
  ): string;
  decodeFunctionResult(
    functionFragment: '_handleRoyaltyEnginePayout',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'askForNFT', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cancelAsk', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createAsk', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'erc20TransferHelper',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'erc721TransferHelper',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'fillAsk', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registrar', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setAskPrice',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setRoyaltyEngineAddress',
    data: BytesLike
  ): Result;
  events: {
    'AskCanceled(address,uint256,tuple)': EventFragment;
    'AskCreated(address,uint256,tuple)': EventFragment;
    'AskFilled(address,uint256,address,address,tuple)': EventFragment;
    'AskPriceUpdated(address,uint256,tuple)': EventFragment;
    'ExchangeExecuted(address,address,tuple,tuple)': EventFragment;
    'RoyaltyPayout(address,uint256,address,uint256)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'AskCanceled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AskCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AskFilled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AskPriceUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ExchangeExecuted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RoyaltyPayout'): EventFragment;
}
export declare type AskCanceledEvent = TypedEvent<
  [string, BigNumber, AskStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    ask: AskStructOutput;
  }
>;
export declare type AskCanceledEventFilter = TypedEventFilter<AskCanceledEvent>;
export declare type AskCreatedEvent = TypedEvent<
  [string, BigNumber, AskStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    ask: AskStructOutput;
  }
>;
export declare type AskCreatedEventFilter = TypedEventFilter<AskCreatedEvent>;
export declare type AskFilledEvent = TypedEvent<
  [string, BigNumber, string, string, AskStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    buyer: string;
    finder: string;
    ask: AskStructOutput;
  }
>;
export declare type AskFilledEventFilter = TypedEventFilter<AskFilledEvent>;
export declare type AskPriceUpdatedEvent = TypedEvent<
  [string, BigNumber, AskStructOutput],
  {
    tokenContract: string;
    tokenId: BigNumber;
    ask: AskStructOutput;
  }
>;
export declare type AskPriceUpdatedEventFilter =
  TypedEventFilter<AskPriceUpdatedEvent>;
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
export interface AsksV11 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: AsksV11Interface;
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
    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, BigNumber] & {
        seller: string;
        sellerFundsRecipient: string;
        askCurrency: string;
        findersFeeBps: number;
        askPrice: BigNumber;
      }
    >;
    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<[string]>;
    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
    registrar(overrides?: CallOverrides): Promise<[string]>;
    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
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
  askForNFT(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, number, BigNumber] & {
      seller: string;
      sellerFundsRecipient: string;
      askCurrency: string;
      findersFeeBps: number;
      askPrice: BigNumber;
    }
  >;
  cancelAsk(
    _tokenContract: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  createAsk(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _askPrice: BigNumberish,
    _askCurrency: string,
    _sellerFundsRecipient: string,
    _findersFeeBps: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
  erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
  fillAsk(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _fillCurrency: string,
    _fillAmount: BigNumberish,
    _finder: string,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
  registrar(overrides?: CallOverrides): Promise<string>;
  setAskPrice(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _askPrice: BigNumberish,
    _askCurrency: string,
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
  callStatic: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, BigNumber] & {
        seller: string;
        sellerFundsRecipient: string;
        askCurrency: string;
        findersFeeBps: number;
        askPrice: BigNumber;
      }
    >;
    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<string>;
    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: CallOverrides
    ): Promise<void>;
    name(overrides?: CallOverrides): Promise<string>;
    registrar(overrides?: CallOverrides): Promise<string>;
    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      overrides?: CallOverrides
    ): Promise<void>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };
  filters: {
    'AskCanceled(address,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCanceledEventFilter;
    AskCanceled(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCanceledEventFilter;
    'AskCreated(address,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCreatedEventFilter;
    AskCreated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCreatedEventFilter;
    'AskFilled(address,uint256,address,address,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      buyer?: string | null,
      finder?: null,
      ask?: null
    ): AskFilledEventFilter;
    AskFilled(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      buyer?: string | null,
      finder?: null,
      ask?: null
    ): AskFilledEventFilter;
    'AskPriceUpdated(address,uint256,tuple)'(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskPriceUpdatedEventFilter;
    AskPriceUpdated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskPriceUpdatedEventFilter;
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
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
    erc721TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;
    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    registrar(overrides?: CallOverrides): Promise<BigNumber>;
    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
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
    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    erc20TransferHelper(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    erc721TransferHelper(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
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
  };
}
