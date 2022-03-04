import {
  ethers,
  Signer,
  BigNumber,
  BigNumberish,
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
export interface RoyaltyEngineV1Interface extends ethers.utils.Interface {
  functions: {
    'getRoyalty(address,uint256,uint256)': FunctionFragment;
    'getRoyaltyView(address,uint256,uint256)': FunctionFragment;
    'initialize(address)': FunctionFragment;
    'owner()': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'royaltyRegistry()': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'getRoyalty',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getRoyaltyView',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'initialize', values: [string]): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'renounceOwnership',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'royaltyRegistry',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [string]
  ): string;
  decodeFunctionResult(functionFragment: 'getRoyalty', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'getRoyaltyView',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'renounceOwnership',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'royaltyRegistry',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
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
export interface RoyaltyEngineV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: RoyaltyEngineV1Interface;
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
    getRoyalty(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    getRoyaltyView(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        recipients: string[];
        amounts: BigNumber[];
      }
    >;
    initialize(
      royaltyRegistry_: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    royaltyRegistry(overrides?: CallOverrides): Promise<[string]>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  getRoyalty(
    tokenAddress: string,
    tokenId: BigNumberish,
    value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  getRoyaltyView(
    tokenAddress: string,
    tokenId: BigNumberish,
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string[], BigNumber[]] & {
      recipients: string[];
      amounts: BigNumber[];
    }
  >;
  initialize(
    royaltyRegistry_: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  royaltyRegistry(overrides?: CallOverrides): Promise<string>;
  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    getRoyalty(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        recipients: string[];
        amounts: BigNumber[];
      }
    >;
    getRoyaltyView(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        recipients: string[];
        amounts: BigNumber[];
      }
    >;
    initialize(
      royaltyRegistry_: string,
      overrides?: CallOverrides
    ): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    royaltyRegistry(overrides?: CallOverrides): Promise<string>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
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
    getRoyalty(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    getRoyaltyView(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    initialize(
      royaltyRegistry_: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    royaltyRegistry(overrides?: CallOverrides): Promise<BigNumber>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getRoyalty(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    getRoyaltyView(
      tokenAddress: string,
      tokenId: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    initialize(
      royaltyRegistry_: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    royaltyRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
