"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestERC721__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b50604080518082018252600a8152695465737445524337323160b01b602080830191825283518085019094526004845263151154d560e21b9084015281519192916200006091600091620000ef565b50805162000076906001906020840190620000ef565b505050620000936200008d6200009960201b60201c565b6200009d565b620001d2565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620000fd9062000195565b90600052602060002090601f0160209004810192826200012157600085556200016c565b82601f106200013c57805160ff19168380011785556200016c565b828001600101855582156200016c579182015b828111156200016c5782518255916020019190600101906200014f565b506200017a9291506200017e565b5090565b5b808211156200017a57600081556001016200017f565b600181811c90821680620001aa57607f821691505b60208210811415620001cc57634e487b7160e01b600052602260045260246000fd5b50919050565b611e4c80620001e26000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806370a08231116100b2578063a22cb46511610081578063c87b56dd11610066578063c87b56dd1461026b578063e985e9c51461027e578063f2fde38b146102c757600080fd5b8063a22cb46514610245578063b88d4fde1461025857600080fd5b806370a08231146101f6578063715018a6146102175780638da5cb5b1461021f57806395d89b411461023d57600080fd5b806323b872dd116100ee57806323b872dd146101aa57806340c10f19146101bd57806342842e0e146101d05780636352211e146101e357600080fd5b806301ffc9a71461012057806306fdde0314610148578063081812fc1461015d578063095ea7b314610195575b600080fd5b61013361012e36600461190f565b6102da565b60405190151581526020015b60405180910390f35b6101506103bf565b60405161013f91906119a2565b61017061016b3660046119b5565b610451565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161013f565b6101a86101a33660046119f7565b610530565b005b6101a86101b8366004611a21565b6106bd565b6101a86101cb3660046119f7565b61075e565b6101a86101de366004611a21565b61076c565b6101706101f13660046119b5565b610787565b610209610204366004611a5d565b610839565b60405190815260200161013f565b6101a8610907565b60065473ffffffffffffffffffffffffffffffffffffffff16610170565b610150610994565b6101a8610253366004611a78565b6109a3565b6101a8610266366004611ae3565b610aba565b6101506102793660046119b5565b610b62565b61013361028c366004611bdd565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101a86102d5366004611a5d565b610c7f565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061036d57507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806103b957507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600080546103ce90611c10565b80601f01602080910402602001604051908101604052809291908181526020018280546103fa90611c10565b80156104475780601f1061041c57610100808354040283529160200191610447565b820191906000526020600020905b81548152906001019060200180831161042a57829003601f168201915b5050505050905090565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16610507576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061053b82610787565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156105f9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084016104fe565b3373ffffffffffffffffffffffffffffffffffffffff821614806106225750610622813361028c565b6106ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016104fe565b6106b88383610daf565b505050565b6106c73382610e4f565b610753576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016104fe565b6106b8838383610fbf565b6107688282611226565b5050565b6106b883838360405180602001604052806000815250610aba565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16806103b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e000000000000000000000000000000000000000000000060648201526084016104fe565b600073ffffffffffffffffffffffffffffffffffffffff82166108de576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f20616464726573730000000000000000000000000000000000000000000060648201526084016104fe565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b60065473ffffffffffffffffffffffffffffffffffffffff163314610988576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104fe565b6109926000611240565b565b6060600180546103ce90611c10565b73ffffffffffffffffffffffffffffffffffffffff8216331415610a23576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104fe565b33600081815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b610ac43383610e4f565b610b50576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016104fe565b610b5c848484846112b7565b50505050565b60008181526002602052604090205460609073ffffffffffffffffffffffffffffffffffffffff16610c16576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e000000000000000000000000000000000060648201526084016104fe565b6000610c2d60408051602081019091526000815290565b90506000815111610c4d5760405180602001604052806000815250610c78565b80610c578461135a565b604051602001610c68929190611c64565b6040516020818303038152906040525b9392505050565b60065473ffffffffffffffffffffffffffffffffffffffff163314610d00576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104fe565b73ffffffffffffffffffffffffffffffffffffffff8116610da3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104fe565b610dac81611240565b50565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84169081179091558190610e0982610787565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16610f00576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084016104fe565b6000610f0b83610787565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610f7a57508373ffffffffffffffffffffffffffffffffffffffff16610f6284610451565b73ffffffffffffffffffffffffffffffffffffffff16145b80610fb7575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16610fdf82610787565b73ffffffffffffffffffffffffffffffffffffffff1614611082576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e000000000000000000000000000000000000000000000060648201526084016104fe565b73ffffffffffffffffffffffffffffffffffffffff8216611124576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016104fe565b61112f600082610daf565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805460019290611165908490611cc2565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526003602052604081208054600192906111a0908490611cd9565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b61076882826040518060200160405280600081525061148c565b6006805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6112c2848484610fbf565b6112ce8484848461152f565b610b5c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104fe565b60608161139a57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156113c457806113ae81611cf1565b91506113bd9050600a83611d59565b915061139e565b60008167ffffffffffffffff8111156113df576113df611ab4565b6040519080825280601f01601f191660200182016040528015611409576020820181803683370190505b5090505b8415610fb75761141e600183611cc2565b915061142b600a86611d6d565b611436906030611cd9565b60f81b81838151811061144b5761144b611d81565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611485600a86611d59565b945061140d565b611496838361171f565b6114a3600084848461152f565b6106b8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104fe565b600073ffffffffffffffffffffffffffffffffffffffff84163b15611714576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a02906115a6903390899088908890600401611db0565b6020604051808303816000875af19250505080156115ff575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526115fc91810190611df9565b60015b6116c9573d80801561162d576040519150601f19603f3d011682016040523d82523d6000602084013e611632565b606091505b5080516116c1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104fe565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610fb7565b506001949350505050565b73ffffffffffffffffffffffffffffffffffffffff821661179c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016104fe565b60008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff1615611828576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016104fe565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260036020526040812080546001929061185e908490611cd9565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610dac57600080fd5b60006020828403121561192157600080fd5b8135610c78816118e1565b60005b8381101561194757818101518382015260200161192f565b83811115610b5c5750506000910152565b6000815180845261197081602086016020860161192c565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610c786020830184611958565b6000602082840312156119c757600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff811681146119f257600080fd5b919050565b60008060408385031215611a0a57600080fd5b611a13836119ce565b946020939093013593505050565b600080600060608486031215611a3657600080fd5b611a3f846119ce565b9250611a4d602085016119ce565b9150604084013590509250925092565b600060208284031215611a6f57600080fd5b610c78826119ce565b60008060408385031215611a8b57600080fd5b611a94836119ce565b915060208301358015158114611aa957600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008060008060808587031215611af957600080fd5b611b02856119ce565b9350611b10602086016119ce565b925060408501359150606085013567ffffffffffffffff80821115611b3457600080fd5b818701915087601f830112611b4857600080fd5b813581811115611b5a57611b5a611ab4565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715611ba057611ba0611ab4565b816040528281528a6020848701011115611bb957600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215611bf057600080fd5b611bf9836119ce565b9150611c07602084016119ce565b90509250929050565b600181811c90821680611c2457607f821691505b60208210811415611c5e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60008351611c7681846020880161192c565b835190830190611c8a81836020880161192c565b01949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015611cd457611cd4611c93565b500390565b60008219821115611cec57611cec611c93565b500190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611d2357611d23611c93565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082611d6857611d68611d2a565b500490565b600082611d7c57611d7c611d2a565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152611def6080830184611958565b9695505050505050565b600060208284031215611e0b57600080fd5b8151610c78816118e156fea2646970667358221220f480284c1d04d441fee256f425bb7d588c9b2479004d4164ad2e4e069505235164736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class TestERC721__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
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
exports.TestERC721__factory = TestERC721__factory;
TestERC721__factory.bytecode = _bytecode;
TestERC721__factory.abi = _abi;
//# sourceMappingURL=TestERC721__factory.js.map