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
import {FunctionFragment, Result} from '@ethersproject/abi';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from './common';
export interface BadERC721Interface extends ethers.utils.Interface {
  functions: {
    'supportsInterface(bytes4)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [BytesLike]
  ): string;
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
    data: BytesLike
  ): Result;
  events: {};
}
export interface BadERC721 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: BadERC721Interface;
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
    supportsInterface(
      _interface: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  supportsInterface(
    _interface: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    supportsInterface(
      _interface: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };
  filters: {};
  estimateGas: {
    supportsInterface(
      _interface: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    supportsInterface(
      _interface: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
