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
export declare type PartStruct = {
  account: string;
  value: BigNumberish;
}[];
export declare type PartStructOutput = ([string, BigNumber] & {
  account: string;
  value: BigNumber;
})[];
export interface IRaribleV2Interface extends ethers.utils.Interface {
  functions: {
    'getRaribleV2Royalties(uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'getRaribleV2Royalties',
    values: [BigNumberish]
  ): string;
  decodeFunctionResult(
    functionFragment: 'getRaribleV2Royalties',
    data: BytesLike
  ): Result;
  events: {};
}
export interface IRaribleV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IRaribleV2Interface;
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
    getRaribleV2Royalties(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PartStructOutput[]]>;
  };
  getRaribleV2Royalties(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PartStructOutput[]>;
  callStatic: {
    getRaribleV2Royalties(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PartStructOutput[]>;
  };
  filters: {};
  estimateGas: {
    getRaribleV2Royalties(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getRaribleV2Royalties(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
