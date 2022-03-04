import {Signer} from 'ethers';
import {Provider} from '@ethersproject/providers';
import type {IZoraMarket, IZoraMarketInterface} from '../IZoraMarket';
export declare class IZoraMarket__factory {
  static readonly abi: {
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
  }[];
  static createInterface(): IZoraMarketInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IZoraMarket;
}
