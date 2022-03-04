import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {BadERC721, BadERC721Interface} from '../BadERC721';
declare type BadERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class BadERC721__factory extends ContractFactory {
  constructor(...args: BadERC721ConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<BadERC721>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): BadERC721;
  connect(signer: Signer): BadERC721__factory;
  static readonly bytecode =
    '0x608060405234801561001057600080fd5b5060cf8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806301ffc9a714602d575b600080fd5b603e60383660046052565b50600090565b604051901515815260200160405180910390f35b600060208284031215606357600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114609257600080fd5b939250505056fea264697066735822122038599fdc1f1496edbb6131f3dd0fd1b339b9429b7ffb9840d8c8d392dc87a6b864736f6c634300080a0033';
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): BadERC721Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BadERC721;
}
export {};
