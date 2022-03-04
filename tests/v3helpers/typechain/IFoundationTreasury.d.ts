import {
  ethers,
  Signer,
  BigNumber,
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
export interface IFoundationTreasuryInterface extends ethers.utils.Interface {
  functions: {
    'isAdmin(address)': FunctionFragment;
  };
  encodeFunctionData(functionFragment: 'isAdmin', values: [string]): string;
  decodeFunctionResult(functionFragment: 'isAdmin', data: BytesLike): Result;
  events: {};
}
export interface IFoundationTreasury extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IFoundationTreasuryInterface;
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
    isAdmin(account: string, overrides?: CallOverrides): Promise<[boolean]>;
  };
  isAdmin(account: string, overrides?: CallOverrides): Promise<boolean>;
  callStatic: {
    isAdmin(account: string, overrides?: CallOverrides): Promise<boolean>;
  };
  filters: {};
  estimateGas: {
    isAdmin(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    isAdmin(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
