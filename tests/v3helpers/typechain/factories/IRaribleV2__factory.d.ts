import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {IRaribleV2, IRaribleV2Interface} from '../IRaribleV2';
export declare class IRaribleV2__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      components: {
        internalType: string;
        name: string;
        type: string;
      }[];
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): IRaribleV2Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRaribleV2;
}
