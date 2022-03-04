import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IZoraOverride, IZoraOverrideInterface } from "../IZoraOverride";
export declare class IZoraOverride__factory {
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
    static createInterface(): IZoraOverrideInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IZoraOverride;
}
