import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {
  IncomingTransferSupportV1,
  IncomingTransferSupportV1Interface,
} from '../IncomingTransferSupportV1';
declare type IncomingTransferSupportV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class IncomingTransferSupportV1__factory extends ContractFactory {
  constructor(...args: IncomingTransferSupportV1ConstructorParams);
  deploy(
    _erc20TransferHelper: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<IncomingTransferSupportV1>;
  getDeployTransaction(
    _erc20TransferHelper: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): IncomingTransferSupportV1;
  connect(signer: Signer): IncomingTransferSupportV1__factory;
  static readonly bytecode =
    '0x60a060405234801561001057600080fd5b5060405161013a38038061013a83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b60805160b261008860003960006031015260b26000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80638f9d325114602d575b600080fd5b60537f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f3fea2646970667358221220bec6b4e398e175953849e488631c4848d7652a74bc37a7ddaa2e007fba5b343a64736f6c634300080a0033';
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        inputs: any[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
      }
  )[];
  static createInterface(): IncomingTransferSupportV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IncomingTransferSupportV1;
}
export {};
