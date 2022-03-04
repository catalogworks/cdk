import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISuperRareRegistry, ISuperRareRegistryInterface } from "../ISuperRareRegistry";
export declare class ISuperRareRegistry__factory {
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
    static createInterface(): ISuperRareRegistryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISuperRareRegistry;
}
