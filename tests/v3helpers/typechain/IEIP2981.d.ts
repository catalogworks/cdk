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
export interface IEIP2981Interface extends ethers.utils.Interface {
  functions: {
    'royaltyInfo(uint256,uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'royaltyInfo',
    values: [BigNumberish, BigNumberish]
  ): string;
  decodeFunctionResult(
    functionFragment: 'royaltyInfo',
    data: BytesLike
  ): Result;
  events: {};
}
export interface IEIP2981 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IEIP2981Interface;
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
    royaltyInfo(
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;
  };
  royaltyInfo(
    tokenId: BigNumberish,
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber]>;
  callStatic: {
    royaltyInfo(
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;
  };
  filters: {};
  estimateGas: {
    royaltyInfo(
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    royaltyInfo(
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
