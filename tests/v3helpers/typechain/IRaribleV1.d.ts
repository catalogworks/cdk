import {
  ethers,
  Signer,
  BigNumber,
  BigNumberish,
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
export interface IRaribleV1Interface extends ethers.utils.Interface {
  functions: {
    'getFeeBps(uint256)': FunctionFragment;
    'getFeeRecipients(uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'getFeeBps',
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getFeeRecipients',
    values: [BigNumberish]
  ): string;
  decodeFunctionResult(functionFragment: 'getFeeBps', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'getFeeRecipients',
    data: BytesLike
  ): Result;
  events: {};
}
export interface IRaribleV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IRaribleV1Interface;
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
    getFeeBps(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;
    getFeeRecipients(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;
  };
  getFeeBps(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
  getFeeRecipients(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;
  callStatic: {
    getFeeBps(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;
    getFeeRecipients(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;
  };
  filters: {};
  estimateGas: {
    getFeeBps(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getFeeRecipients(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getFeeBps(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    getFeeRecipients(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
