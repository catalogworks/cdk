'use strict';
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {value: true});
exports.OutgoingTransferSupportV1__factory = void 0;
const ethers_1 = require('ethers');
const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_wethAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
];
const _bytecode =
  '0x60a0604052348015600f57600080fd5b5060405160bc38038060bc833981016040819052602a91603a565b6001600160a01b03166080526068565b600060208284031215604b57600080fd5b81516001600160a01b0381168114606157600080fd5b9392505050565b608051603f607d60003960005050603f6000f3fe6080604052600080fdfea26469706673582212202f1fcfaaa3f20b929ac3fc0e9662988f114737d4e75010259d4128e15c13acd464736f6c634300080a0033';
const isSuperArgs = (xs) => xs.length > 1;
class OutgoingTransferSupportV1__factory extends ethers_1.ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }
  deploy(_wethAddress, overrides) {
    return super.deploy(_wethAddress, overrides || {});
  }
  getDeployTransaction(_wethAddress, overrides) {
    return super.getDeployTransaction(_wethAddress, overrides || {});
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
exports.OutgoingTransferSupportV1__factory = OutgoingTransferSupportV1__factory;
OutgoingTransferSupportV1__factory.bytecode = _bytecode;
OutgoingTransferSupportV1__factory.abi = _abi;
//# sourceMappingURL=OutgoingTransferSupportV1__factory.js.map
