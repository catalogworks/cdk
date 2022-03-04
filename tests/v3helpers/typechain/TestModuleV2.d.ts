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
export interface TestModuleV2Interface extends ethers.utils.Interface {
  functions: {
    'batchDepositERC1155(address,address,uint256[],uint256[])': FunctionFragment;
    'batchWithdrawERC1155(address,address,uint256[],uint256[])': FunctionFragment;
    'depositERC1155(address,address,uint256,uint256)': FunctionFragment;
    'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)': FunctionFragment;
    'onERC1155Received(address,address,uint256,uint256,bytes)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'withdrawERC1155(address,address,uint256,uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'batchDepositERC1155',
    values: [string, string, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'batchWithdrawERC1155',
    values: [string, string, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositERC1155',
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'onERC1155BatchReceived',
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'onERC1155Received',
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawERC1155',
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  decodeFunctionResult(
    functionFragment: 'batchDepositERC1155',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'batchWithdrawERC1155',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'depositERC1155',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'onERC1155BatchReceived',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'onERC1155Received',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'withdrawERC1155',
    data: BytesLike
  ): Result;
  events: {};
}
export interface TestModuleV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TestModuleV2Interface;
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
    batchDepositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    batchWithdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    depositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    withdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  batchDepositERC1155(
    _tokenContract: string,
    _from: string,
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  batchWithdrawERC1155(
    _tokenContract: string,
    _to: string,
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  depositERC1155(
    _tokenContract: string,
    _from: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;
  withdrawERC1155(
    _tokenContract: string,
    _to: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    batchDepositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;
    batchWithdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;
    depositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
    withdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };
  filters: {};
  estimateGas: {
    batchDepositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    batchWithdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    depositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    withdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    batchDepositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    batchWithdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenIds: BigNumberish[],
      _amounts: BigNumberish[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    depositERC1155(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    withdrawERC1155(
      _tokenContract: string,
      _to: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
