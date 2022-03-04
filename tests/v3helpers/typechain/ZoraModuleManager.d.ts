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
export interface ZoraModuleManagerInterface extends ethers.utils.Interface {
  functions: {
    'isModuleApproved(address,address)': FunctionFragment;
    'moduleFeeToken()': FunctionFragment;
    'moduleRegistered(address)': FunctionFragment;
    'registerModule(address)': FunctionFragment;
    'registrar()': FunctionFragment;
    'setApprovalForModule(address,bool)': FunctionFragment;
    'setApprovalForModuleBySig(address,address,bool,uint256,uint8,bytes32,bytes32)': FunctionFragment;
    'setBatchApprovalForModules(address[],bool)': FunctionFragment;
    'setRegistrar(address)': FunctionFragment;
    'sigNonces(address)': FunctionFragment;
    'userApprovals(address,address)': FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: 'isModuleApproved',
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'moduleFeeToken',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'moduleRegistered',
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: 'registerModule',
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: 'registrar', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setApprovalForModule',
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: 'setApprovalForModuleBySig',
    values: [
      string,
      string,
      boolean,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'setBatchApprovalForModules',
    values: [string[], boolean]
  ): string;
  encodeFunctionData(
    functionFragment: 'setRegistrar',
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: 'sigNonces', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'userApprovals',
    values: [string, string]
  ): string;
  decodeFunctionResult(
    functionFragment: 'isModuleApproved',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'moduleFeeToken',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'moduleRegistered',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'registerModule',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'registrar', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setApprovalForModule',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setApprovalForModuleBySig',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setBatchApprovalForModules',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setRegistrar',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'sigNonces', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'userApprovals',
    data: BytesLike
  ): Result;
  events: {
    'ModuleApprovalSet(address,address,bool)': EventFragment;
    'ModuleRegistered(address)': EventFragment;
    'RegistrarChanged(address)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'ModuleApprovalSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ModuleRegistered'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RegistrarChanged'): EventFragment;
}
export declare type ModuleApprovalSetEvent = TypedEvent<
  [string, string, boolean],
  {
    user: string;
    module: string;
    approved: boolean;
  }
>;
export declare type ModuleApprovalSetEventFilter =
  TypedEventFilter<ModuleApprovalSetEvent>;
export declare type ModuleRegisteredEvent = TypedEvent<
  [string],
  {
    module: string;
  }
>;
export declare type ModuleRegisteredEventFilter =
  TypedEventFilter<ModuleRegisteredEvent>;
export declare type RegistrarChangedEvent = TypedEvent<
  [string],
  {
    newRegistrar: string;
  }
>;
export declare type RegistrarChangedEventFilter =
  TypedEventFilter<RegistrarChangedEvent>;
export interface ZoraModuleManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ZoraModuleManagerInterface;
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
    isModuleApproved(
      _user: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    moduleFeeToken(overrides?: CallOverrides): Promise<[string]>;
    moduleRegistered(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
    registerModule(
      _module: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    registrar(overrides?: CallOverrides): Promise<[string]>;
    setApprovalForModule(
      _module: string,
      _approved: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    setApprovalForModuleBySig(
      _module: string,
      _user: string,
      _approved: boolean,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    setBatchApprovalForModules(
      _modules: string[],
      _approved: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    setRegistrar(
      _registrar: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    sigNonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    userApprovals(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };
  isModuleApproved(
    _user: string,
    _module: string,
    overrides?: CallOverrides
  ): Promise<boolean>;
  moduleFeeToken(overrides?: CallOverrides): Promise<string>;
  moduleRegistered(arg0: string, overrides?: CallOverrides): Promise<boolean>;
  registerModule(
    _module: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  registrar(overrides?: CallOverrides): Promise<string>;
  setApprovalForModule(
    _module: string,
    _approved: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  setApprovalForModuleBySig(
    _module: string,
    _user: string,
    _approved: boolean,
    _deadline: BigNumberish,
    _v: BigNumberish,
    _r: BytesLike,
    _s: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  setBatchApprovalForModules(
    _modules: string[],
    _approved: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  setRegistrar(
    _registrar: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  sigNonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  userApprovals(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<boolean>;
  callStatic: {
    isModuleApproved(
      _user: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
    moduleFeeToken(overrides?: CallOverrides): Promise<string>;
    moduleRegistered(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    registerModule(_module: string, overrides?: CallOverrides): Promise<void>;
    registrar(overrides?: CallOverrides): Promise<string>;
    setApprovalForModule(
      _module: string,
      _approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
    setApprovalForModuleBySig(
      _module: string,
      _user: string,
      _approved: boolean,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
    setBatchApprovalForModules(
      _modules: string[],
      _approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
    setRegistrar(_registrar: string, overrides?: CallOverrides): Promise<void>;
    sigNonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    userApprovals(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };
  filters: {
    'ModuleApprovalSet(address,address,bool)'(
      user?: string | null,
      module?: string | null,
      approved?: null
    ): ModuleApprovalSetEventFilter;
    ModuleApprovalSet(
      user?: string | null,
      module?: string | null,
      approved?: null
    ): ModuleApprovalSetEventFilter;
    'ModuleRegistered(address)'(
      module?: string | null
    ): ModuleRegisteredEventFilter;
    ModuleRegistered(module?: string | null): ModuleRegisteredEventFilter;
    'RegistrarChanged(address)'(
      newRegistrar?: string | null
    ): RegistrarChangedEventFilter;
    RegistrarChanged(newRegistrar?: string | null): RegistrarChangedEventFilter;
  };
  estimateGas: {
    isModuleApproved(
      _user: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    moduleFeeToken(overrides?: CallOverrides): Promise<BigNumber>;
    moduleRegistered(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
    registerModule(
      _module: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    registrar(overrides?: CallOverrides): Promise<BigNumber>;
    setApprovalForModule(
      _module: string,
      _approved: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    setApprovalForModuleBySig(
      _module: string,
      _user: string,
      _approved: boolean,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    setBatchApprovalForModules(
      _modules: string[],
      _approved: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    setRegistrar(
      _registrar: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    sigNonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    userApprovals(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    isModuleApproved(
      _user: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    moduleFeeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    moduleRegistered(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    registerModule(
      _module: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setApprovalForModule(
      _module: string,
      _approved: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    setApprovalForModuleBySig(
      _module: string,
      _user: string,
      _approved: boolean,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    setBatchApprovalForModules(
      _modules: string[],
      _approved: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    setRegistrar(
      _registrar: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    sigNonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
    userApprovals(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
