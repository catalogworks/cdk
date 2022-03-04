import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {IZoraV1Market, IZoraV1MarketInterface} from '../IZoraV1Market';
export declare class IZoraV1Market__factory {
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          components: {
            components: {
              internalType: string;
              name: string;
              type: string;
            }[];
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
      }
    | {
        inputs: (
          | {
              components: {
                internalType: string;
                name: string;
                type: string;
              }[];
              internalType: string;
              name: string;
              type: string;
            }
          | {
              internalType: string;
              name: string;
              type: string;
              components?: undefined;
            }
        )[];
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
  static createInterface(): IZoraV1MarketInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IZoraV1Market;
}
