import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {TestModuleV1, TestModuleV1Interface} from '../TestModuleV1';
declare type TestModuleV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class TestModuleV1__factory extends ContractFactory {
  constructor(...args: TestModuleV1ConstructorParams);
  deploy(
    _erc20TransferHelper: string,
    _erc721TransferHelper: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<TestModuleV1>;
  getDeployTransaction(
    _erc20TransferHelper: string,
    _erc721TransferHelper: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): TestModuleV1;
  connect(signer: Signer): TestModuleV1__factory;
  static readonly bytecode =
    '0x608060405234801561001057600080fd5b5060405161050538038061050583398101604081905261002f9161007c565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100af565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008f57600080fd5b61009883610060565b91506100a660208401610060565b90509250929050565b610447806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806344004cc11161005057806344004cc1146100b2578063e988ad91146100c5578063f205e636146100d857600080fd5b80631cad5a4014610077578063331ded1a1461008c5780634025feb21461009f575b600080fd5b61008a6100853660046103d5565b6100eb565b005b61008a61009a3660046103d5565b61018b565b61008a6100ad3660046103d5565b6101f8565b61008a6100c03660046103d5565b610265565b61008a6100d33660046103d5565b6102d2565b61008a6100e63660046103d5565b61033f565b6000546040517fd9fc4b6100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301528481166024830152306044830152606482018490529091169063d9fc4b61906084015b600060405180830381600087803b15801561016e57600080fd5b505af1158015610182573d6000803e3d6000fd5b50505050505050565b6001546040517f15dacbea00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152848116602483015230604483015260648201849052909116906315dacbea90608401610154565b6001546040517f15dacbea00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152306024830152848116604483015260648201849052909116906315dacbea90608401610154565b6000546040517fd9fc4b6100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301523060248301528481166044830152606482018490529091169063d9fc4b6190608401610154565b6001546040517fd9fc4b6100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301523060248301528481166044830152606482018490529091169063d9fc4b6190608401610154565b6001546040517fd9fc4b6100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301528481166024830152306044830152606482018490529091169063d9fc4b6190608401610154565b803573ffffffffffffffffffffffffffffffffffffffff811681146103d057600080fd5b919050565b6000806000606084860312156103ea57600080fd5b6103f3846103ac565b9250610401602085016103ac565b915060408401359050925092509256fea26469706673582212200c30b4ab99e5c0d9eaf2f8a22e05aa4079daa91c21a160ade6bea08f42e959cb64736f6c634300080a0033';
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: any[];
        stateMutability: string;
        type: string;
      }
  )[];
  static createInterface(): TestModuleV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestModuleV1;
}
export {};