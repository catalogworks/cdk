// connectsafe.ts
// Example usage interacting with Gnosis Safe SDK
// This is a ts-node script
// Execute with `$ ts-node examples/scripts/connectsafe.ts`

import { generateMerkleTree, generateMerkleProofs, generateMerkleProof, generateMerkleRootFromTree} from '../../src/utils';
import Safe, { SafeFactory, SafeAccountConfig, EthersAdapter } from '@gnosis.pm/safe-core-sdk';
import type { Proof } from '../../src/types';
import { ethers, Wallet} from 'ethers';
import dotenv from 'dotenv';
import { JsonRpcProvider } from '@ethersproject/providers';

dotenv.config();
// Test wallet 

const networkName = 'rinkeby';
const provider = new JsonRpcProvider(`https://${networkName}.infura.io/v3/${process.env.INFURA_API_KEY}`);
const testSigner = new Wallet(`${process.env.PRIVATE_KEY}`, provider);
console.log('\x1b[32m','Starting...', '\x1b[0m');
console.log('\x1b[36m','TEST SIGNER: ', testSigner.address,  '\x1b[0m');
const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signer: testSigner
});

const connectSafe = async () => {
    const catalogSafeSdk: Safe = await Safe.create({ ethAdapter: ethAdapterOwner1, safeAddress: `${process.env.CATALOG_SAFE_ADDRESS}`,  });

    const catalogSafeOwners = await catalogSafeSdk.getOwners();
    const catalogSafeChainId = await catalogSafeSdk.getChainId();
    console.log('\x1b[32m','catalogSafeOwners: ', catalogSafeOwners, '\x1b[0m');
    console.log('\x1b[33m','catalogSafeChainId: ', catalogSafeChainId, '\x1b[0m');
    return catalogSafeSdk;
};


connectSafe()
.catch((error) => {
    console.error(error);
    process.exit(1);
});