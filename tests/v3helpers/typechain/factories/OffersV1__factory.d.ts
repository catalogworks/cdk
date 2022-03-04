import {Signer, ContractFactory, Overrides} from 'ethers';
import {Provider, TransactionRequest} from '@ethersproject/providers';
import type {OffersV1, OffersV1Interface} from '../OffersV1';
declare type OffersV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class OffersV1__factory extends ContractFactory {
  constructor(...args: OffersV1ConstructorParams);
  deploy(
    _erc20TransferHelper: string,
    _erc721TransferHelper: string,
    _royaltyEngine: string,
    _protocolFeeSettings: string,
    _wethAddress: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<OffersV1>;
  getDeployTransaction(
    _erc20TransferHelper: string,
    _erc721TransferHelper: string,
    _royaltyEngine: string,
    _protocolFeeSettings: string,
    _wethAddress: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): TransactionRequest;
  attach(address: string): OffersV1;
  connect(signer: Signer): OffersV1__factory;
  static readonly bytecode =
    '0x61012060405260016000553480156200001757600080fd5b5060405162002fb338038062002fb38339810160408190526200003a9162000251565b6040518060400160405280600c81526020016b04f66666572733a2076312e360a41b815250838383876001600160a01b031663e3e606f06040518163ffffffff1660e01b8152600401602060405180830381865afa158015620000a1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000c79190620002d1565b6001600160a01b0316632b20e3976040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000105573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200012b9190620002d1565b6001600160a01b038a811660805291821660a052600180546001600160a01b0319169483169490941790935590811660c0521660e05280516200017690600290602084019062000192565b5050506001600160a01b03909216610100525062000335915050565b828054620001a090620002f8565b90600052602060002090601f016020900481019282620001c457600085556200020f565b82601f10620001df57805160ff19168380011785556200020f565b828001600101855582156200020f579182015b828111156200020f578251825591602001919060010190620001f2565b506200021d92915062000221565b5090565b5b808211156200021d576000815560010162000222565b6001600160a01b03811681146200024e57600080fd5b50565b600080600080600060a086880312156200026a57600080fd5b8551620002778162000238565b60208701519095506200028a8162000238565b60408701519094506200029d8162000238565b6060870151909350620002b08162000238565b6080870151909250620002c38162000238565b809150509295509295909350565b600060208284031215620002e457600080fd5b8151620002f18162000238565b9392505050565b600181811c908216806200030d57607f821691505b602082108114156200032f57634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a05160c05160e05161010051612c166200039d600039600081816103450152610cdd01526000818161015a01526111f3015260008181611ede0152611f8201526000818161194501526119dd0152600081816101e60152611bd30152612c166000f3fe6080604052600436106100d25760003560e01c80638f9d32511161007f578063cec44ea511610059578063cec44ea51461023b578063e3b436771461024e578063ebe4634414610313578063f7cd1d9b1461033357600080fd5b80638f9d3251146101d45780639128c22c14610208578063b249bb301461021b57600080fd5b80632b20e397116100b05780632b20e397146101485780633f01d5e3146101a15780634b3bdf1d146101b457600080fd5b806306fdde03146100d75780631115c24d146101025780631acb44f614610126575b600080fd5b3480156100e357600080fd5b506100ec610367565b6040516100f99190612508565b60405180910390f35b34801561010e57600080fd5b5061011860035481565b6040519081526020016100f9565b34801561013257600080fd5b5061014661014136600461257e565b6103f5565b005b34801561015457600080fd5b5061017c7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100f9565b6101466101af3660046125b3565b610630565b3480156101c057600080fd5b506101466101cf3660046125ee565b610907565b3480156101e057600080fd5b5061017c7f000000000000000000000000000000000000000000000000000000000000000081565b6101186102163660046125ee565b610ec9565b34801561022757600080fd5b50610146610236366004612638565b6111db565b610118610249366004612665565b61139d565b34801561025a57600080fd5b506102d261026936600461257e565b600460209081526000938452604080852082529284528284209052825290208054600182015460029092015473ffffffffffffffffffffffffffffffffffffffff918216929182169174010000000000000000000000000000000000000000900461ffff169084565b6040805173ffffffffffffffffffffffffffffffffffffffff958616815294909316602085015261ffff9091169183019190915260608201526080016100f9565b34801561031f57600080fd5b5061011861032e36600461257e565b61178f565b34801561033f57600080fd5b5061017c7f000000000000000000000000000000000000000000000000000000000000000081565b60028054610374906126c4565b80601f01602080910402602001604051908101604052809291908181526020018280546103a0906126c4565b80156103ed5780601f106103c2576101008083540402835291602001916103ed565b820191906000526020600020905b8154815290600101906020018083116103d057829003601f168201915b505050505081565b600054600114610466576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f5245454e5452414e43590000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6002600090815573ffffffffffffffffffffffffffffffffffffffff80851682526004602090815260408084208685528252808420600354855290915290912080549091163314610513576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f63616e63656c4e46544f66666572206d7573742062652073656c6c6572000000604482015260640161045d565b8054600282015460018301546105459273ffffffffffffffffffffffffffffffffffffffff90811692911660006117cd565b81838573ffffffffffffffffffffffffffffffffffffffff167f32e399f4cc156dd2225c5092e2a44de7d11bb16b5bcec2bb4d44f424dd09eda68460405161058d9190612718565b60405180910390a4505073ffffffffffffffffffffffffffffffffffffffff90911660009081526004602090815260408083209383529281528282206003548352905290812080547fffffffffffffffffffffffff0000000000000000000000000000000000000000168155600180820180547fffffffffffffffffffff0000000000000000000000000000000000000000000016905560029091018290559055565b60005460011461069c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f5245454e5452414e435900000000000000000000000000000000000000000000604482015260640161045d565b6002600090815573ffffffffffffffffffffffffffffffffffffffff80861682526004602090815260408084208785528252808420600354855290915290912080549091163314610749576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f7365744e46544f66666572416d6f756e74206d7573742062652073656c6c6572604482015260640161045d565b811580159061075c575080600201548214155b6107e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f7365744e46544f66666572416d6f756e74205f616d6f756e742063616e6e6f7460448201527f2062652030206f722070726576696f757320616d6f756e740000000000000000606482015260840161045d565b60028101548083111561084a5760006108018285612791565b600184015490915061082a90829073ffffffffffffffffffffffffffffffffffffffff16611a36565b8083600201600082825461083e91906127a8565b909155506108aa915050565b808310156108aa57600061085e8483612791565b8354600185015491925061088f9173ffffffffffffffffffffffffffffffffffffffff9182169184911660006117cd565b808360020160008282546108a39190612791565b9091555050505b83858773ffffffffffffffffffffffffffffffffffffffff167fe835727d6891ca2b512ebf90318d2d045fd09831b2d4f3a0f7616e032cbb7774856040516108f29190612718565b60405180910390a45050600160005550505050565b600054600114610973576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f5245454e5452414e435900000000000000000000000000000000000000000000604482015260640161045d565b6002600090815573ffffffffffffffffffffffffffffffffffffffff8086168252600460209081526040808420878552825280842060035485529091529091208054909116610a44576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f66696c6c4e46544f66666572206d75737420626520616374697665206f66666560448201527f7200000000000000000000000000000000000000000000000000000000000000606482015260840161045d565b6040517f6352211e0000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff861690636352211e90602401602060405180830381865afa158015610aaf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad391906127c0565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b67576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f66696c6c4e46544f66666572206d75737420626520746f6b656e206f776e6572604482015260640161045d565b60028101546001820154600091610b98918891889173ffffffffffffffffffffffffffffffffffffffff1685611d89565b506001830154909150610bc290829073ffffffffffffffffffffffffffffffffffffffff16611e8f565b905073ffffffffffffffffffffffffffffffffffffffff831615610c5757600182015460009061271090610c129074010000000000000000000000000000000000000000900461ffff16846127dd565b610c1c919061281a565b6001840154909150610c49908590839073ffffffffffffffffffffffffffffffffffffffff1660006117cd565b610c538183612791565b9150505b6001820154610c81903390839073ffffffffffffffffffffffffffffffffffffffff1660006117cd565b81546040517f15dacbea00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff88811660048301523360248301529182166044820152606481018790527f0000000000000000000000000000000000000000000000000000000000000000909116906315dacbea90608401600060405180830381600087803b158015610d2357600080fd5b505af1158015610d37573d6000803e3d6000fd5b5050604080516060808201835260018088015473ffffffffffffffffffffffffffffffffffffffff9081168452600060208086019190915260028a015485870152855193840186528d8216845283018c90528285019190915287549351929550909350339216907f1f432c9454edd444f55492be01e3fa82aa88bfa28e120a039be204253c10c36e90610dcd9086908690612855565b60405180910390a385878973ffffffffffffffffffffffffffffffffffffffff167f5f521a0068abdd85ee2400ea3bd2cefb717a316b70f3731a002db482aa6eab9a338989604051610e21939291906128bd565b60405180910390a450505073ffffffffffffffffffffffffffffffffffffffff90941660009081526004602090815260408083209583529481528482206003548352905292832080547fffffffffffffffffffffffff0000000000000000000000000000000000000000168155600180820180547fffffffffffffffffffff000000000000000000000000000000000000000000001690556002909101849055909255505050565b6000333014610f5a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f5f68616e646c65526f79616c7479456e67696e655061796f7574206f6e6c792060448201527f73656c662063616c6c61626c6500000000000000000000000000000000000000606482015260840161045d565b6001546040517ff533b80200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff87811660048301526024820187905260448201869052859260009283929091169063f533b802906064016000604051808303816000875af1158015610fe1573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526110279190810190612a22565b9150915060005b82518110156111cc5781818151811061104957611049612ae7565b60200260200101518410156110ba576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f696e736f6c76656e740000000000000000000000000000000000000000000000604482015260640161045d565b6110f98382815181106110cf576110cf612ae7565b60200260200101518383815181106110e9576110e9612ae7565b60200260200101518860006117cd565b82818151811061110b5761110b612ae7565b602002602001015173ffffffffffffffffffffffffffffffffffffffff16888a73ffffffffffffffffffffffffffffffffffffffff167f866e6ef8682ddf5f1025e64dfdb45527077f7be70fa9ef680b7ffd8cf4ab9c5085858151811061117457611174612ae7565b602002602001015160405161118b91815260200190565b60405180910390a48181815181106111a5576111a5612ae7565b6020026020010151846111b89190612791565b9350806111c481612b16565b91505061102e565b5091925050505b949350505050565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146112a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f736574526f79616c7479456e67696e6541646472657373206f6e6c792072656760448201527f6973747261720000000000000000000000000000000000000000000000000000606482015260840161045d565b6112ca817fcb23f8160000000000000000000000000000000000000000000000000000000061202f565b611356576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f736574526f79616c7479456e67696e6541646472657373206d757374206d617460448201527f63682049526f79616c7479456e67696e65563120696e74657266616365000000606482015260840161045d565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000805460011461140a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f5245454e5452414e435900000000000000000000000000000000000000000000604482015260640161045d565b60026000556040517f6352211e00000000000000000000000000000000000000000000000000000000815260048101869052339073ffffffffffffffffffffffffffffffffffffffff881690636352211e90602401602060405180830381865afa15801561147c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a091906127c0565b73ffffffffffffffffffffffffffffffffffffffff161415611544576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f6372656174654e46544f666665722063616e6e6f7420706c616365206f66666560448201527f72206f6e206f776e204e46540000000000000000000000000000000000000000606482015260840161045d565b6127108261ffff161115611600576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604260248201527f6372656174654e46544f666665722066696e646572732066656520627073206d60448201527f757374206265206c657373207468616e206f7220657175616c20746f2031303060648201527f3030000000000000000000000000000000000000000000000000000000000000608482015260a40161045d565b61160a8484611a36565b6003805490600061161a83612b16565b90915550506040805160808101825233815273ffffffffffffffffffffffffffffffffffffffff858116602080840191825261ffff808816858701908152606086018b81528d86166000818152600486528981208f825286528981206003805483528188528b83209a518b54908b167fffffffffffffffffffffffff0000000000000000000000000000000000000000909116178b5597516001808c018054975190981674010000000000000000000000000000000000000000027fffffffffffffffffffff0000000000000000000000000000000000000000000090971691909a1617949094179094559051600290970196909655858252600583528682208c83528352868220845481549687018255908352838320909501949094559154808352929052839020925190928892917f3802beeb639437f37af00bc38581d4d786f4850ac8f946952d32e8aade9d5c619161177591612718565b60405180910390a450600354600160005595945050505050565b600560205282600052604060002060205281600052604060002081815481106117b757600080fd5b9060005260206000200160009250925050505481565b8215806117ee575073ffffffffffffffffffffffffffffffffffffffff8416155b156117f857611a30565b73ffffffffffffffffffffffffffffffffffffffff8216611a0f57824710156118a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f5f68616e646c654f7574676f696e675472616e7366657220696e736f6c76656e60448201527f7400000000000000000000000000000000000000000000000000000000000000606482015260840161045d565b60008115806118b157505a82115b6118bb57816118bd565b5a5b604080516000808252602082019283905292935073ffffffffffffffffffffffffffffffffffffffff881691849188916118f79190612b4f565b600060405180830381858888f193505050503d8060008114611935576040519150601f19603f3d011682016040523d82523d6000602084013e61193a565b606091505b5050905080611a08577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0866040518263ffffffff1660e01b81526004016000604051808303818588803b1580156119ab57600080fd5b505af11580156119bf573d6000803e3d6000fd5b50611a0893505073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016915088905087612052565b5050611a30565b611a3073ffffffffffffffffffffffffffffffffffffffff83168585612052565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8116611ae55781341015611ae1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f5f68616e646c65496e636f6d696e675472616e73666572206d73672076616c7560448201527f65206c657373207468616e20657870656374656420616d6f756e740000000000606482015260840161045d565b5050565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819060009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa158015611b54573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b789190612b6b565b6040517fd9fc4b6100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152336024830152306044830152606482018790529192507f00000000000000000000000000000000000000000000000000000000000000009091169063d9fc4b6190608401600060405180830381600087803b158015611c1957600080fd5b505af1158015611c2d573d6000803e3d6000fd5b50506040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000925073ffffffffffffffffffffffffffffffffffffffff851691506370a0823190602401602060405180830381865afa158015611c9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc29190612b6b565b905080611ccf86846127a8565b14611d82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604c60248201527f5f68616e646c65496e636f6d696e675472616e7366657220746f6b656e20747260448201527f616e736665722063616c6c20646964206e6f74207472616e736665722065787060648201527f656374656420616d6f756e740000000000000000000000000000000000000000608482015260a40161045d565b5050505050565b60008080831580611d9957505a84115b611da35783611da5565b5a5b6040517f9128c22c00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff808b166004830152602482018a905260448201899052871660648201529091503090639128c22c90839060840160206040518083038160008887f193505050508015611e67575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611e6491810190612b6b565b60015b611e78578560009250925050611e85565b925060019150611e859050565b9550959350505050565b6040517f61b485f600000000000000000000000000000000000000000000000000000000815230600482015260248101839052600090819073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906361b485f690604401602060405180830381865afa158015611f25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f499190612b6b565b90508015612024576040517f86ab6fb90000000000000000000000000000000000000000000000000000000081523060048201526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906386ab6fb9906024016040805180830381865afa158015611fdd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120019190612b84565b91505061201181838660006117cd565b61201b8286612791565b92505050612029565b839150505b92915050565b600061203a836120e4565b801561204b575061204b8383612148565b9392505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001790526120df908490612284565b505050565b6000612110827f01ffc9a700000000000000000000000000000000000000000000000000000000612148565b80156120295750612141827fffffffff00000000000000000000000000000000000000000000000000000000612148565b1592915050565b604080517fffffffff00000000000000000000000000000000000000000000000000000000831660248083019190915282518083039091018152604490910182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f01ffc9a7000000000000000000000000000000000000000000000000000000001790529051600091908290819073ffffffffffffffffffffffffffffffffffffffff87169061753090612202908690612b4f565b6000604051808303818686fa925050503d806000811461223e576040519150601f19603f3d011682016040523d82523d6000602084013e612243565b606091505b509150915060208151101561225e5760009350505050612029565b81801561227a57508080602001905181019061227a9190612bbe565b9695505050505050565b60006122e6826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166123909092919063ffffffff16565b8051909150156120df57808060200190518101906123049190612bbe565b6120df576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161045d565b60606111d3848460008585843b612403576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161045d565b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161242c9190612b4f565b60006040518083038185875af1925050503d8060008114612469576040519150601f19603f3d011682016040523d82523d6000602084013e61246e565b606091505b509150915061247e828286612489565b979650505050505050565b6060831561249857508161204b565b8251156124a85782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045d9190612508565b60005b838110156124f75781810151838201526020016124df565b83811115611a305750506000910152565b60208152600082518060208401526125278160408501602087016124dc565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b73ffffffffffffffffffffffffffffffffffffffff8116811461257b57600080fd5b50565b60008060006060848603121561259357600080fd5b833561259e81612559565b95602085013595506040909401359392505050565b600080600080608085870312156125c957600080fd5b84356125d481612559565b966020860135965060408601359560600135945092505050565b6000806000806080858703121561260457600080fd5b843561260f81612559565b93506020850135925060408501359150606085013561262d81612559565b939692955090935050565b60006020828403121561264a57600080fd5b813561204b81612559565b61ffff8116811461257b57600080fd5b600080600080600060a0868803121561267d57600080fd5b853561268881612559565b9450602086013593506040860135925060608601356126a681612559565b915060808601356126b681612655565b809150509295509295909350565b600181811c908216806126d857607f821691505b60208210811415612712577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b608081016120298284805473ffffffffffffffffffffffffffffffffffffffff90811683526001820154908116602084015260a01c61ffff16604083015260020154606090910152565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000828210156127a3576127a3612762565b500390565b600082198211156127bb576127bb612762565b500190565b6000602082840312156127d257600080fd5b815161204b81612559565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561281557612815612762565b500290565b600082612850577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b825173ffffffffffffffffffffffffffffffffffffffff168152602080840151908201526040808401519082015260c08101825173ffffffffffffffffffffffffffffffffffffffff16606083015260208301516080830152604083015160a083015261204b565b73ffffffffffffffffffffffffffffffffffffffff848116825283811660208301528254811660408301526001830154908116606083015261ffff60a091821c16608083015260028301549082015260c081016111d3565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561298b5761298b612915565b604052919050565b600067ffffffffffffffff8211156129ad576129ad612915565b5060051b60200190565b600082601f8301126129c857600080fd5b815160206129dd6129d883612993565b612944565b82815260059290921b840181019181810190868411156129fc57600080fd5b8286015b84811015612a175780518352918301918301612a00565b509695505050505050565b60008060408385031215612a3557600080fd5b825167ffffffffffffffff80821115612a4d57600080fd5b818501915085601f830112612a6157600080fd5b81516020612a716129d883612993565b82815260059290921b84018101918181019089841115612a9057600080fd5b948201945b83861015612ab7578551612aa881612559565b82529482019490820190612a95565b91880151919650909350505080821115612ad057600080fd5b50612add858286016129b7565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612b4857612b48612762565b5060010190565b60008251612b618184602087016124dc565b9190910192915050565b600060208284031215612b7d57600080fd5b5051919050565b60008060408385031215612b9757600080fd5b8251612ba281612655565b6020840151909250612bb381612559565b809150509250929050565b600060208284031215612bd057600080fd5b8151801515811461204b57600080fdfea2646970667358221220c42549919e680d290a968a88e9fee4a7b9f18ebaf5b3bbe1d47c8b77826c1d8b64736f6c634300080a0033';
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: (
          | {
              indexed: boolean;
              internalType: string;
              name: string;
              type: string;
              components?: undefined;
            }
          | {
              components: {
                internalType: string;
                name: string;
                type: string;
              }[];
              indexed: boolean;
              internalType: string;
              name: string;
              type: string;
            }
        )[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
      }
    | {
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
      }
  )[];
  static createInterface(): OffersV1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OffersV1;
}
export {};
