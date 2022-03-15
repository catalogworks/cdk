/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {Signer, utils, Contract, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {
  TestInternalTxn,
  TestInternalTxnInterface,
} from '../TestInternalTxn';

const _abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'accounts',
        type: 'address[]',
      },
      {
        internalType: 'uint32[]',
        name: 'percentAllocations',
        type: 'uint32[]',
      },
      {
        internalType: 'uint32',
        name: 'distributorFee',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'controller',
        type: 'address',
      },
    ],
    name: 'create',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'split',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'accounts',
        type: 'address[]',
      },
      {
        internalType: 'uint32[]',
        name: 'percentAllocations',
        type: 'uint32[]',
      },
      {
        internalType: 'uint32',
        name: 'distributorFee',
        type: 'uint32',
      },
    ],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x608060405234801561001057600080fd5b506104b2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632f079a0f1461003b578063f5f0fa7714610050575b600080fd5b61004e610049366004610221565b61007f565b005b61006361005e3660046102b0565b6100fa565b6040516001600160a01b03909116815260200160405180910390f35b604051637677856760e11b8152732ed6c4b5da6378c7897ac67ba9e43102feb694ee9063ecef0ace906100c0908990899089908990899089906004016103c1565b600060405180830381600087803b1580156100da57600080fd5b505af11580156100ee573d6000803e3d6000fd5b50505050505050505050565b604051633b00fbc160e11b8152600090732ed6c4b5da6378c7897ac67ba9e43102feb694ee90637601f7829061013e908a908a908a908a908a908a90600401610413565b602060405180830381600087803b15801561015857600080fd5b505af115801561016c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019091906101fe565b979650505050505050565b60008083601f8401126101ac578182fd5b50813567ffffffffffffffff8111156101c3578182fd5b6020830191508360208260051b85010111156101de57600080fd5b9250929050565b803563ffffffff811681146101f957600080fd5b919050565b60006020828403121561020f578081fd5b815161021a81610464565b9392505050565b60008060008060008060808789031215610239578182fd5b863561024481610464565b9550602087013567ffffffffffffffff80821115610260578384fd5b61026c8a838b0161019b565b90975095506040890135915080821115610284578384fd5b5061029189828a0161019b565b90945092506102a49050606088016101e5565b90509295509295509295565b600080600080600080608087890312156102c8578182fd5b863567ffffffffffffffff808211156102df578384fd5b6102eb8a838b0161019b565b90985096506020890135915080821115610303578384fd5b5061031089828a0161019b565b90955093506103239050604088016101e5565b9150606087013561033381610464565b809150509295509295509295565b81835260006020808501945082825b8581101561037e57813561036381610464565b6001600160a01b031687529582019590820190600101610350565b509495945050505050565b81835260006020808501945082825b8581101561037e5763ffffffff6103ae836101e5565b1687529582019590820190600101610398565b6001600160a01b03871681526080602082018190526000906103e69083018789610341565b82810360408401526103f9818688610389565b91505063ffffffff83166060830152979650505050505050565b60808152600061042760808301888a610341565b828103602084015261043a818789610389565b63ffffffff95909516604084015250506001600160a01b0391909116606090910152949350505050565b6001600160a01b038116811461047957600080fd5b5056fea2646970667358221220c43e317dd3a079599fa1d8bee072aba51ea86269809a12149dcd3704e8794c4d64736f6c63430008040033';

export class TestInternalTxn__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & {from?: string | Promise<string>}
  ): Promise<TestInternalTxn> {
    return super.deploy(overrides || {}) as Promise<TestInternalTxn>;
  }
  getDeployTransaction(
    overrides?: Overrides & {from?: string | Promise<string>}
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestInternalTxn {
    return super.attach(address) as TestInternalTxn;
  }
  connect(signer: Signer): TestInternalTxn__factory {
    return super.connect(signer) as TestInternalTxn__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestInternalTxnInterface {
    return new utils.Interface(_abi) as TestInternalTxnInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestInternalTxn {
    return new Contract(address, _abi, signerOrProvider) as TestInternalTxn;
  }
}