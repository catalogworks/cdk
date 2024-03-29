import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {IZoraMedia, IZoraMediaInterface} from '../IZoraMedia';
export declare class IZoraMedia__factory {
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
  static createInterface(): IZoraMediaInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IZoraMedia;
}
