'use strict';
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {value: true});
exports.ZoraProtocolFeeSettings__factory = void 0;
const ethers_1 = require('ethers');
const _abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newMetadata',
        type: 'address',
      },
    ],
    name: 'MetadataUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'module',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'feeRecipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'feeBps',
        type: 'uint16',
      },
    ],
    name: 'ProtocolFeeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
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
        name: '_module',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'getFeeAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_minter',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_metadata',
        type: 'address',
      },
    ],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
  {
    inputs: [],
    name: 'metadata',
    outputs: [
      {
        internalType: 'address',
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
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_module',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minter',
    outputs: [
      {
        internalType: 'address',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'moduleFeeSetting',
    outputs: [
      {
        internalType: 'uint16',
        name: 'feeBps',
        type: 'uint16',
      },
      {
        internalType: 'address',
        name: 'feeRecipient',
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
        name: '_module',
        type: 'address',
      },
    ],
    name: 'moduleToTokenId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
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
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_module',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_feeRecipient',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: '_feeBps',
        type: 'uint16',
      },
    ],
    name: 'setFeeParams',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_metadata',
        type: 'address',
      },
    ],
    name: 'setMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
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
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenIdToModule',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const _bytecode =
  '0x60806040523480156200001157600080fd5b50604080518082018252601681527f5a4f5241204d6f64756c652046656520537769746368000000000000000000006020808301918252835180850190945260048452632d27a92360e11b9084015281519192916200007391600091620000ed565b50805162000089906001906020840190620000ed565b5050506200009d33620000a360201b60201c565b620001d0565b600780546001600160a01b0319166001600160a01b0383169081179091556040517f4ffd725fc4a22075e9ec71c59edf9c38cdeb588a91b24fc5b61388c5be41282b90600090a250565b828054620000fb9062000193565b90600052602060002090601f0160209004810192826200011f57600085556200016a565b82601f106200013a57805160ff19168380011785556200016a565b828001600101855582156200016a579182015b828111156200016a5782518255916020019190600101906200014d565b50620001789291506200017c565b5090565b5b808211156200017857600081556001016200017d565b600181811c90821680620001a857607f821691505b60208210811415620001ca57634e487b7160e01b600052602260045260246000fd5b50919050565b61245980620001e06000396000f3fe608060405234801561001057600080fd5b50600436106101a35760003560e01c806370a08231116100ee578063af066de311610097578063e985e9c511610071578063e985e9c51461040f578063ee1fe2ad14610458578063f09a40161461046b578063f3cb83851461047e57600080fd5b8063af066de3146103d6578063b88d4fde146103e9578063c87b56dd146103fc57600080fd5b806395d89b41116100c857806395d89b4114610394578063965d21981461039c578063a22cb465146103c357600080fd5b806370a08231146102f057806386ab6fb9146103035780638da5cb5b1461037457600080fd5b806323b872dd1161015057806361b485f61161012a57806361b485f6146102ab5780636352211e146102cc578063662f0332146102df57600080fd5b806323b872dd14610265578063392f37e91461027857806342842e0e1461029857600080fd5b8063081812fc11610181578063081812fc1461022a578063095ea7b31461023d57806313af40351461025257600080fd5b806301ffc9a7146101a857806306fdde03146101d057806307546172146101e5575b600080fd5b6101bb6101b6366004611e87565b610491565b60405190151581526020015b60405180910390f35b6101d8610576565b6040516101c79190611f1a565b6008546102059073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101c7565b610205610238366004611f2d565b610608565b61025061024b366004611f6f565b6106e7565b005b610250610260366004611f99565b610874565b610250610273366004611fb4565b610901565b6006546102059073ffffffffffffffffffffffffffffffffffffffff1681565b6102506102a6366004611fb4565b6109a2565b6102be6102b9366004611f6f565b6109bd565b6040519081526020016101c7565b6102056102da366004611f2d565b610a06565b6102056102ed366004611f2d565b90565b6102be6102fe366004611f99565b610ab8565b610345610311366004611f99565b60096020526000908152604090205461ffff81169062010000900473ffffffffffffffffffffffffffffffffffffffff1682565b6040805161ffff909316835273ffffffffffffffffffffffffffffffffffffffff9091166020830152016101c7565b6007546102059073ffffffffffffffffffffffffffffffffffffffff1681565b6101d8610b86565b6102be6103aa366004611f99565b73ffffffffffffffffffffffffffffffffffffffff1690565b6102506103d1366004611ff0565b610b95565b6102506103e436600461202c565b610cac565b6102506103f736600461213e565b610f76565b6101d861040a366004611f2d565b61101e565b6101bb61041d3660046121e9565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b6102be6104663660046121e9565b61122c565b6102506104793660046121e9565b6112d1565b61025061048c366004611f99565b611425565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061052457507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061057057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600080546105859061221c565b80601f01602080910402602001604051908101604052809291908181526020018280546105b19061221c565b80156105fe5780601f106105d3576101008083540402835291602001916105fe565b820191906000526020600020905b8154815290600101906020018083116105e157829003601f168201915b5050505050905090565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff166106be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006106f282610a06565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156107b0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084016106b5565b3373ffffffffffffffffffffffffffffffffffffffff821614806107d957506107d9813361041d565b610865576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016106b5565b61086f83836114af565b505050565b60075473ffffffffffffffffffffffffffffffffffffffff1633146108f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f7365744f776e6572206f6e6c794f776e6572000000000000000000000000000060448201526064016106b5565b6108fe8161154f565b50565b61090b33826115be565b610997576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016106b5565b61086f83838361172e565b61086f83838360405180602001604052806000815250610f76565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260096020526040812054612710906109f59061ffff168461229f565b6109ff91906122dc565b9392505050565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610570576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e000000000000000000000000000000000000000000000060648201526084016106b5565b600073ffffffffffffffffffffffffffffffffffffffff8216610b5d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f20616464726573730000000000000000000000000000000000000000000060648201526084016106b5565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b6060600180546105859061221c565b73ffffffffffffffffffffffffffffffffffffffff8216331415610c15576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016106b5565b33600081815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b8273ffffffffffffffffffffffffffffffffffffffff811633610cce82610a06565b73ffffffffffffffffffffffffffffffffffffffff1614610d4b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f6f6e6c794d6f64756c654f776e6572000000000000000000000000000000000060448201526064016106b5565b6127108361ffff161115610de1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f736574466565506172616d73206d7573742073657420666565203c3d2031303060448201527f250000000000000000000000000000000000000000000000000000000000000060648201526084016106b5565b73ffffffffffffffffffffffffffffffffffffffff8416151580610e07575061ffff8316155b610eb9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604760248201527f736574466565506172616d732066656520726563697069656e742063616e6e6f60448201527f742062652030206164647265737320696620666565206973206772656174657260648201527f207468616e203000000000000000000000000000000000000000000000000000608482015260a4016106b5565b60408051808201825261ffff85811680835273ffffffffffffffffffffffffffffffffffffffff88811660208086018281528c841660008181526009845289902097518854925190951662010000027fffffffffffffffffffff000000000000000000000000000000000000000000009092169490961693909317929092179094558451938452830152917f13a20b316cfe128c34302b82770e84718519ea467fbd984b426aaae5513c79c1910160405180910390a25050505050565b610f8033836115be565b61100c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016106b5565b61101884848484611995565b50505050565b60008181526002602052604090205460609073ffffffffffffffffffffffffffffffffffffffff166110d2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e000000000000000000000000000000000060648201526084016106b5565b60065473ffffffffffffffffffffffffffffffffffffffff16611177576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f4552433732314d657461646174613a206e6f206d65746164617461206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016106b5565b6006546040517fc87b56dd0000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff9091169063c87b56dd90602401600060405180830381865afa1580156111e6573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105709190810190612317565b60085460009073ffffffffffffffffffffffffffffffffffffffff1633146112b0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f6d696e74206f6e6c794d696e746572000000000000000000000000000000000060448201526064016106b5565b73ffffffffffffffffffffffffffffffffffffffff82166109ff8482611a38565b60075473ffffffffffffffffffffffffffffffffffffffff163314611352576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f696e6974206f6e6c79206f776e6572000000000000000000000000000000000060448201526064016106b5565b60085473ffffffffffffffffffffffffffffffffffffffff16156113d2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f696e697420616c726561647920696e697469616c697a6564000000000000000060448201526064016106b5565b6008805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560068054929093169116179055565b60075473ffffffffffffffffffffffffffffffffffffffff1633146114a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f7365744d65746164617461206f6e6c794f776e6572000000000000000000000060448201526064016106b5565b6108fe81611bfa565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416908117909155819061150982610a06565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600780547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040517f4ffd725fc4a22075e9ec71c59edf9c38cdeb588a91b24fc5b61388c5be41282b90600090a250565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1661166f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084016106b5565b600061167a83610a06565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806116e957508373ffffffffffffffffffffffffffffffffffffffff166116d184610608565b73ffffffffffffffffffffffffffffffffffffffff16145b80611726575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff1661174e82610a06565b73ffffffffffffffffffffffffffffffffffffffff16146117f1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e000000000000000000000000000000000000000000000060648201526084016106b5565b73ffffffffffffffffffffffffffffffffffffffff8216611893576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016106b5565b61189e6000826114af565b73ffffffffffffffffffffffffffffffffffffffff831660009081526003602052604081208054600192906118d490849061238e565b909155505073ffffffffffffffffffffffffffffffffffffffff8216600090815260036020526040812080546001929061190f9084906123a5565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6119a084848461172e565b6119ac84848484611c69565b611018576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016106b5565b73ffffffffffffffffffffffffffffffffffffffff8216611ab5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016106b5565b60008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff1615611b41576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016106b5565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260408120805460019290611b779084906123a5565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600680547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040517fe08224dc11618a1e23016c28d3fb80e30630f4df34d9f95890fe9ce89a85d07e90600090a250565b600073ffffffffffffffffffffffffffffffffffffffff84163b15611e4e576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611ce09033908990889088906004016123bd565b6020604051808303816000875af1925050508015611d39575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611d3691810190612406565b60015b611e03573d808015611d67576040519150601f19603f3d011682016040523d82523d6000602084013e611d6c565b606091505b508051611dfb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016106b5565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050611726565b506001949350505050565b7fffffffff00000000000000000000000000000000000000000000000000000000811681146108fe57600080fd5b600060208284031215611e9957600080fd5b81356109ff81611e59565b60005b83811015611ebf578181015183820152602001611ea7565b838111156110185750506000910152565b60008151808452611ee8816020860160208601611ea4565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006109ff6020830184611ed0565b600060208284031215611f3f57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611f6a57600080fd5b919050565b60008060408385031215611f8257600080fd5b611f8b83611f46565b946020939093013593505050565b600060208284031215611fab57600080fd5b6109ff82611f46565b600080600060608486031215611fc957600080fd5b611fd284611f46565b9250611fe060208501611f46565b9150604084013590509250925092565b6000806040838503121561200357600080fd5b61200c83611f46565b91506020830135801515811461202157600080fd5b809150509250929050565b60008060006060848603121561204157600080fd5b61204a84611f46565b925061205860208501611f46565b9150604084013561ffff8116811461206f57600080fd5b809150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156120f0576120f061207a565b604052919050565b600067ffffffffffffffff8211156121125761211261207a565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b6000806000806080858703121561215457600080fd5b61215d85611f46565b935061216b60208601611f46565b925060408501359150606085013567ffffffffffffffff81111561218e57600080fd5b8501601f8101871361219f57600080fd5b80356121b26121ad826120f8565b6120a9565b8181528860208385010111156121c757600080fd5b8160208401602083013760006020838301015280935050505092959194509250565b600080604083850312156121fc57600080fd5b61220583611f46565b915061221360208401611f46565b90509250929050565b600181811c9082168061223057607f821691505b6020821081141561226a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156122d7576122d7612270565b500290565b600082612312577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b60006020828403121561232957600080fd5b815167ffffffffffffffff81111561234057600080fd5b8201601f8101841361235157600080fd5b805161235f6121ad826120f8565b81815285602083850101111561237457600080fd5b612385826020830160208601611ea4565b95945050505050565b6000828210156123a0576123a0612270565b500390565b600082198211156123b8576123b8612270565b500190565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526123fc6080830184611ed0565b9695505050505050565b60006020828403121561241857600080fd5b81516109ff81611e5956fea26469706673582212208790a91a2c80ecfdd1189453ca6197c8b0c1869f754751fe67c0a5f3b973624b64736f6c634300080a0033';
const isSuperArgs = (xs) => xs.length > 1;
class ZoraProtocolFeeSettings__factory extends ethers_1.ContractFactory {
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
exports.ZoraProtocolFeeSettings__factory = ZoraProtocolFeeSettings__factory;
ZoraProtocolFeeSettings__factory.bytecode = _bytecode;
ZoraProtocolFeeSettings__factory.abi = _abi;
//# sourceMappingURL=ZoraProtocolFeeSettings__factory.js.map