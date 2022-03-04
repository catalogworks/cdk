// offersv1.test.ts
// Jest test suite for OffersV1 class

import {ZoraModuleManager, OffersV1, OfferData, wrapETH} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {waffleJest} from '@ethereum-waffle/jest';

import {zoraAddresses} from '../src/addresses';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';
import {setupZora, ZoraConfiguredAddresses} from './helpers';
import {BigNumber, Contract} from 'ethers';
import type {Offer as OfferType} from '../src';

const provider = new JsonRpcProvider();
const blockchain = new Blockchain(provider);

jest.setTimeout(30000);
expect.extend(waffleJest);

describe('Zora V3 Offers', () => {
  describe('constructor', () => {
    it('throws an error if no contract address is provided with an invalid chain', () => {
      const wallet = Wallet.createRandom();
      expect(() => {
        new OffersV1(wallet, 420);
      }).toThrow('Invariant failed: chainId: 420 is not currently supported');
    });

    it('throws an error if chainId does not map to a deployed instance', () => {
      const wallet = Wallet.createRandom();
      expect(() => {
        new OffersV1(wallet, 69);
      }).toThrow('Invariant failed: chainId: 69 is not currently supported');
    });

    it('throws an error if the contract addres is not valid', () => {
      const wallet = Wallet.createRandom();
      expect(() => {
        new OffersV1(wallet, 4, 'pee pee poo poo');
      }).toThrow('Invariant failed: pee pee poo poo is not a valid address');
    });

    it('sets the instance to readOnly=false if signer is specified', () => {
      const wallet = Wallet.createRandom();
      const offers = new OffersV1(wallet, 4);
      expect(offers.readOnly).toBe(false);
    });

    it('initializes an instance with the checksum address for a specific chain', () => {
      const wallet = Wallet.createRandom();
      const rinkebyAddress = zoraAddresses.rinkeby.offers;
      const offers = new OffersV1(wallet, 4);
      expect(offers.contractAddress).toBe(rinkebyAddress);
    });
  });

  // CONTRACT FUNCTIONS

  describe('contract functions', () => {
    let offersConfig: ZoraConfiguredAddresses;
    const provider = new JsonRpcProvider();
    const [mainWallet, otherWallet] = generatedWallets(provider);

    beforeEach(async () => {
      await blockchain.resetAsync();
      offersConfig = await setupZora(mainWallet);
    });

    describe('write functions', () => {
      let defaultOfferData: OfferData;

      beforeEach(async () => {
        defaultOfferData = {
          tokenContract: offersConfig.erc721Test.address,
          tokenId: 1,
          currency: offersConfig.weth,
          amount: 24,
          findersFeeBPS: 50,
        };
      });

      describe('createOffer', () => {
        // 01
        it('throws an error on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const offers = new OffersV1(provider, 50, offersConfig.offersV1);

          expect(offers.readOnly).toBe(true);

          await expect(
            offers.createOffer(
              defaultOfferData.tokenContract,
              defaultOfferData.tokenId,
              defaultOfferData.currency,
              defaultOfferData.amount,
              defaultOfferData.findersFeeBPS
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });
        // 02
        it('throws an error if the input contract address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.createOffer(
              'pee pee poo poo',
              defaultOfferData.tokenId,
              defaultOfferData.currency,
              defaultOfferData.amount,
              defaultOfferData.findersFeeBPS
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input token contract address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.createOffer(
              offersConfig.erc721Test.address,
              defaultOfferData.tokenId,
              'pee pee poo poo',
              defaultOfferData.amount,
              defaultOfferData.findersFeeBPS
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('creates an offer', async () => {
          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            offersConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          // Setup ERC721 and mint
          const erc721 = new Contract(
            offersConfig.erc721,
            offersConfig.erc721Test.interface,
            mainWallet
          );

          const nftTx = await erc721.mint(mainWallet.address, 1);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            offersConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();
          expect(approveTransferTx.hash).toBeDefined();

          // Setup module manager
          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            offersConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            offersConfig.offersV1
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(
              offersConfig.offersV1,
              true
            );
          await approveModuleManagerTx.wait();

          // Listen for emitted event
          moduleManager.contract.on(
            'ModuleApprovalSet',
            (user: string, module: string, approved: boolean) => {
              expect(user).toBe(mainWallet.address);
              expect(module).toBe(offersConfig.offersV1);
              expect(approved).toBe(true);
            }
          );

          // Approve ERC20 Transfer Helper
          const wethContract = new Contract(
            offersConfig.weth,
            offersConfig.wethTest.interface,
            mainWallet
          );
          const wethApproval = await wethContract.approve(
            offersConfig.erc20TransferHelper,
            5000000
          );
          await wethApproval.wait();

          // Create offer
          const tx = await offers.createOffer(
            offersConfig.erc721,
            1,
            offersConfig.weth,
            defaultOfferData.amount,
            defaultOfferData.findersFeeBPS
          );
          tx.wait();

          // Check that the offer was created
          offers.contract.on(
            'OfferCreated',
            (
              tokenContract: string,
              tokenId: BigNumber,
              offerId: BigNumber,
              offer: OfferType
            ) => {
              expect(tokenContract).toBe(defaultOfferData.tokenContract);
              expect(tokenId).toBe(defaultOfferData.tokenId);
              expect(offerId).toBeDefined();
              expect(offer.currency).toBe(defaultOfferData.currency);
              expect(offer.amount).toBe(defaultOfferData.amount);
              expect(offer.findersFeeBPS).toBe(defaultOfferData.findersFeeBPS);
            }
          );

          expect(tx.hash).toBeDefined();
          // Clear event listeners
          moduleManager.contract.removeAllListeners('ModuleApprovalSet');
          offers.contract.removeAllListeners('OfferCreated');
        });
      });

      describe('setOfferAmount', () => {
        // 01
        it('throws an erorr on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const offers = new OffersV1(provider, 50, offersConfig.offersV1);

          expect(offers.readOnly).toBe(true);
          await expect(
            offers.setOfferAmount(
              offersConfig.erc721,
              1,
              1,
              offersConfig.weth,
              20
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input contract address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.setOfferAmount(
              'pee pee poo poo',
              1,
              1,
              offersConfig.weth,
              20
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an erorr if the input token contract address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.setOfferAmount(
              offersConfig.erc721,
              1,
              1,
              'pee pee poo poo',
              20
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('sets the offer amount', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            offersConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          // Setup ERC721 and mint
          const erc721 = new Contract(
            offersConfig.erc721,
            offersConfig.erc721Test.interface,
            mainWallet
          );

          const nftTx = await erc721.mint(mainWallet.address, 1);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            offersConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();
          expect(approveTransferTx.hash).toBeDefined();

          // Setup module manager
          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            offersConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            offersConfig.offersV1
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(
              offersConfig.offersV1,
              true
            );
          await approveModuleManagerTx.wait();

          // Listen for emitted event
          moduleManager.contract.on(
            'ModuleApprovalSet',
            (user: string, module: string, approved: boolean) => {
              expect(user).toBe(mainWallet.address);
              expect(module).toBe(offersConfig.offersV1);
              expect(approved).toBe(true);
            }
          );

          // Approve ERC20 Transfer Helper
          const wethContract = new Contract(
            offersConfig.weth,
            offersConfig.wethTest.interface,
            mainWallet
          );
          const wethApproval = await wethContract.approve(
            offersConfig.erc20TransferHelper,
            5000000
          );
          await wethApproval.wait();

          // Create offer
          const tx = await offers.createOffer(
            offersConfig.erc721,
            1,
            offersConfig.weth,
            defaultOfferData.amount,
            defaultOfferData.findersFeeBPS
          );
          tx.wait();

          // Check that the offer was created
          offers.contract.on(
            'OfferCreated',
            (
              tokenContract: string,
              tokenId: BigNumber,
              offerId: BigNumber,
              offer: OfferType
            ) => {
              expect(tokenContract).toBe(defaultOfferData.tokenContract);
              expect(tokenId).toBe(defaultOfferData.tokenId);
              expect(offerId).toBeDefined();
              expect(offer.currency).toBe(defaultOfferData.currency);
              expect(offer.amount).toBe(defaultOfferData.amount);
              expect(offer.findersFeeBPS).toBe(defaultOfferData.findersFeeBPS);
            }
          );

          expect(tx.hash).toBeDefined();

          // Update offer
          const updateTx = await offers.contract.setOfferAmount(
            offersConfig.erc721,
            1,
            1,
            offersConfig.weth,
            20
          );
          updateTx.wait();

          offers.contract.on(
            'OfferUpdated',
            (
              tokenContract: string,
              tokenId: BigNumber,
              offerId: BigNumber,
              offer: OfferType
            ) => {
              expect(tokenContract).toBe(defaultOfferData.tokenContract);
              expect(tokenId).toBe(defaultOfferData.tokenId);
              expect(offerId).toBeDefined();
              expect(offer.currency).toBe(defaultOfferData.currency);
              expect(offer.amount).toBe(20);
              expect(offer.findersFeeBPS).toBe(defaultOfferData.findersFeeBPS);
            }
          );

          // Clear event listeners
          moduleManager.contract.removeAllListeners('ModuleApprovalSet');
          offers.contract.removeAllListeners('OfferCreated');
          offers.contract.removeAllListeners('OfferUpdated');
        });
      });

      describe('cancelOffer', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const offers = new OffersV1(provider, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(true);

          await expect(
            offers.cancelOffer(offersConfig.erc721, 1, 1)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input token contract address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.cancelOffer('pee pee poo poo', 1, 1)
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('cancels the offer', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            offersConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          // Setup ERC721 and mint
          const erc721 = new Contract(
            offersConfig.erc721,
            offersConfig.erc721Test.interface,
            mainWallet
          );

          const nftTx = await erc721.mint(mainWallet.address, 1);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            offersConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();
          expect(approveTransferTx.hash).toBeDefined();

          // Setup module manager
          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            offersConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            offersConfig.offersV1
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(
              offersConfig.offersV1,
              true
            );
          await approveModuleManagerTx.wait();

          // Listen for emitted event
          moduleManager.contract.on(
            'ModuleApprovalSet',
            (user: string, module: string, approved: boolean) => {
              expect(user).toBe(mainWallet.address);
              expect(module).toBe(offersConfig.offersV1);
              expect(approved).toBe(true);
            }
          );

          // Approve ERC20 Transfer Helper
          const wethContract = new Contract(
            offersConfig.weth,
            offersConfig.wethTest.interface,
            mainWallet
          );
          const wethApproval = await wethContract.approve(
            offersConfig.erc20TransferHelper,
            5000000
          );
          await wethApproval.wait();

          // Create offer
          const tx = await offers.createOffer(
            offersConfig.erc721,
            1,
            offersConfig.weth,
            defaultOfferData.amount,
            defaultOfferData.findersFeeBPS
          );
          tx.wait();

          // Check that the offer was created
          offers.contract.on(
            'OfferCreated',
            (
              tokenContract: string,
              tokenId: BigNumber,
              offerId: BigNumber,
              offer: OfferType
            ) => {
              expect(tokenContract).toBe(defaultOfferData.tokenContract);
              expect(tokenId).toBe(defaultOfferData.tokenId);
              expect(offerId).toBeDefined();
              expect(offer.currency).toBe(defaultOfferData.currency);
              expect(offer.amount).toBe(defaultOfferData.amount);
              expect(offer.findersFeeBPS).toBe(defaultOfferData.findersFeeBPS);
            }
          );

          expect(tx.hash).toBeDefined();

          // Cancel Offer
          const cancelTx = await offers.contract.cancelOffer(
            offersConfig.erc721,
            1,
            1
          );
          cancelTx.wait();

          offers.contract.on(
            'OfferCanceled',
            (
              tokenContract: string,
              tokenId: BigNumber,
              offerId: BigNumber,
              offer: OfferType
            ) => {
              expect(tokenContract).toBe(defaultOfferData.tokenContract);
              expect(tokenId).toBe(defaultOfferData.tokenId);
              expect(offerId).toBeDefined();
              expect(offer.currency).toBe(defaultOfferData.currency);
              expect(offer.amount).toBe(defaultOfferData.amount);
              expect(offer.findersFeeBPS).toBe(defaultOfferData.findersFeeBPS);
            }
          );

          // Clear event listeners
          moduleManager.contract.removeAllListeners('ModuleApprovalSet');
          offers.contract.removeAllListeners('OfferCreated');
          offers.contract.removeAllListeners('OfferCanceled');
        });
      });

      describe('fillOffer', () => {
        // 01
        it('throws an error on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const offers = new OffersV1(provider, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(true);

          await expect(
            offers.fillOffer(
              offersConfig.erc721,
              1,
              1,
              offersConfig.weth,
              defaultOfferData.amount,
              otherWallet.address
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the input contract address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.fillOffer(
              'pee pee poo poo',
              1,
              1,
              offersConfig.weth,
              1,
              otherWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input token address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.fillOffer(
              offersConfig.erc721,
              1,
              1,
              'pee pee poo poo',
              1,
              otherWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('throws an error if the input wallet address is not valid', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          expect(offers.readOnly).toBe(false);

          await expect(
            offers.fillOffer(
              offersConfig.erc721,
              1,
              1,
              offersConfig.weth,
              1,
              'pee pee poo poo'
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 05
        it('fills an offer', async () => {
          const offers = new OffersV1(mainWallet, 50, offersConfig.offersV1);
          const offersOtherWallet = new OffersV1(
            otherWallet,
            50,
            offersConfig.offersV1
          );
          expect(offers.readOnly).toBe(false);

          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            offersConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          // Setup ERC721 and mint
          const erc721 = new Contract(
            offersConfig.erc721,
            offersConfig.erc721Test.interface,
            mainWallet
          );

          const nftTx = await erc721.mint(mainWallet.address, 1);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            offersConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();
          expect(approveTransferTx.hash).toBeDefined();

          // Setup module manager
          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            offersConfig.moduleManagerTest.address
          );
          const otherModuleManager = new ZoraModuleManager(
            otherWallet,
            50,
            offersConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            offersConfig.offersV1
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(
              offersConfig.offersV1,
              true
            );
          await approveModuleManagerTx.wait();

          const approveOtherModuleManagerTx =
            await otherModuleManager.setApprovalForModule(
              offersConfig.offersV1,
              true
            );
          await approveOtherModuleManagerTx.wait();

          // Approve ERC20 Transfer Helper
          const wethContract = new Contract(
            offersConfig.weth,
            offersConfig.wethTest.interface,
            mainWallet
          );
          const wethApproval = await wethContract.approve(
            offersConfig.erc20TransferHelper,
            5000000
          );
          await wethApproval.wait();

          // Create offer
          const tx = await offers.createOffer(
            offersConfig.erc721,
            1,
            offersConfig.weth,
            defaultOfferData.amount,
            defaultOfferData.findersFeeBPS
          );
          tx.wait();

          // Check that the offer was created
          offers.contract.on(
            'OfferCreated',
            (
              tokenContract: string,
              tokenId: BigNumber,
              offerCount: BigNumber,
              offer: OfferType
            ) => {
              expect(tokenContract).toBe(defaultOfferData.tokenContract);
              expect(tokenId).toEqual(BigNumber.from(defaultOfferData.tokenId));
              expect(offerCount).toBeDefined();
              expect(offer.currency).toBe(defaultOfferData.currency);
              expect(offer.amount).toEqual(
                BigNumber.from(defaultOfferData.amount)
              );
            }
          );

          expect(tx.hash).toBeDefined();

          // Fill offer
          const fillTx = await offers.fillOffer(
            offersConfig.erc721,
            1,
            1,
            offersConfig.weth,
            defaultOfferData.amount,
            otherWallet.address
          );
          await fillTx.wait();

          // Check that the offer was filled
          offers.contract.on(
            'OfferFilled',
            (
              tokenContract: string,
              tokenId: BigNumber,
              offerId: BigNumber,
              sender: string,
              finder: string,
              offer: OfferType
            ) => {
              expect(tokenContract).toBe(defaultOfferData.tokenContract);
              expect(tokenId).toEqual(BigNumber.from(defaultOfferData.tokenId));
              expect(offerId).toBeDefined();
              expect(sender).toBe(mainWallet.address);
              expect(finder).toBe(otherWallet.address);
              expect(offer.currency).toBe(defaultOfferData.currency);
              expect(offer.amount).toBe(defaultOfferData.amount);
              expect(offer.findersFeeBPS).toBe(defaultOfferData.findersFeeBPS);
            }
          );

          // Clear event listeners
          offers.contract.removeAllListeners('OfferCreated');
          offers.contract.removeAllListeners('OfferFilled');
        });
      });
    });
  });
});
