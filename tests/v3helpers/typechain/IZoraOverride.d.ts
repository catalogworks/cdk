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
export interface IZoraOverrideInterface extends ethers.utils.Interface {
  functions: {
    'convertBidShares(address,uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'convertBidShares',
    values: [string, BigNumberish]
  ): string;
  decodeFunctionResult(
    functionFragment: 'convertBidShares',
    data: BytesLike
  ): Result;
  events: {};
}
export interface IZoraOverride extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IZoraOverrideInterface;
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
    convertBidShares(
      media: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;
  };
  convertBidShares(
    media: string,
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[]]>;
  callStatic: {
    convertBidShares(
      media: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;
  };
  filters: {};
  estimateGas: {
    convertBidShares(
      media: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    convertBidShares(
      media: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
