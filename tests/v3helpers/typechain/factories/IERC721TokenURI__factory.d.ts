import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC721TokenURI, IERC721TokenURIInterface } from "../IERC721TokenURI";
export declare class IERC721TokenURI__factory {
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
    static createInterface(): IERC721TokenURIInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721TokenURI;
}
