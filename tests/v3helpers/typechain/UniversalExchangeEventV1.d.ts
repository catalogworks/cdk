import {ethers, Signer, BigNumber, BigNumberish, BaseContract} from 'ethers';
import {Listener, Provider} from '@ethersproject/providers';
import {EventFragment} from '@ethersproject/abi';
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
export interface UniversalExchangeEventV1Interface
  extends ethers.utils.Interface {
  functions: {};
  events: {
    'ExchangeExecuted(address,address,tuple,tuple)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'ExchangeExecuted'): EventFragment;
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
export interface UniversalExchangeEventV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: UniversalExchangeEventV1Interface;
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
  functions: {};
  callStatic: {};
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
  };
  estimateGas: {};
  populateTransaction: {};
}
