"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModuleV2__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_erc1155TransferHelper",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_tokenContract",
                type: "address",
            },
            {
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "_tokenIds",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "_amounts",
                type: "uint256[]",
            },
        ],
        name: "batchDepositERC1155",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_tokenContract",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "_tokenIds",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "_amounts",
                type: "uint256[]",
            },
        ],
        name: "batchWithdrawERC1155",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_tokenContract",
                type: "address",
            },
            {
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "depositERC1155",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
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
        inputs: [
            {
                internalType: "address",
                name: "_tokenContract",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "withdrawERC1155",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5060405161097538038061097583398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6108e2806100936000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063a0edb48b1161005b578063a0edb48b146100d2578063bc197c81146100e5578063c1cd4fa91461014e578063f23a6e611461016157600080fd5b806301ffc9a71461008257806308c875d6146100aa57806330f60984146100bf575b600080fd5b61009561009036600461042c565b610199565b60405190151581526020015b60405180910390f35b6100bd6100b836600461059c565b610232565b005b6100bd6100cd366004610621565b6102c8565b6100bd6100e0366004610621565b61034b565b61011d6100f33660046106f1565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100a1565b6100bd61015c36600461059c565b6103ce565b61011d61016f36600461079b565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000148061022c57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6000546040517f7ee7f69b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690637ee7f69b90610290908790309088908890889060040161083b565b600060405180830381600087803b1580156102aa57600080fd5b505af11580156102be573d6000803e3d6000fd5b5050505050505050565b600080546040517feb46c45b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff87811660048301528681166024830152306044830152606482018690526084820185905260c060a483015260c482019390935291169063eb46c45b9060e401610290565b600080546040517feb46c45b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff87811660048301523060248301528681166044830152606482018690526084820185905260c060a483015260c482019390935291169063eb46c45b9060e401610290565b6000546040517f7ee7f69b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690637ee7f69b90610290908790879030908890889060040161083b565b60006020828403121561043e57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461046e57600080fd5b9392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461049957600080fd5b919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156105145761051461049e565b604052919050565b600082601f83011261052d57600080fd5b8135602067ffffffffffffffff8211156105495761054961049e565b8160051b6105588282016104cd565b928352848101820192828101908785111561057257600080fd5b83870192505b8483101561059157823582529183019190830190610578565b979650505050505050565b600080600080608085870312156105b257600080fd5b6105bb85610475565b93506105c960208601610475565b9250604085013567ffffffffffffffff808211156105e657600080fd5b6105f28883890161051c565b9350606087013591508082111561060857600080fd5b506106158782880161051c565b91505092959194509250565b6000806000806080858703121561063757600080fd5b61064085610475565b935061064e60208601610475565b93969395505050506040820135916060013590565b600082601f83011261067457600080fd5b813567ffffffffffffffff81111561068e5761068e61049e565b6106bf60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016104cd565b8181528460208386010111156106d457600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561070957600080fd5b61071286610475565b945061072060208701610475565b9350604086013567ffffffffffffffff8082111561073d57600080fd5b61074989838a0161051c565b9450606088013591508082111561075f57600080fd5b61076b89838a0161051c565b9350608088013591508082111561078157600080fd5b5061078e88828901610663565b9150509295509295909350565b600080600080600060a086880312156107b357600080fd5b6107bc86610475565b94506107ca60208701610475565b93506040860135925060608601359150608086013567ffffffffffffffff8111156107f457600080fd5b61078e88828901610663565b600081518084526020808501945080840160005b8381101561083057815187529582019590820190600101610814565b509495945050505050565b600073ffffffffffffffffffffffffffffffffffffffff8088168352808716602084015280861660408401525060c0606083015261087c60c0830185610800565b828103608084015261088e8185610800565b83810360a0909401939093525050600081526020019594505050505056fea2646970667358221220c20f00ca6bd9faed1498accf2d1af86debb97404ffa8d4f213aa38588f55a0fe64736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class TestModuleV2__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_erc1155TransferHelper, overrides) {
        return super.deploy(_erc1155TransferHelper, overrides || {});
    }
    getDeployTransaction(_erc1155TransferHelper, overrides) {
        return super.getDeployTransaction(_erc1155TransferHelper, overrides || {});
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
exports.TestModuleV2__factory = TestModuleV2__factory;
TestModuleV2__factory.bytecode = _bytecode;
TestModuleV2__factory.abi = _abi;
//# sourceMappingURL=TestModuleV2__factory.js.map