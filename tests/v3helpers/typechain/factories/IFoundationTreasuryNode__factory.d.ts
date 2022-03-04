import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {
  IFoundationTreasuryNode,
  IFoundationTreasuryNodeInterface,
} from '../IFoundationTreasuryNode';
export declare class IFoundationTreasuryNode__factory {
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
  static createInterface(): IFoundationTreasuryNodeInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFoundationTreasuryNode;
}
