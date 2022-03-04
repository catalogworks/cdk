// offersv1.test.ts
// Jest test suite for OffersV1 class

import {ZoraModuleManager, OffersV1, OfferData, AsksV11} from '../src';
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
      }).toThrow(
        'Invariant failed: contractAddress: pee pee poo poo is not a valid address'
      );
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
          amount: 100,
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
      });
    });
  });
});
