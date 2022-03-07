// 0xsplits.test.ts
// Jest test suite for ZeroXSplits class

import {ZeroXSplits, SplitData} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {waffleJest} from '@ethereum-waffle/jest';
import {splitsAddresses} from '../src/addresses';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';
import {setupSplits, SplitConfiguredAddresses} from './helpers';
import {BigNumber, Contract, ethers} from 'ethers';
import type {Offer as OfferType} from '../src';

const provider = new JsonRpcProvider();
const blockchain = new Blockchain(provider);

jest.setTimeout(30000);
expect.extend(waffleJest);

describe('0xSplits Test Suite', () => {
  describe('constructor', () => {
    it('throws an eror if no contract address is provided with an invalid chain', () => {
      const wallet = Wallet.createRandom();
      expect(() => {
        new ZeroXSplits(wallet, 420);
      }).toThrow('Invariant failed: chainId: 420 is not currently supported');
    });

    it('throws an error if chainId does not map to a deployed instance', () => {
      const wallet = Wallet.createRandom();
      expect(() => {
        new ZeroXSplits(wallet, 69);
      }).toThrow('Invariant failed: chainId: 69 is not currently supported');
    });

    it('throws an error if the contract address is not valid', () => {
      const wallet = Wallet.createRandom();
      expect(() => {
        new ZeroXSplits(wallet, 4, 'pee pee poo poo');
      }).toThrow('Invariant failed: pee pee poo poo is not a valid address');
    });

    it('sets the instance to readOnly=false if signer is specified', () => {
      const wallet = Wallet.createRandom();
      const zeroXSplits = new ZeroXSplits(wallet, 4);
      expect(zeroXSplits.readOnly).toBe(false);
    });

    it('initializes an instance with the checksum address for a specific chain', () => {
      const wallet = Wallet.createRandom();
      const rinkebyAddress = splitsAddresses.rinkeby.splitMain;
      const splits = new ZeroXSplits(wallet, 4);
      expect(splits.contractAddress).toEqual(rinkebyAddress);
    });
  });

  describe('contract functions', () => {
    let splitsConfig: SplitConfiguredAddresses;
    const provider = new JsonRpcProvider();
    const [mainWallet, otherWallet] = generatedWallets(provider);

    beforeEach(async () => {
      await blockchain.resetAsync();
      splitsConfig = await setupSplits(mainWallet);
    });

    describe('write functions', () => {
      let defaultSplitData: SplitData;

      beforeEach(async () => {
        defaultSplitData = {
          accounts: [mainWallet.address, otherWallet.address],
          percentAllocations: ['500000', '500000'],
          distributorFee: '5000',
          controller: '0x0000000000000000000000000000000000000000',
        };
      });

      describe('createSplit', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.createSplit(
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              defaultSplitData.controller
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input receiver address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          await expect(
            splits.createSplit(
              [mainWallet.address, 'pee pee poo poo'],
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              defaultSplitData.controller
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input controller address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);
          await expect(
            splits.createSplit(
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              'pee pee poo poo'
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('creates a split', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );
          expect(splits.readOnly).toBe(false);
          // calculate immutable split address
          const predictedSplitAddress = await splits.fetchPredictedSplitAddress(
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee
          );

          const tx = await splits.createSplit(
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee,
            defaultSplitData.controller
          );

          await tx.wait();

          splits.contract.on('CreateSplit', (splitAddress: string) => {
            expect(splitAddress).toBeDefined();
            expect(splitAddress).toBe(predictedSplitAddress);
          });
          // ensure the split was created
          const splitHash = await splits.fetchHash(predictedSplitAddress);
          expect(splitHash).toBeDefined();

          splits.contract.removeAllListeners('CreateSplit');
        });
      });

      describe('acceptControl', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.acceptControl(mainWallet.address)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          await expect(
            splits.acceptControl('pee pee poo poo')
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('accepts control of a split request', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );
          const otherSplits = new ZeroXSplits(
            otherWallet,
            50,
            splitsConfig.splitMain
          );
          expect(splits.readOnly).toBe(false);

          const createSplitTx = await splits.createSplit(
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee,
            mainWallet.address
          );
          const txLogs = await createSplitTx.wait();

          const emittedData = txLogs.logs[0].topics[1];
          const splitAddress = ethers.utils.hexStripZeros(emittedData);

          splits.contract.on('CreateSplit', (emittedAddress: string) => {
            expect(emittedAddress).toBeDefined();
            expect(emittedAddress).toBe(splitAddress);
          });

          // Transfer control of the split to the other wallet
          const transferTx = await splits.transferControl(
            splitAddress,
            otherWallet.address
          );
          await transferTx.wait();

          splits.contract.on(
            'InitiateControlTransfer',
            (splitAddress: string, newController: string) => {
              expect(splitAddress).toBeDefined();
              expect(splitAddress).toBe(splitAddress);
              expect(newController).toBeDefined();
              expect(newController).toBe(otherWallet.address);
            }
          );

          // Accept control of the split from the other wallet
          const acceptTx = await otherSplits.acceptControl(splitAddress);
          await acceptTx.wait();

          otherSplits.contract.on(
            'ControlTransfer',
            (
              splitAddress: string,
              previousController: string,
              newController: string
            ) => {
              expect(splitAddress).toBeDefined();
              expect(splitAddress).toBe(splitAddress);
              expect(previousController).toBeDefined();
              expect(previousController).toBe(mainWallet.address);
              expect(newController).toBeDefined();
              expect(newController).toBe(otherWallet.address);
            }
          );

          splits.contract.removeAllListeners('CreateSplit');
          splits.contract.removeAllListeners('InitiateControlTransfer');
          otherSplits.contract.removeAllListeners('ControlTransfer');
        });
      });

      describe('cancelControlTransfer', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.cancelControlTransfer(mainWallet.address)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });
        // 02
        it('throws an error if the input address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          await expect(
            splits.cancelControlTransfer('pee pee poo poo')
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });
        // 03
        it('cancels a control transfer request', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          const createSplitTx = await splits.createSplit(
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee,
            mainWallet.address
          );
          const txLogs = await createSplitTx.wait();

          const emittedData = txLogs.logs[0].topics[1];
          const splitAddress = ethers.utils.hexStripZeros(emittedData);

          splits.contract.on('CreateSplit', (emittedAddress: string) => {
            expect(emittedAddress).toBeDefined();
            expect(emittedAddress).toBe(splitAddress);
          });

          // Transfer control of the split to the other wallet
          const transferTx = await splits.transferControl(
            splitAddress,
            otherWallet.address
          );
          await transferTx.wait();

          splits.contract.on(
            'InitiateControlTransfer',
            (splitAddress: string, newController: string) => {
              expect(splitAddress).toBeDefined();
              expect(splitAddress).toBe(splitAddress);
              expect(newController).toBeDefined();
              expect(newController).toBe(otherWallet.address);
            }
          );

          // Cancel the control transfer
          const cancelTx = await splits.cancelControlTransfer(splitAddress);
          await cancelTx.wait();

          splits.contract.on(
            'CancelControlTransfer',
            (splitAddress: string) => {
              expect(splitAddress).toBeDefined();
              expect(splitAddress).toBe(splitAddress);
            }
          );

          splits.contract.removeAllListeners('CreateSplit');
          splits.contract.removeAllListeners('InitiateControlTransfer');
          splits.contract.removeAllListeners('CancelControlTransfer');
        });
      });
    });
  });
});
