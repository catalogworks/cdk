"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoyaltyEngineV1__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "getRoyalty",
        outputs: [
            {
                internalType: "address payable[]",
                name: "recipients",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "getRoyaltyView",
        outputs: [
            {
                internalType: "address payable[]",
                name: "recipients",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "royaltyRegistry_",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "royaltyRegistry",
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
const _bytecode = "0x608060405234801561001057600080fd5b5061285b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063a11b07121161005b578063a11b07121461011f578063c4d66de81461013f578063f2fde38b14610152578063f533b8021461016557600080fd5b806301ffc9a71461008d5780633e104014146100b5578063715018a6146100d65780638da5cb5b146100e0575b600080fd5b6100a061009b3660046121ab565b610178565b60405190151581526020015b60405180910390f35b6100c86100c336600461220f565b610211565b6040516100ac929190612244565b6100de61022f565b005b60335473ffffffffffffffffffffffffffffffffffffffff165b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ac565b6066546100fa9073ffffffffffffffffffffffffffffffffffffffff1681565b6100de61014d3660046122d5565b6102c1565b6100de6101603660046122d5565b610453565b6100c861017336600461220f565b610583565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fcb23f81600000000000000000000000000000000000000000000000000000000148061020b57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60608061021f858585610605565b5092989197509095505050505050565b60335473ffffffffffffffffffffffffffffffffffffffff1633146102b5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6102bf6000611d04565b565b600054610100900460ff16806102da575060005460ff16155b610366576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016102ac565b600054610100900460ff161580156103a557600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000166101011790555b6103ad611d7b565b6103d7827f880963ac00000000000000000000000000000000000000000000000000000000611e99565b6103e057600080fd5b606680547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416179055801561044f57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b5050565b60335473ffffffffffffffffffffffffffffffffffffffff1633146104d4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102ac565b73ffffffffffffffffffffffffffffffffffffffff8116610577576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016102ac565b61058081611d04565b50565b6060806000806000610596888888610605565b93985091965094509250905080156105fa5773ffffffffffffffffffffffffffffffffffffffff8216600090815260656020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00001661ffff85161790555b505050935093915050565b6066546040517fde5488af00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015260609283926000928392839291169063de5488af90602401602060405180830381865afa158015610680573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a491906122f2565b73ffffffffffffffffffffffffffffffffffffffff811660009081526065602052604081205460010b9450909250831380159061070457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600184900b135b156113665750600173ffffffffffffffffffffffffffffffffffffffff88167341a322b28d0ff354040e2cbc676f0320d8c8850d148061076d575073ffffffffffffffffffffffffffffffffffffffff881673b932a70a57673d89f4acffbe830e8ed7f75fb9e0145b156109c4576040517fb85ed7e400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff89166004820152602481018890527317b0c8564e53f22364a6c8de6f7ca5ce9bea4e5d9063b85ed7e490604401602060405180830381865afa925050508015610831575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261082e918101906122f2565b60015b61083a576109c4565b6040517f860110f500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a16600482015260248101899052604481018890527317b0c8564e53f22364a6c8de6f7ca5ce9bea4e5d9063860110f590606401602060405180830381865afa925050508015610900575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526108fd9181019061230f565b60015b610909576109c2565b60408051600180825281830190925290602080830190803683375050604080516001808252818301909252929950905060208083019080368337019050509550818760008151811061095d5761095d612357565b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505080866000815181106109ab576109ab612357565b60209081029190910101525060069350611cf99050565b505b6040517fbb3bafd60000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff83169063bb3bafd690602401600060405180830381865afa925050508015610a6e57506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610a6b91908101906124f1565b60015b610a7757610a9f565b8051825114610a8557600080fd5b81610a908983611ebc565b60019650965096505050611cf9565b6040517fcad96cca0000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff83169063cad96cca90602401600060405180830381865afa925050508015610b4957506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610b469190810190612555565b60015b610b5257610d66565b805167ffffffffffffffff811115610b6c57610b6c612328565b604051908082528060200260200182016040528015610b95578160200160208202803683370190505b509550805167ffffffffffffffff811115610bb257610bb2612328565b604051908082528060200260200182016040528015610bdb578160200160208202803683370190505b5094506000805b8251811015610cf057828181518110610bfd57610bfd612357565b602002602001015160000151888281518110610c1b57610c1b612357565b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050612710838281518110610c6a57610c6a612357565b6020026020010151602001516bffffffffffffffffffffffff168a610c8f919061265f565b610c99919061269c565b878281518110610cab57610cab612357565b602002602001018181525050868181518110610cc957610cc9612357565b602002602001015182610cdc91906126d7565b915080610ce8816126ef565b915050610be2565b50878110610d5a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f496e76616c696420726f79616c747920616d6f756e740000000000000000000060448201526064016102ac565b5060039350611cf99050565b6040517fb9c4d9fb0000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff83169063b9c4d9fb90602401600060405180830381865afa925050508015610e1057506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610e0d9190810190612728565b60015b610e1957610faa565b6040517fb9c4d9fb0000000000000000000000000000000000000000000000000000000081526004810189905273ffffffffffffffffffffffffffffffffffffffff84169063b9c4d9fb90602401600060405180830381865afa158015610e84573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610eca9190810190612728565b6040517f0ebd4c7f000000000000000000000000000000000000000000000000000000008152600481018a905290915073ffffffffffffffffffffffffffffffffffffffff841690630ebd4c7f90602401600060405180830381865afa925050508015610f7757506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610f749190810190612765565b60015b610f8057610fa8565b8051825114610f8e57600080fd5b81610f998983611ebc565b60029650965096505050611cf9565b505b6040517fd5a06d4c0000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff83169063d5a06d4c90602401600060405180830381865afa92505050801561105457506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261105191908101906124f1565b60015b61105d57611085565b805182511461106b57600080fd5b816110768983611ebc565b60049650965096505050611cf9565b6040517f2a55205a000000000000000000000000000000000000000000000000000000008152600481018890526024810187905273ffffffffffffffffffffffffffffffffffffffff831690632a55205a906044016040805180830381865afa925050508015611130575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261112d9181019061279a565b60015b6111395761125b565b8781106111a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f496e76616c696420726f79616c747920616d6f756e740000000000000000000060448201526064016102ac565b6040805160018082528183019092529060208083019080368337505060408051600180825281830190925292995090506020808301908036833701905050955081876000815181106111f6576111f6612357565b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808660008151811061124457611244612357565b60209081029190910101525060059350611cf99050565b6040517ff662207400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff89811660048301526024820189905283169063f662207490604401600060405180830381865afa92505050801561130d57506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261130a91908101906124f1565b60015b6113165761133e565b805182511461132457600080fd5b8161132f8983611ebc565b60079650965096505050611cf9565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9250611cf9565b506000600183900b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff141561139a57611cf9565b600183810b1415611483576040517fbb3bafd60000000000000000000000000000000000000000000000000000000081526004810188905260609073ffffffffffffffffffffffffffffffffffffffff84169063bb3bafd6906024015b600060405180830381865afa158015611414573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261145a91908101906124f1565b805182519298509092501461146e57600080fd5b856114798883611ebc565b9550955050611cf9565b600183900b60031415611755576040517fcad96cca0000000000000000000000000000000000000000000000000000000081526004810188905260609073ffffffffffffffffffffffffffffffffffffffff84169063cad96cca90602401600060405180830381865afa1580156114fe573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526115449190810190612555565b9050805167ffffffffffffffff81111561156057611560612328565b604051908082528060200260200182016040528015611589578160200160208202803683370190505b509550805167ffffffffffffffff8111156115a6576115a6612328565b6040519080825280602002602001820160405280156115cf578160200160208202803683370190505b5094506000805b82518110156116e4578281815181106115f1576115f1612357565b60200260200101516000015188828151811061160f5761160f612357565b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505061271083828151811061165e5761165e612357565b6020026020010151602001516bffffffffffffffffffffffff168a611683919061265f565b61168d919061269c565b87828151811061169f5761169f612357565b6020026020010181815250508681815181106116bd576116bd612357565b6020026020010151826116d091906126d7565b9150806116dc816126ef565b9150506115d6565b5087811061174e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f496e76616c696420726f79616c747920616d6f756e740000000000000000000060448201526064016102ac565b5050611cf9565b600183900b600214156118da576040517fb9c4d9fb0000000000000000000000000000000000000000000000000000000081526004810188905260609073ffffffffffffffffffffffffffffffffffffffff84169063b9c4d9fb90602401600060405180830381865afa1580156117d0573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526118169190810190612728565b6040517f0ebd4c7f000000000000000000000000000000000000000000000000000000008152600481018a905290965073ffffffffffffffffffffffffffffffffffffffff841690630ebd4c7f90602401600060405180830381865afa158015611884573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526118ca9190810190612765565b9050805186511461146e57600080fd5b600183900b6004141561193d576040517fd5a06d4c0000000000000000000000000000000000000000000000000000000081526004810188905260609073ffffffffffffffffffffffffffffffffffffffff84169063d5a06d4c906024016113f7565b600183900b60051415611b15576040517f2a55205a0000000000000000000000000000000000000000000000000000000081526004810188905260248101879052600090819073ffffffffffffffffffffffffffffffffffffffff851690632a55205a906044016040805180830381865afa1580156119c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119e4919061279a565b91509150878110611a51576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f496e76616c696420726f79616c747920616d6f756e740000000000000000000060448201526064016102ac565b60015b604051908082528060200260200182016040528015611a7d578160200160208202803683370190505b50604080516001808252818301909252919850602080830190803683370190505095508187600081518110611ab457611ab4612357565b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508086600081518110611b0257611b02612357565b6020026020010181815250505050611cf9565b600183900b60061415611c8d576040517fb85ed7e400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff89166004820152602481018890526000907317b0c8564e53f22364a6c8de6f7ca5ce9bea4e5d9063b85ed7e490604401602060405180830381865afa158015611baa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bce91906122f2565b6040517f860110f500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8b166004820152602481018a9052604481018990529091506000907317b0c8564e53f22364a6c8de6f7ca5ce9bea4e5d9063860110f590606401602060405180830381865afa158015611c60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c84919061230f565b90506001611a54565b600183900b60071415611cf9576040517ff662207400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8981166004830152602482018990526060919084169063f6622074906044016113f7565b939792965093509350565b6033805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff1680611d94575060005460ff16155b611e20576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016102ac565b600054610100900460ff16158015611e5f57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000166101011790555b611e6833611d04565b801561058057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b6000611ea48361200b565b8015611eb55750611eb5838361206f565b9392505050565b6060815167ffffffffffffffff811115611ed857611ed8612328565b604051908082528060200260200182016040528015611f01578160200160208202803683370190505b5090506000805b8351811015611f9a57612710848281518110611f2657611f26612357565b602002602001015186611f39919061265f565b611f43919061269c565b838281518110611f5557611f55612357565b602002602001018181525050828181518110611f7357611f73612357565b602002602001015182611f8691906126d7565b915080611f92816126ef565b915050611f08565b50838110612004576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f496e76616c696420726f79616c747920616d6f756e740000000000000000000060448201526064016102ac565b5092915050565b6000612037827f01ffc9a70000000000000000000000000000000000000000000000000000000061206f565b801561020b5750612068827fffffffff0000000000000000000000000000000000000000000000000000000061206f565b1592915050565b604080517fffffffff00000000000000000000000000000000000000000000000000000000831660248083019190915282518083039091018152604490910182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f01ffc9a7000000000000000000000000000000000000000000000000000000001790529051600091908290819073ffffffffffffffffffffffffffffffffffffffff871690617530906121299086906127c8565b6000604051808303818686fa925050503d8060008114612165576040519150601f19603f3d011682016040523d82523d6000602084013e61216a565b606091505b5091509150602081511015612185576000935050505061020b565b8180156121a15750808060200190518101906121a19190612803565b9695505050505050565b6000602082840312156121bd57600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114611eb557600080fd5b73ffffffffffffffffffffffffffffffffffffffff8116811461058057600080fd5b60008060006060848603121561222457600080fd5b833561222f816121ed565b95602085013595506040909401359392505050565b604080825283519082018190526000906020906060840190828701845b8281101561229357815173ffffffffffffffffffffffffffffffffffffffff1684529284019290840190600101612261565b5050508381038285015284518082528583019183019060005b818110156122c8578351835292840192918401916001016122ac565b5090979650505050505050565b6000602082840312156122e757600080fd5b8135611eb5816121ed565b60006020828403121561230457600080fd5b8151611eb5816121ed565b60006020828403121561232157600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6040805190810167ffffffffffffffff811182821017156123a9576123a9612328565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156123f6576123f6612328565b604052919050565b600067ffffffffffffffff82111561241857612418612328565b5060051b60200190565b600082601f83011261243357600080fd5b81516020612448612443836123fe565b6123af565b82815260059290921b8401810191818101908684111561246757600080fd5b8286015b8481101561248b57805161247e816121ed565b835291830191830161246b565b509695505050505050565b600082601f8301126124a757600080fd5b815160206124b7612443836123fe565b82815260059290921b840181019181810190868411156124d657600080fd5b8286015b8481101561248b57805183529183019183016124da565b6000806040838503121561250457600080fd5b825167ffffffffffffffff8082111561251c57600080fd5b61252886838701612422565b9350602085015191508082111561253e57600080fd5b5061254b85828601612496565b9150509250929050565b6000602080838503121561256857600080fd5b825167ffffffffffffffff81111561257f57600080fd5b8301601f8101851361259057600080fd5b805161259e612443826123fe565b81815260069190911b820183019083810190878311156125bd57600080fd5b928401925b8284101561262557604084890312156125db5760008081fd5b6125e3612386565b84516125ee816121ed565b8152848601516bffffffffffffffffffffffff8116811461260f5760008081fd5b81870152825260409390930192908401906125c2565b979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561269757612697612630565b500290565b6000826126d2577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082198211156126ea576126ea612630565b500190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561272157612721612630565b5060010190565b60006020828403121561273a57600080fd5b815167ffffffffffffffff81111561275157600080fd5b61275d84828501612422565b949350505050565b60006020828403121561277757600080fd5b815167ffffffffffffffff81111561278e57600080fd5b61275d84828501612496565b600080604083850312156127ad57600080fd5b82516127b8816121ed565b6020939093015192949293505050565b6000825160005b818110156127e957602081860181015185830152016127cf565b818111156127f8576000828501525b509190910192915050565b60006020828403121561281557600080fd5b81518015158114611eb557600080fdfea2646970667358221220d89e27ee3da511632978c9021b9b62f7b77856eb78820bd3cf513a53d603de3964736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class RoyaltyEngineV1__factory extends ethers_1.ContractFactory {
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
exports.RoyaltyEngineV1__factory = RoyaltyEngineV1__factory;
RoyaltyEngineV1__factory.bytecode = _bytecode;
RoyaltyEngineV1__factory.abi = _abi;
//# sourceMappingURL=RoyaltyEngineV1__factory.js.map