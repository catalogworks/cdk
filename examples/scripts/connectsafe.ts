// connectsafe.ts
// Example usage interacting with Gnosis Safe SDK
// This is a ts-node script
// Execute with `$ ts-node examples/scripts/connectsafe.ts`

import { generateMerkleTree, generateMerkleProofs, generateMerkleProof, generateMerkleRootFromTree} from '../../src/utils';
import Safe, { SafeFactory, SafeAccountConfig, EthersAdapter, } from '@gnosis.pm/safe-core-sdk';
import type { SafeTransaction, SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';
import type { Proof } from '../../src/types';
import { ethers, Wallet} from 'ethers';
import dotenv from 'dotenv';
import { JsonRpcProvider } from '@ethersproject/providers';
import SafeServiceClient from '@gnosis.pm/safe-service-client'
import { Catalog } from '../../src';
import { TD606 } from '@catalogworks/catalog-contracts/dist/types/typechain';

const transactionServiceUrl = 'https://safe-transaction.rinkeby.gnosis.io'
// const safeServiceURL = 'https://safe-client.rinkeby.gnosis.io';
const safeService = new SafeServiceClient(transactionServiceUrl);
dotenv.config();
// Test wallet 

const networkName = 'rinkeby';
const provider = new JsonRpcProvider(`https://${networkName}.infura.io/v3/${process.env.INFURA_API_KEY}`);
const testSigner = new Wallet(`${process.env.PRIVATE_KEY}`, provider);
console.log('\x1b[32m','Starting...', '\x1b[0m');
console.log('\x1b[38m','TEST SIGNER: ', testSigner.address,  '\x1b[0m');
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


const createSafeTx = async (catalogSafeSdk: Safe): Promise<{safeTx: SafeTransaction, proposedTx: any}> => {

    // const tempC = new Catalog(catalogSafeSdk., 4, '0x849880398BD686031Ccb44c2cd00FaC129654b55');
    // const data = await (await tempC.updateRoot('0xf191f24b7852cbf038091cddc3e4fe0f61b7f2ba69b036af9dcd735c51ff2e27')).data;
    // Need to generate tx data with input address from safe here...
    const data = '0x21ff9970f191f24b7852cbf038091cddc3e4fe0f61b7f2ba69b036af9dcd735c51ff2e27'
    console.log('data: ', data);
    // assuming TD606 Proxy here (rinkeby)
    const transaction: SafeTransactionDataPartial = {
        to: catalogSafeSdk.getAddress(),
        data: data,
        value: '0',
    };
    const safeTx = await catalogSafeSdk.createTransaction(transaction);
    const signedTx = await catalogSafeSdk.signTransaction(safeTx);

    console.log('safe?', safeTx);
    // sign TX from env key signer
    const safeTxHash = await catalogSafeSdk.getTransactionHash(safeTx);
    console.log('\x1b[30m','safeTxHash: ', safeTxHash, '\x1b[0m');


    const proposedTx = await safeService.proposeTransaction({
        safeAddress: catalogSafeSdk.getAddress(),
        safeTransaction: safeTx,
        safeTxHash,
        senderAddress: testSigner.address,
    });

    return {safeTx, proposedTx};
};


connectSafe().then(async (catalogSafeSdk: Safe) => {
    // creates tx, signs it with local key, and queries the transaction to gnosis safe
    const { safeTx, proposedTx } = await createSafeTx(catalogSafeSdk);
    console.log('\x1b[39m','proposedTx: ', proposedTx, '\x1b[0m');
    console.log('\x1b[32m','safeTx: ', safeTx, '\x1b[0m');

})
.catch((error) => {
    console.error(error);
    process.exit(1);
});