// reserveAuctionETH.test.ts
// Jest test for ReserveAuctionETH

import {
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
});
