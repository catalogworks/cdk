// reserveAuctionETH.test.ts
// Jest test for ReserveAuctionETH

import {
  AuctionInputDataETH,
  AuctionStructETH,
  ReserveAuctionETH,
  wrapETH,
  ZoraModuleManager,
} from '../src';

import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {zoraAddresses} from '../src/addresses';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';
import {
  setupZoraAuctions,
  ZoraReserveAuctionConfiguredAddresses,
} from './helpers';

import {waffleJest} from '@ethereum-waffle/jest';
import {BigNumber, Contract} from 'ethers';

const provider = new JsonRpcProvider();
const blockchain = new Blockchain(provider);

jest.setTimeout(30000);
expect.extend(waffleJest);

describe('Zora V3 ReserveAuctionETH', () => {
  describe('constructor', () => {
    it('throws an error if no contract address is provided', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ReserveAuctionETH(wallet, 420);
      }).toThrow('Invariant failed: chainId: 420 is not currently supported');
    });

    it('throws an error if chainId does not map to a deployed instance', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ReserveAuctionETH(wallet, 69);
      }).toThrow('Invariant failed: chainId: 69 is not currently supported');
    });

    it('throws an error if the contract address is not valid', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ReserveAuctionETH(wallet, 1, 'poop pee');
      }).toThrow('Invariant failed: poop pee is not a valid address');
    });

    it('sets the instance to readOnly=false if signer is present', () => {
      const wallet = Wallet.createRandom();
      const reserveAuction = new ReserveAuctionETH(wallet, 4);

      expect(reserveAuction.readOnly).toBe(false);
    });

    it('sets the instance to readOnly if provider is specified', () => {
      const provider = new JsonRpcProvider();
      const reserveAuction = new ReserveAuctionETH(
        provider,
        4,
        zoraAddresses.rinkeby.reserveAuctionETH
      );

      expect(reserveAuction.readOnly).toBe(true);
    });

    it('initializes an instance with the checksummed address', () => {
      const wallet = Wallet.createRandom();
      const rinkebyAddress = zoraAddresses.rinkeby.reserveAuctionETH;
      const reserveAuction = new ReserveAuctionETH(wallet, 4);

      expect(reserveAuction.contractAddress).toEqual(rinkebyAddress);
    });
  });

  // CONTRACT FUNCTIONS

  describe('contract functions', () => {
    let reserveAuctionConfig: ZoraReserveAuctionConfiguredAddresses;
    const provider = new JsonRpcProvider();
    const [mainWallet, otherWallet] = generatedWallets(provider);

    beforeEach(async () => {
      await blockchain.resetAsync();
      reserveAuctionConfig = await setupZoraAuctions(mainWallet);
    });

    describe('write functions', () => {
      let defaultAuctionData: AuctionInputDataETH;

      beforeEach(async () => {
        defaultAuctionData = {
          tokenContractAddress: reserveAuctionConfig.erc721Test.address,
          tokenId: 1,
          duration: 6000,
          reservePrice: 420,
          sellerFundsRecipient: mainWallet.address,
          startTime: 2,
        };
      });

      describe('createAuction', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const reserveAuction = new ReserveAuctionETH(
            provider,
            50,
            reserveAuctionConfig.reserveAuctionETH
          );

          expect(reserveAuction.readOnly).toBe(true);

          await expect(
            reserveAuction.createAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              defaultAuctionData.sellerFundsRecipient,
              defaultAuctionData.startTime
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the token contract address is not valid', async () => {
          const reserveAuction = new ReserveAuctionETH(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionETH
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.createAuction(
              'pee pee poo poo',
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              defaultAuctionData.sellerFundsRecipient,
              defaultAuctionData.startTime
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input seller funds recipient address is not valid', async () => {
          const reserveAuction = new ReserveAuctionETH(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionETH
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.createAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              'pee pee poo poo',
              defaultAuctionData.startTime
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('creates an auction', async () => {
          const reserveAuction = new ReserveAuctionETH(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionETH
          );
          expect(reserveAuction.readOnly).toBe(false);

          // Setup ERC721 and mint
          const erc721 = new Contract(
            reserveAuctionConfig.erc721,
            reserveAuctionConfig.erc721Test.interface,
            mainWallet
          );
          const nftTx = await erc721.mint(mainWallet.address, 1);
          await nftTx.wait();

          // Approve Transfer Helper
          const approveTransferTx = await erc721.setApprovalForAll(
            reserveAuctionConfig.erc721TransferHelper,
            true
          );
          await approveTransferTx.wait();
          expect(approveTransferTx.hash).toBeDefined();

          const moduleManager = new ZoraModuleManager(
            mainWallet,
            50,
            reserveAuctionConfig.moduleManagerTest.address
          );
          const registerModuleTx = await moduleManager.registerModule(
            reserveAuctionConfig.reserveAuctionETH
          );
          await registerModuleTx.wait();
          blockchain.waitBlocksAsync(4);

          const tx = await reserveAuction.createAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId,
            defaultAuctionData.duration,
            defaultAuctionData.reservePrice,
            defaultAuctionData.sellerFundsRecipient,
            defaultAuctionData.startTime
          );
          await tx.wait();

          reserveAuction.contract.on(
            'AuctionCreated',
            (
              tokenContract: string,
              tokenId: BigNumber,
              auction: AuctionStructETH
            ) => {
              expect(tokenContract).toEqual(
                defaultAuctionData.tokenContractAddress
              );
              expect(tokenId).toEqual(
                BigNumber.from(defaultAuctionData.tokenId)
              );
              expect(auction.duration).toEqual(
                BigNumber.from(defaultAuctionData.duration)
              );
              expect(auction.reservePrice).toEqual(
                BigNumber.from(defaultAuctionData.reservePrice)
              );
              expect(auction.sellerFundsRecipient).toEqual(
                defaultAuctionData.sellerFundsRecipient
              );
              expect(auction.startTime).toEqual(
                BigNumber.from(defaultAuctionData.startTime)
              );
            }
          );

          expect(tx.hash).toBeDefined();
          // clear listeners
          reserveAuction.contract.removeAllListeners('AuctionCreated');
        });
      });
    });
  });
});
