import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IFoundation, IFoundationInterface } from "../IFoundation";
export declare class IFoundation__factory {
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
    static createInterface(): IFoundationInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IFoundation;
}
