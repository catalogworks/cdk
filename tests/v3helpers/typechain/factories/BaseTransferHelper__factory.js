'use strict';
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {value: true});
exports.BaseTransferHelper__factory = void 0;
const ethers_1 = require('ethers');
const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_moduleManager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'ZMM',
    outputs: [
      {
        internalType: 'contract ZoraModuleManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'isModuleApproved',
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
  '0x60a060405234801561001057600080fd5b5060405161030338038061030383398101604081905261002f916100ae565b6001600160a01b03811661009d5760405162461bcd60e51b815260206004820152602b60248201527f6d75737420736574206d6f64756c65206d616e6167657220746f206e6f6e2d7a60448201526a65726f206164647265737360a81b606482015260840160405180910390fd5b6001600160a01b03166080526100de565b6000602082840312156100c057600080fd5b81516001600160a01b03811681146100d757600080fd5b9392505050565b6080516102056100fe600039600081816068015260fd01526102056000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806372d276921461003b578063e3e606f014610063575b600080fd5b61004e610049366004610170565b6100af565b60405190151581526020015b60405180910390f35b61008a7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161005a565b6040517f37436c9800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82811660048301523360248301526000917f0000000000000000000000000000000000000000000000000000000000000000909116906337436c9890604401602060405180830381865afa158015610146573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016a91906101ad565b92915050565b60006020828403121561018257600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146101a657600080fd5b9392505050565b6000602082840312156101bf57600080fd5b815180151581146101a657600080fdfea26469706673582212204bd6ed0dcb6b397e2f54a199ddc26465485efc07c57d108826d1227bffe07aef64736f6c634300080a0033';
const isSuperArgs = (xs) => xs.length > 1;
class BaseTransferHelper__factory extends ethers_1.ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }
  deploy(_moduleManager, overrides) {
    return super.deploy(_moduleManager, overrides || {});
  }
  getDeployTransaction(_moduleManager, overrides) {
    return super.getDeployTransaction(_moduleManager, overrides || {});
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
exports.BaseTransferHelper__factory = BaseTransferHelper__factory;
BaseTransferHelper__factory.bytecode = _bytecode;
BaseTransferHelper__factory.abi = _abi;
//# sourceMappingURL=BaseTransferHelper__factory.js.map
