import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IManifold, IManifoldInterface } from "../IManifold";
export declare class IManifold__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): IManifoldInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IManifold;
}
