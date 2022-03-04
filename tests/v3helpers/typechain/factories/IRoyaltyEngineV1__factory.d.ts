import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {
  IRoyaltyEngineV1,
  IRoyaltyEngineV1Interface,
} from '../IRoyaltyEngineV1';
export declare class IRoyaltyEngineV1__factory {
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
  static createInterface(): IRoyaltyEngineV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRoyaltyEngineV1;
}
