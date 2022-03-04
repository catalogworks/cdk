import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {
  SuperRareContracts,
  SuperRareContractsInterface,
} from '../SuperRareContracts';
declare type SuperRareContractsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class SuperRareContracts__factory extends ContractFactory {
  constructor(...args: SuperRareContractsConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<SuperRareContracts>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): SuperRareContracts;
  connect(signer: Signer): SuperRareContracts__factory;
  static readonly bytecode =
    '0x60f9610039600b82828239805160001a60731461002c57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060475760003560e01c806389f796ba14604c578063d236782314608f578063f19312ff1460a9575b600080fd5b606673b932a70a57673d89f4acffbe830e8ed7f75fb9e081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b60667317b0c8564e53f22364a6c8de6f7ca5ce9bea4e5d81565b60667341a322b28d0ff354040e2cbc676f0320d8c8850d8156fea26469706673582212202fb7f8e0e906999a05c23bfa4f3961c01b38fa4a551ed0b13d90d49d19f1ef8764736f6c634300080a0033';
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
  static createInterface(): SuperRareContractsInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SuperRareContracts;
}
export {};
