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
export interface IZoraMediaInterface extends ethers.utils.Interface {
  functions: {
    'marketContract()': FunctionFragment;
    'ownerOf(uint256)': FunctionFragment;
    'previousTokenOwners(uint256)': FunctionFragment;
    'tokenCreators(uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'marketContract',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'ownerOf',
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'previousTokenOwners',
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'tokenCreators',
    values: [BigNumberish]
  ): string;
  decodeFunctionResult(
    functionFragment: 'marketContract',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'ownerOf', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'previousTokenOwners',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'tokenCreators',
    data: BytesLike
  ): Result;
  events: {};
}
export interface IZoraMedia extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IZoraMediaInterface;
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
    marketContract(overrides?: CallOverrides): Promise<[string]>;
    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string] & {
        owner: string;
      }
    >;
    previousTokenOwners(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
    tokenCreators(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };
  marketContract(overrides?: CallOverrides): Promise<string>;
  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
  previousTokenOwners(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;
  tokenCreators(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;
  callStatic: {
    marketContract(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    previousTokenOwners(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
    tokenCreators(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };
  filters: {};
  estimateGas: {
    marketContract(overrides?: CallOverrides): Promise<BigNumber>;
    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    previousTokenOwners(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    tokenCreators(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    marketContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    previousTokenOwners(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    tokenCreators(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
