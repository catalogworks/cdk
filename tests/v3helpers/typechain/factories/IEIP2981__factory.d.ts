import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {IEIP2981, IEIP2981Interface} from '../IEIP2981';
export declare class IEIP2981__factory {
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
  static createInterface(): IEIP2981Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IEIP2981;
}
