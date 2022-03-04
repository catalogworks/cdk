import {
  ethers,
  Signer,
  BigNumber,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
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
export interface OwnableInterface extends ethers.utils.Interface {
  functions: {
    'owner()': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
  };
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'renounceOwnership',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [string]
  ): string;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'renounceOwnership',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'transferOwnership',
    data: BytesLike
  ): Result;
  events: {
    'OwnershipTransferred(address,address)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
}
export declare type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
export declare type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;
export interface Ownable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: OwnableInterface;
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
    owner(overrides?: CallOverrides): Promise<[string]>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  owner(overrides?: CallOverrides): Promise<string>;
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };
  filters: {
    'OwnershipTransferred(address,address)'(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };
  estimateGas: {
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
