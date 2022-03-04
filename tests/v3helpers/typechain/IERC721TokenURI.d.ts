import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IERC721TokenURIInterface extends ethers.utils.Interface {
    functions: {
        "tokenURI(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    events: {};
}
export interface IERC721TokenURI extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IERC721TokenURIInterface;
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
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
    };
    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
