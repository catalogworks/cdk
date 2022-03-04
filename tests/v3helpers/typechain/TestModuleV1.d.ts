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
export interface TestModuleV1Interface extends ethers.utils.Interface {
  functions: {
    'depositERC20(address,address,uint256)': FunctionFragment;
    'depositERC721(address,address,uint256)': FunctionFragment;
    'safeDepositERC721(address,address,uint256)': FunctionFragment;
    'safeWithdrawERC721(address,address,uint256)': FunctionFragment;
    'withdrawERC20(address,address,uint256)': FunctionFragment;
    'withdrawERC721(address,address,uint256)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'depositERC20',
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositERC721',
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'safeDepositERC721',
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'safeWithdrawERC721',
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawERC20',
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawERC721',
    values: [string, string, BigNumberish]
  ): string;
  decodeFunctionResult(
    functionFragment: 'depositERC20',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'depositERC721',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'safeDepositERC721',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'safeWithdrawERC721',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'withdrawERC20',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'withdrawERC721',
    data: BytesLike
  ): Result;
  events: {};
}
export interface TestModuleV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TestModuleV1Interface;
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
    depositERC20(
      _tokenContract: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    depositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    safeDepositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    safeWithdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    withdrawERC20(
      _tokenContract: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    withdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  depositERC20(
    _tokenContract: string,
    _from: string,
    _amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  depositERC721(
    _tokenContract: string,
    _from: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  safeDepositERC721(
    _tokenContract: string,
    _from: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  safeWithdrawERC721(
    _tokenContract: string,
    _to: string,
    _tokenID: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  withdrawERC20(
    _tokenContract: string,
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  withdrawERC721(
    _tokenContract: string,
    _to: string,
    _tokenID: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    depositERC20(
      _tokenContract: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    depositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    safeDepositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    safeWithdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    withdrawERC20(
      _tokenContract: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
    withdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };
  filters: {};
  estimateGas: {
    depositERC20(
      _tokenContract: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    depositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    safeDepositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    safeWithdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    withdrawERC20(
      _tokenContract: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    withdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    depositERC20(
      _tokenContract: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    depositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    safeDepositERC721(
      _tokenContract: string,
      _from: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    safeWithdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    withdrawERC20(
      _tokenContract: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    withdrawERC721(
      _tokenContract: string,
      _to: string,
      _tokenID: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
