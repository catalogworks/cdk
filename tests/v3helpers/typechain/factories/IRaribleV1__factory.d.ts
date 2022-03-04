import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {IRaribleV1, IRaribleV1Interface} from '../IRaribleV1';
export declare class IRaribleV1__factory {
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
  static createInterface(): IRaribleV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRaribleV1;
}
