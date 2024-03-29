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
import {FunctionFragment, Result} from '@ethersproject/abi';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from './common';
export interface IRoyaltyEngineV1Interface extends ethers.utils.Interface {
  functions: {
    'getRoyalty(address,uint256,uint256)': FunctionFragment;
    'getRoyaltyView(address,uint256,uint256)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'getRoyalty',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'getRoyaltyView',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [BytesLike]
  ): string;
  decodeFunctionResult(functionFragment: 'getRoyalty', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'getRoyaltyView',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
    data: BytesLike
  ): Result;
  events: {};
}
export interface IRoyaltyEngineV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IRoyaltyEngineV1Interface;
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
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
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
  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;
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
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };
  filters: {};
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
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
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
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
