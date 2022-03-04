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
export interface FeePayoutSupportV1Interface extends ethers.utils.Interface {
  functions: {
    '_handleRoyaltyEnginePayout(address,uint256,uint256,address)': FunctionFragment;
    'registrar()': FunctionFragment;
    'setRoyaltyEngineAddress(address)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: '_handleRoyaltyEnginePayout',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: 'registrar', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setRoyaltyEngineAddress',
    values: [string]
  ): string;
  decodeFunctionResult(
    functionFragment: '_handleRoyaltyEnginePayout',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'registrar', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setRoyaltyEngineAddress',
    data: BytesLike
  ): Result;
  events: {
    'RoyaltyPayout(address,uint256,address,uint256)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'RoyaltyPayout'): EventFragment;
}
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
export interface FeePayoutSupportV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: FeePayoutSupportV1Interface;
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
    registrar(overrides?: CallOverrides): Promise<[string]>;
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
  registrar(overrides?: CallOverrides): Promise<string>;
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
    registrar(overrides?: CallOverrides): Promise<string>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };
  filters: {
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
    registrar(overrides?: CallOverrides): Promise<BigNumber>;
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
    registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
