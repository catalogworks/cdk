// connectsafe.ts
// Example usage interacting with Gnosis Safe SDK
// This is a ts-node script
// Execute with `$ ts-node examples/scripts/connectsafe.ts`

import { generateMerkleTree, generateMerkleProofs, generateMerkleProof, generateMerkleRootFromTree} from '../../src/utils';
import Safe, { SafeFactory, SafeAccountConfig, EthersAdapter, } from '@gnosis.pm/safe-core-sdk';
import type { SafeTransaction, SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';
import type { Proof } from '../../src/types';
import { BytesLike, ethers, Wallet} from 'ethers';
import dotenv from 'dotenv';
import { JsonRpcProvider } from '@ethersproject/providers';
import { SafeEthersSigner, SafeService } from '@gnosis.pm/safe-ethers-adapters';
import { Catalog } from '../../src';
import { TD606 } from '@catalogworks/catalog-contracts/dist/types/typechain';
import axios from 'axios';

const transactionServiceUrl = 'https://safe-transaction.rinkeby.gnosis.io'
const safeService = new SafeService(transactionServiceUrl);
dotenv.config();
// Test wallet 

const networkName = 'rinkeby';
const provider = new JsonRpcProvider(`https://${networkName}.infura.io/v3/${process.env.INFURA_API_KEY}`);
const signer = new Wallet(`${process.env.PRIVATE_KEY}`, provider);
console.log('\x1b[32m','Starting...', '\x1b[0m');
console.log('\x1b[38m','TEST SIGNER: ', signer.address,  '\x1b[0m');
const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signer
});




// const estimateTransaction = async (safe: string, tx: any): Promise<any> => {
//     console.log(JSON.stringify(tx));
//     try {
//         const resp = await axios.post(`https://safe-transaction.rinkeby.gnosis.io/api/v2/safes/${safe}/transactions/estimate/`, tx);
//         console.log(resp.data);
//         return resp.data;
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
// };

const connectSafe = async () => {
    const catalogSafeSdk: Safe = await Safe.create({ ethAdapter: ethAdapterOwner1, safeAddress: `${process.env.CATALOG_SAFE_ADDRESS}`,  });

    const catalogSafeOwners = await catalogSafeSdk.getOwners();
    const catalogSafeChainId = await catalogSafeSdk.getChainId();
    console.log('\x1b[32m','catalogSafeOwners: ', catalogSafeOwners, '\x1b[0m');
    console.log('\x1b[33m','catalogSafeChainId: ', catalogSafeChainId, '\x1b[0m');
    return catalogSafeSdk;
};


const generateTxDataUpdateRoot = async (catalogSafeSdk: Safe, inputRoot: BytesLike  ): Promise<string> => {
    // create safe signer

    const safeAddress = await catalogSafeSdk.getAddress();
    // @ts-ignore next
    const safeSigner = new SafeEthersSigner(catalogSafeSdk, safeService, signer);

    const catalogSafeInstance = new Catalog(safeSigner, 4, `${process.env.CATALOG_CONTRACT_ADDRESS}`);

    const res = await catalogSafeInstance.updateRoot(inputRoot);
    console.log('\x1b[33m','res: ', res, '\x1b[0m');
    const data = res.data;
    console.log('\x1b[30m','data: ', data, '\x1b[0m');

    return data;
};


const createSafeTx = async (catalogSafeSdk: Safe, transactionData: any): Promise<{safeTx: SafeTransaction, proposedTx: any}> => {

    const data = transactionData;
    console.log('data: ', data);
    // assuming TD606 Proxy here (rinkeby)
    const transaction: SafeTransactionDataPartial = {
        to: catalogSafeSdk.getAddress(),
        data: data,
        value: '0',
    };
    const safeTx = await catalogSafeSdk.createTransaction(transaction);
    const signedTx = await catalogSafeSdk.signTransaction(safeTx);

    const siggy = await safeTx.signatures.get('0x723aae1ad495f0b804624bc507741c08f214fba2');
    console.log('\x1b[33m','siggy: ', siggy, '\x1b[0m');

    // sign TX from env key signer
    const safeTxHash = await catalogSafeSdk.getTransactionHash(safeTx);
    console.log('\x1b[30m','safeTxHash: ', safeTxHash, '\x1b[0m');


    const proposedTx = await safeService.proposeTx(catalogSafeSdk.getAddress(), safeTxHash, safeTx, siggy! );
    console.log('\x1b[30m','proposedTx: ', proposedTx.toString(), '\x1b[0m');

    return {safeTx, proposedTx};
};


connectSafe().then(async (catalogSafeSdk: Safe) => {


    // creates tx, signs it with local key, and queries the transaction to gnosis safe
    const safe = catalogSafeSdk;
    
    const txData = await generateTxDataUpdateRoot(catalogSafeSdk, '0xf191f24b7852cbf038091cddc3e4fe0f61b7f2ba69b036af9dcd735c51ff2e27').then(async (data: string ) => {
        createSafeTx(catalogSafeSdk, data);
    });
    // console.log('\x1b[30m','txData: ', txData, '\x1b[0m');

    // estimateTransaction(catalogSafeSdk.getAddress(), txData);
    // const { safeTx, proposedTx } = await createSafeTx(catalogSafeSdk);
    // console.log('\x1b[39m','proposedTx: ', proposedTx, '\x1b[0m');
    // console.log('\x1b[32m','safeTx: ', safeTx, '\x1b[0m');

})
.catch((error) => {
    console.error(error);
    process.exit(1);
});