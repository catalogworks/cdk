'use strict';
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {value: true});
exports.ERC1155Holder__factory = void 0;
const ethers_1 = require('ethers');
const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const _bytecode =
  '0x608060405234801561001057600080fd5b506104eb806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301ffc9a714610046578063bc197c811461006e578063f23a6e61146100d7575b600080fd5b6100596100543660046101a8565b61010f565b60405190151581526020015b60405180910390f35b6100a661007c3660046103a6565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff000000000000000000000000000000000000000000000000000000009091168152602001610065565b6100a66100e5366004610450565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e00000000000000000000000000000000000000000000000000000000014806101a257507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6000602082840312156101ba57600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146101ea57600080fd5b9392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461021557600080fd5b919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156102905761029061021a565b604052919050565b600082601f8301126102a957600080fd5b8135602067ffffffffffffffff8211156102c5576102c561021a565b8160051b6102d4828201610249565b92835284810182019282810190878511156102ee57600080fd5b83870192505b8483101561030d578235825291830191908301906102f4565b979650505050505050565b600082601f83011261032957600080fd5b813567ffffffffffffffff8111156103435761034361021a565b61037460207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610249565b81815284602083860101111561038957600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a086880312156103be57600080fd5b6103c7866101f1565b94506103d5602087016101f1565b9350604086013567ffffffffffffffff808211156103f257600080fd5b6103fe89838a01610298565b9450606088013591508082111561041457600080fd5b61042089838a01610298565b9350608088013591508082111561043657600080fd5b5061044388828901610318565b9150509295509295909350565b600080600080600060a0868803121561046857600080fd5b610471866101f1565b945061047f602087016101f1565b93506040860135925060608601359150608086013567ffffffffffffffff8111156104a957600080fd5b6104438882890161031856fea26469706673582212202124da1065c243d62bea145a15b16f66f15b0028a052b54750adf844bbecf5b064736f6c634300080a0033';
const isSuperArgs = (xs) => xs.length > 1;
class ERC1155Holder__factory extends ethers_1.ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address) {
    return super.attach(address);
  }
  connect(signer) {
    return super.connect(signer);
  }
  static createInterface() {
    return new ethers_1.utils.Interface(_abi);
  }
  static connect(address, signerOrProvider) {
    return new ethers_1.Contract(address, _abi, signerOrProvider);
  }
}
exports.ERC1155Holder__factory = ERC1155Holder__factory;
ERC1155Holder__factory.bytecode = _bytecode;
ERC1155Holder__factory.abi = _abi;
//# sourceMappingURL=ERC1155Holder__factory.js.map