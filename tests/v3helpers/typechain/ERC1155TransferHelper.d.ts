import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ERC1155TransferHelperInterface extends ethers.utils.Interface {
    functions: {
        "ZMM()": FunctionFragment;
        "isModuleApproved(address)": FunctionFragment;
        "safeBatchTransferFrom(address,address,address,uint256[],uint256[],bytes)": FunctionFragment;
        "safeTransferFrom(address,address,address,uint256,uint256,bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "ZMM", values?: undefined): string;
    encodeFunctionData(functionFragment: "isModuleApproved", values: [string]): string;
    encodeFunctionData(functionFragment: "safeBatchTransferFrom", values: [string, string, string, BigNumberish[], BigNumberish[], BytesLike]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom", values: [string, string, string, BigNumberish, BigNumberish, BytesLike]): string;
    decodeFunctionResult(functionFragment: "ZMM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isModuleApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeBatchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike): Result;
    events: {};
}
export interface ERC1155TransferHelper extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ERC1155TransferHelperInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        ZMM(overrides?: CallOverrides): Promise<[string]>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<[boolean]>;
        safeBatchTransferFrom(_token: string, _from: string, _to: string, _tokenIds: BigNumberish[], _amounts: BigNumberish[], _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        safeTransferFrom(_token: string, _from: string, _to: string, _tokenId: BigNumberish, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    ZMM(overrides?: CallOverrides): Promise<string>;
    isModuleApproved(_user: string, overrides?: CallOverrides): Promise<boolean>;
    safeBatchTransferFrom(_token: string, _from: string, _to: string, _tokenIds: BigNumberish[], _amounts: BigNumberish[], _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    safeTransferFrom(_token: string, _from: string, _to: string, _tokenId: BigNumberish, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        ZMM(overrides?: CallOverrides): Promise<string>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<boolean>;
        safeBatchTransferFrom(_token: string, _from: string, _to: string, _tokenIds: BigNumberish[], _amounts: BigNumberish[], _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        safeTransferFrom(_token: string, _from: string, _to: string, _tokenId: BigNumberish, _amount: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        ZMM(overrides?: CallOverrides): Promise<BigNumber>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<BigNumber>;
        safeBatchTransferFrom(_token: string, _from: string, _to: string, _tokenIds: BigNumberish[], _amounts: BigNumberish[], _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        safeTransferFrom(_token: string, _from: string, _to: string, _tokenId: BigNumberish, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        ZMM(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isModuleApproved(_user: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        safeBatchTransferFrom(_token: string, _from: string, _to: string, _tokenIds: BigNumberish[], _amounts: BigNumberish[], _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        safeTransferFrom(_token: string, _from: string, _to: string, _tokenId: BigNumberish, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
