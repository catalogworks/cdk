import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {
  OutgoingTransferSupportV1,
  OutgoingTransferSupportV1Interface,
} from '../OutgoingTransferSupportV1';
declare type OutgoingTransferSupportV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class OutgoingTransferSupportV1__factory extends ContractFactory {
  constructor(...args: OutgoingTransferSupportV1ConstructorParams);
  deploy(
    _wethAddress: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<OutgoingTransferSupportV1>;
  getDeployTransaction(
    _wethAddress: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): OutgoingTransferSupportV1;
  connect(signer: Signer): OutgoingTransferSupportV1__factory;
  static readonly bytecode =
    '0x60a0604052348015600f57600080fd5b5060405160bc38038060bc833981016040819052602a91603a565b6001600160a01b03166080526068565b600060208284031215604b57600080fd5b81516001600160a01b0381168114606157600080fd5b9392505050565b608051603f607d60003960005050603f6000f3fe6080604052600080fdfea26469706673582212202f1fcfaaa3f20b929ac3fc0e9662988f114737d4e75010259d4128e15c13acd464736f6c634300080a0033';
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): OutgoingTransferSupportV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OutgoingTransferSupportV1;
}
export {};
