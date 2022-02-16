// asksv11.test.ts
// Jest test suite for AsksV11 class

import {AskData, AsksV11, wrapETH, ZoraModuleManager} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {zoraAddresses} from '../src/addresses';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';
import {setupZora, ZoraConfiguredAddresses} from './helpers';
import {waffleJest} from '@ethereum-waffle/jest';
import {BigNumber, BigNumberish, Contract, utils} from 'ethers';
import {AskStruct} from '@zoralabs/v3/dist/typechain/AsksV11';
import {AddressZero} from '@ethersproject/constants';

const provider = new JsonRpcProvider();
const blockchain = new Blockchain(provider);

jest.setTimeout(30000);
// expect.extend(waffleJest);

describe('Zora V3 Asks', () => {
  describe('constructor', () => {
    it('throws an error if no contract address is provided with an invalid chain', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new AsksV11(wallet, 420);
      }).toThrow('Invariant failed: chainId: 420 is not currently supported');
    });

    it('throws an error if chainId does not map to a deployed instance', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new AsksV11(wallet, 69);
      }).toThrow('Invariant failed: chainId: 69 is not currently supported');
    });

    it('throws an error if the contract address is not valid', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new AsksV11(wallet, 4, 'pee pee poo poo');
      }).toThrow('Invariant failed: pee pee poo poo is not a valid address');
    });

    it('sets the instance to readOnly=false if signer is specified', () => {
      const wallet = Wallet.createRandom();
      const asks = new AsksV11(wallet, 4);

      expect(asks.readOnly).toBe(false);
    });

    it('sets the instance to readOnly if a provider is specified', () => {
      const provider = new JsonRpcProvider();
      const asks = new AsksV11(provider, 4, zoraAddresses.rinkeby.asks);

      expect(asks.readOnly).toBe(true);
    });

    it('initializes an instance with the checksum address for specific chainId', () => {
      const wallet = Wallet.createRandom();
      const rinkebyAddress = zoraAddresses.rinkeby.asks;
      const asks = new AsksV11(wallet, 4);

      expect(asks.contractAddress).toEqual(rinkebyAddress);
    });
  });

  // CONTRACT FUNCTIONS

  describe('contract functions', () => {
    let asksConfig: ZoraConfiguredAddresses;
    const provider = new JsonRpcProvider();
    const [mainWallet, otherWallet] = generatedWallets(provider);

    beforeEach(async () => {
      await blockchain.resetAsync();
      asksConfig = await setupZora(mainWallet);
    });

    describe('write functions', () => {
      let defaultAskData: AskData;

      beforeEach(async () => {
        defaultAskData = {
          tokenContract: asksConfig.erc721Test.address,
          tokenId: 1,
          askPrice: 100,
          askCurrency: asksConfig.weth,
          sellerFundsRecipient: mainWallet.address,
          findersFeeBPS: 50,
        };
      });
      describe('createAsk', () => {
        //01
        it('throws an error on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const asks = new AsksV11(provider, 50, asksConfig.asksV11);

          expect(asks.readOnly).toBe(true);

          await expect(
            asks.createAsk(
              asksConfig.erc721,
              1,
              100,
              asksConfig.weth,
              mainWallet.address,
              50
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        //02
        it('throws an error if the input contract address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.createAsk(
              'pee pee poo poo',
              1,
              100,
              asksConfig.weth,
              mainWallet.address,
              50
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        //03
        it('throws an error if the input token address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.createAsk(
              asksConfig.erc721,
              1,
              100,
              'pee pee poo poo',
              mainWallet.address,
              50
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        //04
        it('creates an ask', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          // Setup ERC721 and mint
          const erc721 = new Contract(
            asksConfig.erc721,
            asksConfig.erc721Test.interface,
            mainWallet
          );
          const nftTx = await erc721.mint(mainWallet.address, 1);
          console.log('mint tx: ', nftTx);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            asksConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();

          expect(approveTransferTx.hash).toBeDefined();

          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            asksConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            asksConfig.asksV11
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(asksConfig.asksV11, true);
          await approveModuleManagerTx.wait();

          blockchain.waitBlocksAsync(4);

          const tx = await asks.createAsk(
            asksConfig.erc721,
            1,
            100,
            asksConfig.weth,
            mainWallet.address,
            50
          );
          tx.wait();

          expect(tx.hash).toBeDefined();
        });
      });

      describe('setAskPrice', () => {
        //01
        it('throws an error on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const asks = new AsksV11(provider, 50, asksConfig.asksV11);

          expect(asks.readOnly).toBe(true);

          await expect(
            asks.setAskPrice(asksConfig.erc721, 1, 100, asksConfig.weth)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        //02
        it('throws an error if the input contract address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.setAskPrice('pee pee poo poo', 1, 100, asksConfig.weth)
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        //03
        it('throws an error if the input token address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.setAskPrice(asksConfig.erc721, 1, 100, 'pee pee poo poo')
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });
      });

      describe('cancelAsk', () => {
        //01
        it('throws an error on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const asks = new AsksV11(provider, 50, asksConfig.asksV11);

          expect(asks.readOnly).toBe(true);

          await expect(
            asks.cancelAsk(asksConfig.erc721, 1)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        //02
        it('throws an error if the input contract address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.cancelAsk('pee pee poo poo', 1)
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        //03
        it('sets the ask price', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          // Setup ERC721 and mint
          const erc721 = new Contract(
            asksConfig.erc721,
            asksConfig.erc721Test.interface,
            mainWallet
          );
          const nftTx = await erc721.mint(mainWallet.address, 1);
          console.log('mint tx: ', nftTx);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            asksConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();

          expect(approveTransferTx.hash).toBeDefined();

          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            asksConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            asksConfig.asksV11
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(asksConfig.asksV11, true);
          await approveModuleManagerTx.wait();

          blockchain.waitBlocksAsync(4);

          const tx = await asks.createAsk(
            asksConfig.erc721,
            1,
            100,
            asksConfig.weth,
            mainWallet.address,
            50
          );
          tx.wait();

          expect(tx.hash).toBeDefined();

          const setAskPriceTx = await asks.setAskPrice(
            asksConfig.erc721,
            1,
            200,
            asksConfig.weth
          );

          setAskPriceTx.wait();

          expect(setAskPriceTx.hash).toBeDefined();
        });
      });

      describe('fillAsk', () => {
        //01
        it('throws an error on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const asks = new AsksV11(provider, 50, asksConfig.asksV11);

          expect(asks.readOnly).toBe(true);

          await expect(
            asks.fillAsk(
              asksConfig.erc721,
              1,
              asksConfig.weth,
              100,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        //02
        it('throws an error if the input contract address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.fillAsk(
              'pee pee poo poo',
              1,
              asksConfig.weth,
              100,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        //03
        it('throws an error if the input token address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.fillAsk(
              asksConfig.erc721,
              1,
              'pee pee poo poo',
              100,
              mainWallet.address
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        //04
        it('throws an error if the input wallet address is not valid', async () => {
          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          expect(asks.readOnly).toBe(false);

          await expect(
            asks.fillAsk(
              asksConfig.erc721,
              1,
              asksConfig.weth,
              100,
              'pee pee poo poo'
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        //05
        it('fills an ask', async () => {
          // Wrap some eth first
          const wethTx = await wrapETH(
            otherWallet,
            asksConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          const asks = new AsksV11(mainWallet, 50, asksConfig.asksV11);
          const asksOtherWallet = new AsksV11(
            otherWallet,
            50,
            asksConfig.asksV11
          );
          expect(asks.readOnly).toBe(false);

          // Setup ERC721 and mint
          const erc721 = new Contract(
            asksConfig.erc721,
            asksConfig.erc721Test.interface,
            mainWallet
          );
          const nftTx = await erc721.mint(mainWallet.address, 3);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            asksConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();

          expect(approveTransferTx.hash).toBeDefined();

          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            asksConfig.moduleManagerTest.address
          );
          const otherModuleManager = new ZoraModuleManager(
            otherWallet,
            50,
            asksConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            asksConfig.asksV11
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(asksConfig.asksV11, true);
          await approveModuleManagerTx.wait();

          blockchain.waitBlocksAsync(4);

          const tx = await asks.createAsk(
            asksConfig.erc721,
            3,
            1,
            asksConfig.weth,
            mainWallet.address,
            0
          );
          tx.wait();
          expect(tx.hash).toBeDefined();

          const getAsk = await asks.fetchAskForNFT(asksConfig.erc721, 3);

          const askPrice = getAsk.askPrice;
          blockchain.waitBlocksAsync(4);
          console.log('ask price', askPrice.toString());

          expect(askPrice.toString()).toBe('1');

          // Approve module from buyer
          const approveModuleManagerTx2 =
            await otherModuleManager.setApprovalForModule(
              asksConfig.asksV11,
              true
            );
          await approveModuleManagerTx2.wait();

          const wethContract = new Contract(
            asksConfig.weth,
            asksConfig.wethTest.interface,
            otherWallet
          );
          const wethApproval = await wethContract.approve(
            asksConfig.erc20TransferHelper,
            500000
          );
          await wethApproval.wait();
          const fillTx = await asksOtherWallet.fillAsk(
            asksConfig.erc721,
            3,
            asksConfig.weth,
            1,
            otherWallet.address
          );

          fillTx.wait();
          expect(fillTx.hash).toBeDefined();
        });
      });
    });
  });
});
