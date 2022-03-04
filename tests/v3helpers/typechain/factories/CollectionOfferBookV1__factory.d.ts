import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {
  CollectionOfferBookV1,
  CollectionOfferBookV1Interface,
} from '../CollectionOfferBookV1';
declare type CollectionOfferBookV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class CollectionOfferBookV1__factory extends ContractFactory {
  constructor(...args: CollectionOfferBookV1ConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<CollectionOfferBookV1>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): CollectionOfferBookV1;
  connect(signer: Signer): CollectionOfferBookV1__factory;
  static readonly bytecode =
    '0x608060405234801561001057600080fd5b506102a7806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063a6b8ca941161005b578063a6b8ca94146100de578063a95c271c146100fe578063aa1a84111461011e578063ad9fa514146101ba57600080fd5b80631115c24d146100825780631863e8ba1461009e57806344d708db146100be575b600080fd5b61008b60005481565b6040519081526020015b60405180910390f35b61008b6100ac366004610225565b60056020526000908152604090205481565b61008b6100cc366004610225565b60026020526000908152604090205481565b61008b6100ec366004610225565b60046020526000908152604090205481565b61008b61010c366004610225565b60036020526000908152604090205481565b61017b61012c366004610247565b600160208181526000938452604080852090915291835291208054918101546002820154600383015460049093015473ffffffffffffffffffffffffffffffffffffffff909416939192909185565b6040805173ffffffffffffffffffffffffffffffffffffffff90961686526020860194909452928401919091526060830152608082015260a001610095565b6101e96101c8366004610247565b600660209081526000928352604080842090915290825290205461ffff1681565b60405161ffff9091168152602001610095565b803573ffffffffffffffffffffffffffffffffffffffff8116811461022057600080fd5b919050565b60006020828403121561023757600080fd5b610240826101fc565b9392505050565b6000806040838503121561025a57600080fd5b610263836101fc565b94602093909301359350505056fea264697066735822122027a60487cf04d75d45f0b6bbbf05ac353f4f980496aee94633eb81c667d1c0a364736f6c634300080a0033';
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
  static createInterface(): CollectionOfferBookV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CollectionOfferBookV1;
}
export {};
