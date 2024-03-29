'use strict';
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {value: true});
exports.IZoraMarket__factory = void 0;
const ethers_1 = require('ethers');
const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'bidSharesForToken',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct IZoraMarket.ZoraDecimal',
            name: 'prevOwner',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct IZoraMarket.ZoraDecimal',
            name: 'creator',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct IZoraMarket.ZoraDecimal',
            name: 'owner',
            type: 'tuple',
          },
        ],
        internalType: 'struct IZoraMarket.ZoraBidShares',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
class IZoraMarket__factory {
  static createInterface() {
    return new ethers_1.utils.Interface(_abi);
  }
  static connect(address, signerOrProvider) {
    return new ethers_1.Contract(address, _abi, signerOrProvider);
  }
}
exports.IZoraMarket__factory = IZoraMarket__factory;
IZoraMarket__factory.abi = _abi;
//# sourceMappingURL=IZoraMarket__factory.js.map
