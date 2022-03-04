import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {SimpleModule, SimpleModuleInterface} from '../SimpleModule';
declare type SimpleModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class SimpleModule__factory extends ContractFactory {
  constructor(...args: SimpleModuleConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<SimpleModule>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): SimpleModule;
  connect(signer: Signer): SimpleModule__factory;
  static readonly bytecode =
    '0x6080604052348015600f57600080fd5b50607780601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063d909b40314602d575b600080fd5b600160405190815260200160405180910390f3fea2646970667358221220c0e0f9e1084828e3aa049f4d4cc9e630e9d28dffcdd7cef03310514d151e30a964736f6c634300080a0033';
  static readonly abi: {
    inputs: any[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): SimpleModuleInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleModule;
}
export {};
