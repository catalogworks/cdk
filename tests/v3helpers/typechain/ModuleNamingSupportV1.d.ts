import {
  ethers,
  Signer,
  BigNumber,
  PopulatedTransaction,
  BaseContract,
  CallOverrides,
} from 'ethers';
import {BytesLike} from '@ethersproject/bytes';
import {Listener, Provider} from '@ethersproject/providers';
import {FunctionFragment, Result} from '@ethersproject/abi';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from './common';
export interface ModuleNamingSupportV1Interface extends ethers.utils.Interface {
  functions: {
    'name()': FunctionFragment;
  };
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  events: {};
}
export interface ModuleNamingSupportV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ModuleNamingSupportV1Interface;
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
    name(overrides?: CallOverrides): Promise<[string]>;
  };
  name(overrides?: CallOverrides): Promise<string>;
  callStatic: {
    name(overrides?: CallOverrides): Promise<string>;
  };
  filters: {};
  estimateGas: {
    name(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
