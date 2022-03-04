import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestEIP2981ERC721, TestEIP2981ERC721Interface } from "../TestEIP2981ERC721";
declare type TestEIP2981ERC721ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestEIP2981ERC721__factory extends ContractFactory {
    constructor(...args: TestEIP2981ERC721ConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TestEIP2981ERC721>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TestEIP2981ERC721;
    connect(signer: Signer): TestEIP2981ERC721__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b506040805180820182526011815270546573744549503239383145524337323160781b60208083019182528351808501909452600b84526a544553544549503239383160a81b9084015281519192916200006e916000916200009f565b508051620000849060019060208401906200009f565b5050600680546001600160a01b031916331790555062000182565b828054620000ad9062000145565b90600052602060002090601f016020900481019282620000d157600085556200011c565b82601f10620000ec57805160ff19168380011785556200011c565b828001600101855582156200011c579182015b828111156200011c578251825591602001919060010190620000ff565b506200012a9291506200012e565b5090565b5b808211156200012a57600081556001016200012f565b600181811c908216806200015a57607f821691505b602082108114156200017c57634e487b7160e01b600052602260045260246000fd5b50919050565b611cb780620001926000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806342842e0e11610097578063a22cb46511610066578063a22cb46514610238578063b88d4fde1461024b578063c87b56dd1461025e578063e985e9c51461027157600080fd5b806342842e0e146101e95780636352211e146101fc57806370a082311461020f57806395d89b411461023057600080fd5b8063095ea7b3116100d3578063095ea7b31461016f57806323b872dd146101845780632a55205a1461019757806340c10f19146101d657600080fd5b806301ffc9a7146100fa57806306fdde0314610122578063081812fc14610137575b600080fd5b61010d610108366004611758565b6102ba565b60405190151581526020015b60405180910390f35b61012a610316565b60405161011991906117eb565b61014a6101453660046117fe565b6103a8565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610119565b61018261017d366004611840565b610487565b005b61018261019236600461186a565b610614565b6101aa6101a53660046118a6565b6106b5565b6040805173ffffffffffffffffffffffffffffffffffffffff9093168352602083019190915201610119565b6101826101e4366004611840565b6106e9565b6101826101f736600461186a565b6106f7565b61014a61020a3660046117fe565b610712565b61022261021d3660046118c8565b6107c4565b604051908152602001610119565b61012a610892565b6101826102463660046118e3565b6108a1565b61018261025936600461194e565b6109b8565b61012a61026c3660046117fe565b610a60565b61010d61027f366004611a48565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f2a55205a000000000000000000000000000000000000000000000000000000001480610310575061031082610b7d565b92915050565b60606000805461032590611a7b565b80601f016020809104026020016040519081016040528092919081815260200182805461035190611a7b565b801561039e5780601f106103735761010080835404028352916020019161039e565b820191906000526020600020905b81548152906001019060200180831161038157829003601f168201915b5050505050905090565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1661045e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061049282610712565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610550576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610455565b3373ffffffffffffffffffffffffffffffffffffffff821614806105795750610579813361027f565b610605576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610455565b61060f8383610c60565b505050565b61061e3382610d00565b6106aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610455565b61060f838383610e70565b600654600090819073ffffffffffffffffffffffffffffffffffffffff166106de8460026110d7565b915091509250929050565b6106f382826110e3565b5050565b61060f838383604051806020016040528060008152506109b8565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610310576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e00000000000000000000000000000000000000000000006064820152608401610455565b600073ffffffffffffffffffffffffffffffffffffffff8216610869576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610455565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b60606001805461032590611a7b565b73ffffffffffffffffffffffffffffffffffffffff8216331415610921576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610455565b33600081815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6109c23383610d00565b610a4e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610455565b610a5a848484846110fd565b50505050565b60008181526002602052604090205460609073ffffffffffffffffffffffffffffffffffffffff16610b14576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610455565b6000610b2b60408051602081019091526000815290565b90506000815111610b4b5760405180602001604052806000815250610b76565b80610b55846111a0565b604051602001610b66929190611acf565b6040516020818303038152906040525b9392505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd000000000000000000000000000000000000000000000000000000001480610c1057507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061031057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614610310565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84169081179091558190610cba82610712565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16610db1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e00000000000000000000000000000000000000006064820152608401610455565b6000610dbc83610712565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610e2b57508373ffffffffffffffffffffffffffffffffffffffff16610e13846103a8565b73ffffffffffffffffffffffffffffffffffffffff16145b80610e68575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16610e9082610712565b73ffffffffffffffffffffffffffffffffffffffff1614610f33576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e00000000000000000000000000000000000000000000006064820152608401610455565b73ffffffffffffffffffffffffffffffffffffffff8216610fd5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610455565b610fe0600082610c60565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805460019290611016908490611b2d565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260408120805460019290611051908490611b44565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000610b768284611b8b565b6106f38282604051806020016040528060008152506112d2565b611108848484610e70565b61111484848484611375565b610a5a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610455565b6060816111e057505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b811561120a57806111f481611b9f565b91506112039050600a83611b8b565b91506111e4565b60008167ffffffffffffffff8111156112255761122561191f565b6040519080825280601f01601f19166020018201604052801561124f576020820181803683370190505b5090505b8415610e6857611264600183611b2d565b9150611271600a86611bd8565b61127c906030611b44565b60f81b81838151811061129157611291611bec565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506112cb600a86611b8b565b9450611253565b6112dc8383611565565b6112e96000848484611375565b61060f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610455565b600073ffffffffffffffffffffffffffffffffffffffff84163b1561155a576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a02906113ec903390899088908890600401611c1b565b6020604051808303816000875af1925050508015611445575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261144291810190611c64565b60015b61150f573d808015611473576040519150601f19603f3d011682016040523d82523d6000602084013e611478565b606091505b508051611507576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610455565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610e68565b506001949350505050565b73ffffffffffffffffffffffffffffffffffffffff82166115e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610455565b60008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff161561166e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610455565b73ffffffffffffffffffffffffffffffffffffffff821660009081526003602052604081208054600192906116a4908490611b44565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461175557600080fd5b50565b60006020828403121561176a57600080fd5b8135610b7681611727565b60005b83811015611790578181015183820152602001611778565b83811115610a5a5750506000910152565b600081518084526117b9816020860160208601611775565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610b7660208301846117a1565b60006020828403121561181057600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461183b57600080fd5b919050565b6000806040838503121561185357600080fd5b61185c83611817565b946020939093013593505050565b60008060006060848603121561187f57600080fd5b61188884611817565b925061189660208501611817565b9150604084013590509250925092565b600080604083850312156118b957600080fd5b50508035926020909101359150565b6000602082840312156118da57600080fd5b610b7682611817565b600080604083850312156118f657600080fd5b6118ff83611817565b91506020830135801515811461191457600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561196457600080fd5b61196d85611817565b935061197b60208601611817565b925060408501359150606085013567ffffffffffffffff8082111561199f57600080fd5b818701915087601f8301126119b357600080fd5b8135818111156119c5576119c561191f565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715611a0b57611a0b61191f565b816040528281528a6020848701011115611a2457600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215611a5b57600080fd5b611a6483611817565b9150611a7260208401611817565b90509250929050565b600181811c90821680611a8f57607f821691505b60208210811415611ac9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60008351611ae1818460208801611775565b835190830190611af5818360208801611775565b01949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015611b3f57611b3f611afe565b500390565b60008219821115611b5757611b57611afe565b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082611b9a57611b9a611b5c565b500490565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611bd157611bd1611afe565b5060010190565b600082611be757611be7611b5c565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152611c5a60808301846117a1565b9695505050505050565b600060208284031215611c7657600080fd5b8151610b768161172756fea264697066735822122001c74132954f91ca363f03592a0b06941ef6c0160bd7de1802df186d95f7448e64736f6c634300080a0033";
    static readonly abi: ({
        inputs: any[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): TestEIP2981ERC721Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestEIP2981ERC721;
}
export {};
