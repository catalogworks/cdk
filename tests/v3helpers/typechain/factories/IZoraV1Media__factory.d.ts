import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {IZoraV1Media, IZoraV1MediaInterface} from '../IZoraV1Media';
export declare class IZoraV1Media__factory {
  static readonly abi: (
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
      }
    | {
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
        anonymous?: undefined;
      }
  )[];
  static createInterface(): IZoraV1MediaInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IZoraV1Media;
}
