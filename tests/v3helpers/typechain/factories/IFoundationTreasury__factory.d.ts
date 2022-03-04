import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IFoundationTreasury, IFoundationTreasuryInterface } from "../IFoundationTreasury";
export declare class IFoundationTreasury__factory {
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
    static createInterface(): IFoundationTreasuryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IFoundationTreasury;
}
