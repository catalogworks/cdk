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
export interface SimpleModuleInterface extends ethers.utils.Interface {
  functions: {
    'ok()': FunctionFragment;
  };
  encodeFunctionData(functionFragment: 'ok', values?: undefined): string;
  decodeFunctionResult(functionFragment: 'ok', data: BytesLike): Result;
  events: {};
}
export interface SimpleModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: SimpleModuleInterface;
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
    ok(overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  ok(overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    ok(overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    ok(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    ok(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
