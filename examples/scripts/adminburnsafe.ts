// adminburnsafe.ts
// Example usage interacting with Gnosis Safe SDK to burn a token
// This is a ts-node script
// Execute with `$ ts-node examples/scripts/connectsafe.ts`
// @note Requires environment variables, not included in the SDK

import Safe, {EthersAdapter} from '@gnosis.pm/safe-core-sdk';
import type {
  SafeTransaction,
  SafeTransactionDataPartial,
} from '@gnosis.pm/safe-core-sdk-types';
import {BigNumberish, BytesLike, ethers, Wallet} from 'ethers';
import dotenv from 'dotenv';
import {JsonRpcProvider} from '@ethersproject/providers';
import {SafeEthersSigner, SafeService} from '@gnosis.pm/safe-ethers-adapters';
import {Catalog} from '../../src';

dotenv.config();

// Provider / Wallet / Signer Config
const transactionServiceUrl = 'https://safe-transaction.rinkeby.gnosis.io';
const safeService = new SafeService(transactionServiceUrl);
const networkName = 'rinkeby';
const provider = new JsonRpcProvider(
  `https://${networkName}.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const signer = new Wallet(`${process.env.PRIVATE_KEY}`, provider);
console.log('\x1b[32m', 'Starting...', '\x1b[0m');
console.log('\x1b[38m', 'TEST SIGNER: ', signer.address, '\x1b[0m');
const ethAdapterOwner1 = new EthersAdapter({
  ethers,
  signer,
});

// Connects to existing safe
// @returns {Promise<Safe>} - Connected safe instance
// @note This is a demo function, it is not part of the SDK
const connectSafe = async (): Promise<Safe> => {
  const catalogSafeSdk: Safe = await Safe.create({
    ethAdapter: ethAdapterOwner1,
    safeAddress: `${process.env.CATALOG_SAFE_ADDRESS}`,
  });
  const catalogSafeOwners = await catalogSafeSdk.getOwners();
  const catalogSafeChainId = await catalogSafeSdk.getChainId();
  console.log('\x1b[32m', 'catalogSafeOwners: ', catalogSafeOwners, '\x1b[0m');
  console.log(
    '\x1b[33m',
    'catalogSafeChainId: ',
    catalogSafeChainId,
    '\x1b[0m'
  );
  return catalogSafeSdk;
};

// Generates transaction data using the connected safe as a Signer
// @param {Safe} catalogSafeSdk - Connected safe instance
// @param {BigNumberish} inputTokenId - Token ID to burn
// @returns {Promise<string>} - Transaction data
// @note This is a demo function, it is not part of the SDK
const generateTxDataBurnToken = async (
  catalogSafeSdk: Safe,
  inputTokenId: BigNumberish
): Promise<string> => {
  // @ts-ignore next
  const safeSigner = new SafeEthersSigner(catalogSafeSdk, safeService, signer);
  const catalogSafeInstance = new Catalog(
    safeSigner,
    4,
    `${process.env.CATALOG_CONTRACT_ADDRESS}`
  );
  const res = await catalogSafeInstance.burn(inputTokenId);
  const data = res.data;
  console.log('\x1b[33m', 'res: ', res, '\x1b[0m');
  console.log('\x1b[30m', 'data: ', data, '\x1b[0m');
  return data;
};

// Creates a valid and signed Safe Transaction, proposes it to the Gnosis Safe service
// @param {Safe} catalogSafeSdk - Connected safe instance
// @param {any} transactionData - Transaction data
// @returns {Promise<{SafeTransaction, any}>} - Signed Safe Transaction + proposedTx data
// @note This is a demo function, it is not part of the SDK
const createSafeTx = async (
  catalogSafeSdk: Safe,
  transactionData: any
): Promise<{safeTx: SafeTransaction; proposedTx: any}> => {
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
  const signature = await safeTx.signatures.get(
    '0x723aae1ad495f0b804624bc507741c08f214fba2'
  );
  // sign TX from env key signer
  const safeTxHash = await catalogSafeSdk.getTransactionHash(safeTx);
  const proposedTx = await safeService.proposeTx(
    catalogSafeSdk.getAddress(),
    safeTxHash,
    safeTx,
    signature!
  );
  console.log('\x1b[30m', 'safeTxHash: ', safeTxHash, '\x1b[0m');
  console.log('\x1b[30m', 'proposedTx: ', proposedTx.toString(), '\x1b[0m');
  console.log('\x1b[33m', 'signature: ', signature, '\x1b[0m');
  return {safeTx, proposedTx};
};

// Script Runner
connectSafe()
  .then(async (catalogSafeSdk: Safe) => {
    // creates tx, signs it with local key, and queries the transaction to gnosis safe
    const safe = catalogSafeSdk;
    const txData = await generateTxDataBurnToken(catalogSafeSdk, '1').then(
      async (data: string) => {
        createSafeTx(catalogSafeSdk, data);
      }
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
