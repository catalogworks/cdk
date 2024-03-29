// reserveAuctionListingERC20.test.ts
// Jest test for ReserveAuctionListingERC20

import {
  AuctionInputDataListingERC20,
  AuctionStructListingERC20,
  ReserveAuctionListingERC20,
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
import {BigNumber, BigNumberish, Contract} from 'ethers';

const provider = new JsonRpcProvider();
const blockchain = new Blockchain(provider);

jest.setTimeout(30000);
expect.extend(waffleJest);

describe('Zora V3 ReserveAuctionListingERC20', () => {
  describe('constructor', () => {
    it('throws an error if no contract address is provided', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ReserveAuctionListingERC20(wallet, 420);
      }).toThrow('Invariant failed: chainId: 420 is not currently supported');
    });

    it('throws an error if chainId does not map to a deployed instance', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ReserveAuctionListingERC20(wallet, 69);
      }).toThrow('Invariant failed: chainId: 69 is not currently supported');
    });

    it('throws an error if the contract address is not valid', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ReserveAuctionListingERC20(wallet, 1, 'poop pee');
      }).toThrow('Invariant failed: poop pee is not a valid address');
    });

    it('sets the instance to readOnly=false if signer is present', () => {
      const wallet = Wallet.createRandom();
      const reserveAuction = new ReserveAuctionListingERC20(wallet, 4);

      expect(reserveAuction.readOnly).toBe(false);
    });

    it('sets the instance to readOnly if provider is specified', () => {
      const provider = new JsonRpcProvider();
      const reserveAuction = new ReserveAuctionListingERC20(
        provider,
        4,
        zoraAddresses.rinkeby.reserveAuctionListingErc20
      );

      expect(reserveAuction.readOnly).toBe(true);
    });

    it('initializes an instance with the checksummed address', () => {
      const wallet = Wallet.createRandom();
      const rinkebyAddress = zoraAddresses.rinkeby.reserveAuctionListingErc20;
      const reserveAuction = new ReserveAuctionListingERC20(wallet, 4);

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
      let defaultAuctionData: AuctionInputDataListingERC20;
      let defaultBidData: {
        amount: string;
        tokenContractAddress: string;
        tokenId: BigNumberish;
      };

      beforeEach(async () => {
        defaultAuctionData = {
          tokenContractAddress: reserveAuctionConfig.erc721Test.address,
          tokenId: 1,
          duration: 6000,
          reservePrice: '1',
          sellerFundsRecipient: mainWallet.address,
          startTime: 2,
          bidCurrency: reserveAuctionConfig.weth,
          listingFeeBPS: '10',
          listingFeeRecipient: mainWallet.address,
        };

        defaultBidData = {
          amount: '1',
          tokenContractAddress: reserveAuctionConfig.erc721Test.address,
          tokenId: 1,
        };
      });

      describe('createAuction', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const reserveAuction = new ReserveAuctionListingERC20(
            provider,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );

          expect(reserveAuction.readOnly).toBe(true);

          await expect(
            reserveAuction.createAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              defaultAuctionData.sellerFundsRecipient,
              defaultAuctionData.startTime,
              defaultAuctionData.bidCurrency,
              defaultAuctionData.listingFeeBPS,
              defaultAuctionData.listingFeeRecipient
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the token contract address is not valid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.createAuction(
              'pee pee poo poo',
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              defaultAuctionData.sellerFundsRecipient,
              defaultAuctionData.startTime,
              defaultAuctionData.bidCurrency,
              defaultAuctionData.listingFeeBPS,
              defaultAuctionData.listingFeeRecipient
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('throws an error if the input seller funds recipient address is not valid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.createAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              'pee pee poo poo',
              defaultAuctionData.startTime,
              defaultAuctionData.bidCurrency,
              defaultAuctionData.listingFeeBPS,
              defaultAuctionData.listingFeeRecipient
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('throws an error if the input currency address is invalid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          expect(reserveAuction.readOnly).toBe(false);
          await expect(
            reserveAuction.createAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              defaultAuctionData.sellerFundsRecipient,
              defaultAuctionData.startTime,
              'pee pee poo poo',
              defaultAuctionData.listingFeeBPS,
              defaultAuctionData.listingFeeRecipient
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 05
        it('throws an error if the input listing fee recipient address is invalid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );

          expect(reserveAuction.readOnly).toBe(false);
          await expect(
            reserveAuction.createAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId,
              defaultAuctionData.duration,
              defaultAuctionData.reservePrice,
              defaultAuctionData.sellerFundsRecipient,
              defaultAuctionData.startTime,
              defaultAuctionData.bidCurrency,
              defaultAuctionData.listingFeeBPS,
              'pee pee poo poo'
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 06
        it('creates an auction', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
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
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          await registerModuleTx.wait();
          blockchain.waitBlocksAsync(4);

          const tx = await reserveAuction.createAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId,
            defaultAuctionData.duration,
            defaultAuctionData.reservePrice,
            defaultAuctionData.sellerFundsRecipient,
            defaultAuctionData.startTime,
            defaultAuctionData.bidCurrency,
            defaultAuctionData.listingFeeBPS,
            defaultAuctionData.listingFeeRecipient
          );
          await tx.wait();

          reserveAuction.contract.on(
            'AuctionCreated',
            (
              tokenContract: string,
              tokenId: BigNumber,
              auction: AuctionStructListingERC20
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
              expect(auction.currency).toEqual(defaultAuctionData.bidCurrency);
              expect(auction.listingFeeBps).toEqual(
                BigNumber.from(defaultAuctionData.listingFeeBPS)
              );
              expect(auction.listingFeeRecipient).toEqual(
                defaultAuctionData.listingFeeRecipient
              );
            }
          );

          expect(tx.hash).toBeDefined();
          // clear listeners
          reserveAuction.contract.removeAllListeners('AuctionCreated');
        });
      });

      describe('cancelAuction', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const reserveAuction = new ReserveAuctionListingERC20(
            provider,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );

          expect(reserveAuction.readOnly).toBe(true);

          await expect(
            reserveAuction.cancelAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the token contract address is not valid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.cancelAuction(
              'pee pee poo poo',
              defaultAuctionData.tokenId
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 04
        it('cancels an auction', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
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
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          await registerModuleTx.wait();
          blockchain.waitBlocksAsync(4);

          const tx = await reserveAuction.createAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId,
            defaultAuctionData.duration,
            defaultAuctionData.reservePrice,
            defaultAuctionData.sellerFundsRecipient,
            defaultAuctionData.startTime,
            defaultAuctionData.bidCurrency,
            defaultAuctionData.listingFeeBPS,
            defaultAuctionData.listingFeeRecipient
          );
          await tx.wait();
          expect(tx.hash).toBeDefined();

          const cancelTx = await reserveAuction.cancelAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId
          );
          await cancelTx.wait();
          expect(cancelTx.hash).toBeDefined();

          reserveAuction.contract.on(
            'AuctionCanceled',
            (
              tokenContract: string,
              tokenId: BigNumber,
              auction: AuctionStructListingERC20
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
              expect(auction.currency).toEqual(defaultAuctionData.bidCurrency);
              expect(auction.listingFeeBps).toEqual(
                BigNumber.from(defaultAuctionData.listingFeeBPS)
              );
            }
          );

          // clear listeners
          reserveAuction.contract.removeAllListeners('AuctionCanceled');
        });
      });

      describe('createBid', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const reserveAuction = new ReserveAuctionListingERC20(
            provider,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );

          expect(reserveAuction.readOnly).toBe(true);

          await expect(
            reserveAuction.createBid(
              defaultBidData.tokenContractAddress,
              defaultBidData.tokenId,
              defaultBidData.amount
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the token contract address is not valid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.createBid(
              'pee pee poo poo',
              defaultBidData.tokenId,
              defaultBidData.amount
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('creates a bid', async () => {
          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            reserveAuctionConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
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
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          await registerModuleTx.wait();

          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(
              reserveAuctionConfig.reserveAuctionListingERC20,
              true
            );
          await approveModuleManagerTx.wait();

          // Approve ERC20 Transfer Helper
          const wethContract = new Contract(
            reserveAuctionConfig.weth,
            reserveAuctionConfig.wethTest.interface,
            mainWallet
          );
          const wethApproval = await wethContract.approve(
            reserveAuctionConfig.erc20TransferHelper,
            5000000
          );
          await wethApproval.wait();

          blockchain.waitBlocksAsync(4);

          const tx = await reserveAuction.createAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId,
            defaultAuctionData.duration,
            defaultAuctionData.reservePrice,
            defaultAuctionData.sellerFundsRecipient,
            defaultAuctionData.startTime,
            defaultAuctionData.bidCurrency,
            defaultAuctionData.listingFeeBPS,
            defaultAuctionData.listingFeeRecipient
          );
          await tx.wait();
          expect(tx.hash).toBeDefined();

          const bidTx = await reserveAuction.createBid(
            defaultBidData.tokenContractAddress,
            defaultBidData.tokenId,
            defaultBidData.amount
          );
          await bidTx.wait();
          expect(bidTx.hash).toBeDefined();

          reserveAuction.contract.on(
            'AuctionBid',
            (
              tokenContractAddress: string,
              tokenId: BigNumber,
              firstBid: boolean,
              extended: boolean,
              auction: AuctionStructListingERC20
            ) => {
              expect(tokenContractAddress).toEqual(
                defaultBidData.tokenContractAddress
              );
              expect(tokenId).toEqual(BigNumber.from(defaultBidData.tokenId));
              expect(firstBid).toEqual(true);
              expect(extended).toEqual(false);
              expect(auction.highestBid).toEqual(
                BigNumber.from(defaultBidData.amount)
              );
              expect(auction.currency).toEqual(defaultAuctionData.bidCurrency);
              expect(auction.listingFeeRecipient).toEqual(
                defaultAuctionData.listingFeeRecipient
              );
            }
          );

          // clear listeners
          reserveAuction.contract.removeAllListeners('AuctionBid');
        });
      });

      describe('setAuctionReservePrice', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const reserveAuction = new ReserveAuctionListingERC20(
            provider,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );

          expect(reserveAuction.readOnly).toBe(true);

          await expect(
            reserveAuction.setAuctionReservePrice(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId,
              defaultAuctionData.reservePrice
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the token contract address is not valid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.setAuctionReservePrice(
              'pee pee poo poo',
              defaultAuctionData.tokenId,
              defaultAuctionData.reservePrice
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03

        it('sets the auction reservePrice', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
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
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          await registerModuleTx.wait();
          blockchain.waitBlocksAsync(4);

          const tx = await reserveAuction.createAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId,
            defaultAuctionData.duration,
            defaultAuctionData.reservePrice,
            defaultAuctionData.sellerFundsRecipient,
            defaultAuctionData.startTime,
            defaultAuctionData.bidCurrency,
            defaultAuctionData.listingFeeBPS,
            defaultAuctionData.listingFeeRecipient
          );
          await tx.wait();
          expect(tx.hash).toBeDefined();

          const setReservePriceTx = await reserveAuction.setAuctionReservePrice(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId,
            defaultAuctionData.reservePrice
          );
          await setReservePriceTx.wait();
          expect(setReservePriceTx.hash).toBeDefined();

          reserveAuction.contract.on(
            'AuctionReservePriceUpdated',
            (
              tokenContractAddress: string,
              tokenId: BigNumber,
              auction: AuctionStructListingERC20
            ) => {
              expect(tokenContractAddress).toEqual(
                defaultAuctionData.tokenContractAddress
              );
              expect(tokenId).toEqual(
                BigNumber.from(defaultAuctionData.tokenId)
              );
              expect(auction.reservePrice).toEqual(
                BigNumber.from(defaultAuctionData.reservePrice)
              );
              expect(auction.currency).toEqual(defaultAuctionData.bidCurrency);
              expect(auction.listingFeeRecipient).toEqual(
                defaultAuctionData.listingFeeRecipient
              );
            }
          );

          // clear listeners
          reserveAuction.contract.removeAllListeners(
            'AuctionReservePriceUpdated'
          );
        });
      });

      describe('settleAuction', () => {
        // 01
        it('throws an error on a read only instance', async () => {
          const provider = new JsonRpcProvider();
          const reserveAuction = new ReserveAuctionListingERC20(
            provider,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );

          expect(reserveAuction.readOnly).toBe(true);

          await expect(
            reserveAuction.settleAuction(
              defaultAuctionData.tokenContractAddress,
              defaultAuctionData.tokenId
            )
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        // 02
        it('throws an error if the token contract address is not valid', async () => {
          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          expect(reserveAuction.readOnly).toBe(false);

          await expect(
            reserveAuction.settleAuction(
              'pee pee poo poo',
              defaultAuctionData.tokenId
            )
          ).rejects.toThrowError(
            'Invariant failed: pee pee poo poo is not a valid address'
          );
        });

        // 03
        it('settles an auction', async () => {
          // Wrap some eth first
          const wethTx = await wrapETH(
            mainWallet,
            reserveAuctionConfig.weth,
            BigNumber.from(50)
          );
          await wethTx.wait();

          const reserveAuction = new ReserveAuctionListingERC20(
            mainWallet,
            50,
            reserveAuctionConfig.reserveAuctionListingERC20
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
            reserveAuctionConfig.reserveAuctionListingERC20
          );
          await registerModuleTx.wait();
          const approveModuleManagerTx =
            await moduleManager.setApprovalForModule(
              reserveAuctionConfig.reserveAuctionListingERC20,
              true
            );
          await approveModuleManagerTx.wait();

          // Approve ERC20 Transfer Helper
          const wethContract = new Contract(
            reserveAuctionConfig.weth,
            reserveAuctionConfig.wethTest.interface,
            mainWallet
          );
          const wethApproval = await wethContract.approve(
            reserveAuctionConfig.erc20TransferHelper,
            5000000
          );
          await wethApproval.wait();

          blockchain.waitBlocksAsync(4);

          const tx = await reserveAuction.createAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId,
            1,
            defaultAuctionData.reservePrice,
            defaultAuctionData.sellerFundsRecipient,
            defaultAuctionData.startTime,
            defaultAuctionData.bidCurrency,
            defaultAuctionData.listingFeeBPS,
            defaultAuctionData.listingFeeRecipient
          );
          await tx.wait();
          expect(tx.hash).toBeDefined();

          const bidTx = await reserveAuction.createBid(
            defaultBidData.tokenContractAddress,
            defaultBidData.tokenId,
            defaultBidData.amount
          );
          await bidTx.wait();
          expect(bidTx.hash).toBeDefined();

          blockchain.increaseTimeAsync(40);
          blockchain.waitBlocksAsync(4);

          const settleTx = await reserveAuction.settleAuction(
            defaultAuctionData.tokenContractAddress,
            defaultAuctionData.tokenId
          );
          await settleTx.wait();
          expect(settleTx.hash).toBeDefined();
        });
      });
    });
  });
});
