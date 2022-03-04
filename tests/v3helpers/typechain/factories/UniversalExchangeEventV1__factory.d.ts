import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {
  UniversalExchangeEventV1,
  UniversalExchangeEventV1Interface,
} from '../UniversalExchangeEventV1';
declare type UniversalExchangeEventV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class UniversalExchangeEventV1__factory extends ContractFactory {
  constructor(...args: UniversalExchangeEventV1ConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<UniversalExchangeEventV1>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): UniversalExchangeEventV1;
  connect(signer: Signer): UniversalExchangeEventV1__factory;
  static readonly bytecode =
    '0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea26469706673582212209f35c440adf39942d157f8412748d99e114dda73d80b5dfb526091163762e64064736f6c634300080a0033';
  static readonly abi: {
    anonymous: boolean;
    inputs: (
      | {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
          components?: undefined;
        }
      | {
          components: {
            internalType: string;
            name: string;
            type: string;
          }[];
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }
    )[];
    name: string;
    type: string;
  }[];
  static createInterface(): UniversalExchangeEventV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniversalExchangeEventV1;
}
export {};
