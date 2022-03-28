// 0xsplits.test.ts
// Jest test suite for ZeroXSplits class

import {ZeroXSplits, SplitData, wrapETH} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {splitsAddresses} from '../src/addresses';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';
import {setupSplits, SplitConfiguredAddresses} from './helpers';
import {BigNumber, BigNumberish, Contract, ethers, utils} from 'ethers';
import {waffleJest} from '@ethereum-waffle/jest';

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
          blockchain.waitBlocksAsync(1);

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
          blockchain.waitBlocksAsync(4);

          const emittedData = txLogs.logs[0].topics[1];
          const splitAddress = ethers.utils.hexStripZeros(emittedData);

          const checkedInput = utils.getAddress(splitAddress);

          // Transfer control of the split to the other wallet
          const transferTx = await splits.transferControl(
            checkedInput,
            otherWallet.address
          );
          await transferTx.wait();

          blockchain.waitBlocksAsync(4);

          // Accept control of the split from the other wallet
          const acceptTx = await otherSplits.acceptControl(
            utils.getAddress(splitAddress)
          );
          await acceptTx.wait();

          otherSplits.contract.on(
            'ControlTransfer',
            (
              splitAddressEmitted: string,
              previousController: string,
              newController: string
            ) => {
              expect(splitAddressEmitted).toBeDefined();
              expect(splitAddressEmitted).toBe(splitAddress);
              expect(previousController).toBeDefined();
              expect(previousController).toBe(mainWallet.address);
              expect(newController).toBeDefined();
              expect(newController).toBe(otherWallet.address);
            }
          );

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
          const log = splits.contract.interface.parseLog(txLogs.logs[0]);
          const {split} = log.args;

          const emittedData = txLogs.logs[0].topics[1];
          const splitAddress = ethers.utils.hexStripZeros(emittedData);

          // Transfer control of the split to the other wallet
          const transferTx = await splits.transferControl(
            split,
            otherWallet.address
          );
          await transferTx.wait();

          // Cancel the control transfer
          const cancelTx = await splits.cancelControlTransfer(split);
          await cancelTx.wait();

          splits.contract.on(
            'CancelControlTransfer',
            (splitAddressEmitted: string) => {
              expect(splitAddressEmitted).toBeDefined();
              expect(utils.getAddress(splitAddressEmitted)).toBe(
                utils.getAddress(splitAddress)
              );
            }
          );

          // splits.contract.removeAllListeners('InitiateControlTransfer');
          splits.contract.removeAllListeners('CancelControlTransfer');
        });
      });

      describe('distributeETH', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.distributeETH(
              '0x0000000000000000000000000000000000000000',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
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

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.distributeETH(
              'pee pee poo poo',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });
        // 03
        it('distributes ETH to the split', async () => {
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
            defaultSplitData.controller
          );
          await createSplitTx.wait();

          const getSplitAddress = await splits.fetchPredictedSplitAddress(
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee
          );

          const txLogs = await createSplitTx.wait();
          blockchain.waitBlocksAsync(4);

          const emittedData = txLogs.logs[0].topics[1];
          const splitAddress = ethers.utils.hexStripZeros(emittedData);

          const distTx = await splits.distributeETH(
            getSplitAddress,
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee,
            mainWallet.address
          );
          await distTx.wait();

          splits.contract.on(
            'DistributeETH',
            (
              splitAddressEmitted: string,
              amount: BigNumberish,
              distributorAddress: string
            ) => {
              expect(splitAddressEmitted).toBeDefined();
              expect(utils.getAddress(splitAddressEmitted)).toBe(
                utils.getAddress(splitAddress)
              );
              expect(amount).toBeDefined();
              expect(amount).toBe(defaultSplitData.distributorFee);
              expect(distributorAddress).toBeDefined();
              expect(distributorAddress).toBe(mainWallet.address);
            }
          );

          splits.contract.removeAllListeners('DistributeETH');
        });
      });

      describe('distributeERC20', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.distributeERC20(
              '0x0000000000000000000000000000000000000000',
              '0x0000000000000000000000000000000000000000',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input split address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.distributeERC20(
              'pee pee poo poo',
              '0x0000000000000000000000000000000000000000',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input contract address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.distributeERC20(
              '0x0000000000000000000000000000000000000000',
              'pee pee poo poo',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('distributes erc20 tokens to the split', async () => {
          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            splitsConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          const wethContract = new Contract(
            splitsConfig.weth,
            splitsConfig.wethTest.interface,
            mainWallet
          );

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
          await createSplitTx.wait();

          const txLogs = await createSplitTx.wait();
          const emittedData = txLogs.logs[0].topics[1];
          const splitAddress = ethers.utils.hexStripZeros(emittedData);

          const distTx = await splits.distributeERC20(
            utils.getAddress(splitAddress),
            wethContract.address,
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee,
            mainWallet.address
          );
          await distTx.wait();

          splits.contract.on(
            'DistributeERC20',
            (
              splitAddressEmitted: string,
              erc20Address: string,
              amount: BigNumberish,
              distributorAddress: string
            ) => {
              expect(splitAddressEmitted).toBeDefined();
              expect(utils.getAddress(splitAddressEmitted)).toBe(
                utils.getAddress(splitAddress)
              );
              expect(erc20Address).toBeDefined();
              expect(erc20Address).toBe(wethContract.address);
              expect(amount).toBeDefined();
              expect(amount).toBe(defaultSplitData.distributorFee);
              expect(distributorAddress).toBeDefined();
              expect(distributorAddress).toBe(mainWallet.address);
            }
          );

          splits.contract.removeAllListeners('DistributeERC20');
        });
      });

      describe('makeSplitImmutable', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.makeSplitImmutable(
              '0x0000000000000000000000000000000000000000'
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input split address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.makeSplitImmutable('pee pee poo poo')
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('makes an mutable split immutable', async () => {
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

          const txLogs: ethers.ContractReceipt = await createSplitTx.wait();

          const emittedData = txLogs.logs[0].topics[1];
          const splitAddress = ethers.utils.hexStripZeros(emittedData);
          const checkedInput = utils.getAddress(splitAddress);

          const makeImmutableTx = await splits.makeSplitImmutable(checkedInput);
          await makeImmutableTx.wait();
          blockchain.waitBlocksAsync(4);

          splits.contract.on(
            'ControlTransfer',
            (
              address: string,
              previousController: string,
              newController: string
            ) => {
              expect(address).toBeDefined();
              expect(utils.getAddress(address)).toBe(
                utils.getAddress(splitAddress)
              );
              expect(previousController).toBeDefined();
              expect(previousController).toBe(mainWallet.address);
              expect(newController).toBeDefined();
              expect(newController).toBe(
                '0x0000000000000000000000000000000000000000'
              );
            }
          );

          splits.contract.removeAllListeners('ControlTransfer');
        });
      });

      describe('transferControl', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.transferControl(
              '0x0000000000000000000000000000000000000000',
              '0x0000000000000000000000000000000000000000'
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input split address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.transferControl(
              'pee pee poo poo',
              '0x0000000000000000000000000000000000000000'
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input controller adddress is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.transferControl(
              '0x0000000000000000000000000000000000000000',
              'pee pee poo poo'
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('succesfully begins transfer control request', async () => {
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
          const receipt = await (await createSplitTx).wait();
          const splitAddress =
            receipt.events?.[0]?.args?.split &&
            ethers.utils.getAddress(receipt.events[0]?.args?.split);
          blockchain.waitBlocksAsync(4);

          const checkedInput = utils.getAddress(splitAddress);
          // Transfer control of the split to the other wallet
          const transferTx = await splits.transferControl(
            checkedInput,
            otherWallet.address
          );
          await transferTx.wait();
          blockchain.waitBlocksAsync(4);

          splits.contract.on(
            'InitiateControlTransfer',
            (splitAddressEmitted: string, newController: string) => {
              expect(splitAddressEmitted).toBeDefined();
              expect(utils.getAddress(splitAddressEmitted)).toBe(
                utils.getAddress(splitAddress)
              );
              expect(newController).toBeDefined();
              expect(newController).toBe(otherWallet.address);
            }
          );

          splits.contract.removeAllListeners('InitiateControlTransfer');
        });
      });

      describe('updateAndDistributeERC20', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.updateAndDistributeERC20(
              '0x0000000000000000000000000000000000000000',
              '0x0000000000000000000000000000000000000000',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input split address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.updateAndDistributeERC20(
              'pee pee poo poo',
              '0x0000000000000000000000000000000000000000',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input contract address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.updateAndDistributeERC20(
              '0x0000000000000000000000000000000000000000',
              'pee pee poo poo',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('updates and distributes ERC20 to the split', async () => {
          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            splitsConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          const wethContract = new Contract(
            splitsConfig.weth,
            splitsConfig.wethTest.interface,
            mainWallet
          );

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
          const receipt = await (await createSplitTx).wait();
          const splitAddress =
            receipt.events?.[0]?.args?.split &&
            ethers.utils.getAddress(receipt.events[0]?.args?.split);

          blockchain.waitBlocksAsync(4);

          const checkedInput = utils.getAddress(splitAddress);
          const distTx = await splits.updateAndDistributeERC20(
            checkedInput,
            wethContract.address,
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee,
            mainWallet.address
          );
          await distTx.wait();
          blockchain.waitBlocksAsync(4);

          splits.contract.on(
            'DistributeERC20',
            (
              splitAddressEmitted: string,
              erc20Address: string,
              amount: BigNumberish,
              distributorAddress: string
            ) => {
              expect(splitAddressEmitted).toBeDefined();
              expect(utils.getAddress(splitAddressEmitted)).toBe(
                utils.getAddress(splitAddress)
              );
              expect(erc20Address).toBeDefined();
              expect(erc20Address).toBe(wethContract.address);
              expect(amount).toBeDefined();
              expect(amount).toBe(defaultSplitData.distributorFee);
              expect(distributorAddress).toBeDefined();
              expect(distributorAddress).toBe(mainWallet.address);
            }
          );

          splits.contract.on('UpdateSplit', (splitAddressEmitted: string) => {
            expect(splitAddressEmitted).toBeDefined();
            expect(utils.getAddress(splitAddressEmitted)).toBe(
              utils.getAddress(splitAddress)
            );
          });

          splits.contract.removeAllListeners('DistributeERC20');
          splits.contract.removeAllListeners('UpdateSplit');
        });
      });

      describe('updateAndDistributeETH', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.updateAndDistributeETH(
              '0x0000000000000000000000000000000000000000',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input split address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.updateAndDistributeETH(
              'pee pee poo poo',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input distributor address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.updateAndDistributeETH(
              '0x0000000000000000000000000000000000000000',
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
        it('updates and distributes ETH to the split', async () => {
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
          blockchain.waitBlocksAsync(4);

          const receipt = await (await createSplitTx).wait();
          const splitAddress =
            receipt.events?.[0]?.args?.split &&
            ethers.utils.getAddress(receipt.events[0]?.args?.split);

          const checkedInput = utils.getAddress(splitAddress);
          const distTx = await splits.updateAndDistributeETH(
            checkedInput,
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee,
            mainWallet.address
          );
          await distTx.wait();

          splits.contract.on(
            'DistributeETH',
            (
              splitAddressEmitted: string,
              amount: BigNumberish,
              distributorAddress: string
            ) => {
              expect(splitAddressEmitted).toBeDefined();
              expect(utils.getAddress(splitAddressEmitted)).toBe(
                utils.getAddress(splitAddress)
              );
              expect(amount).toBeDefined();
              expect(amount).toBe(defaultSplitData.distributorFee);
              expect(distributorAddress).toBeDefined();
              expect(distributorAddress).toBe(mainWallet.address);
            }
          );

          splits.contract.on('UpdateSplit', (splitAddressEmitted: string) => {
            expect(splitAddressEmitted).toBeDefined();
            expect(utils.getAddress(splitAddressEmitted)).toBe(
              utils.getAddress(splitAddress)
            );
          });

          splits.contract.removeAllListeners('DistributeETH');
          splits.contract.removeAllListeners('UpdateSplit');
        });
      });

      describe('updateSplit', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const splits = new ZeroXSplits(provider, 50, splitsConfig.splitMain);

          expect(splits.readOnly).toBe(true);

          await expect(
            splits.updateSplit(
              '0x0000000000000000000000000000000000000000',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input split address is not valid', async () => {
          const splits = new ZeroXSplits(
            mainWallet,
            50,
            splitsConfig.splitMain
          );

          expect(splits.readOnly).toBe(false);

          await expect(
            splits.updateSplit(
              'pee pee poo poo',
              defaultSplitData.accounts,
              defaultSplitData.percentAllocations,
              defaultSplitData.distributorFee
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('updates the split', async () => {
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

          const receipt = await (await createSplitTx).wait();
          const splitAddress =
            receipt.events?.[0]?.args?.split &&
            ethers.utils.getAddress(receipt.events[0]?.args?.split);

          const checkedInput = utils.getAddress(splitAddress);
          const updateSplitTx = await splits.updateSplit(
            checkedInput,
            defaultSplitData.accounts,
            defaultSplitData.percentAllocations,
            defaultSplitData.distributorFee
          );
          await updateSplitTx.wait();

          splits.contract.on('CreateSplit', (emittedAddress: string) => {
            expect(emittedAddress).toBeDefined();
            expect(emittedAddress).toBe(utils.getAddress(splitAddress));
          });

          splits.contract.on('UpdateSplit', (address: string) => {
            expect(address).toBeDefined();
            expect(utils.getAddress(address)).toBe(
              utils.getAddress(splitAddress)
            );
          });

          splits.contract.removeAllListeners('CreateSplit');
          splits.contract.removeAllListeners('UpdateSplit');
        });
      });
    });
  });
});
