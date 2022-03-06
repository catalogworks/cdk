// 0xsplits.test.ts
// Jest test suite for ZeroXSplits class

import {ZeroXSplits} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {waffleJest} from '@ethereum-waffle/jest';
import {splitsAddresses} from '../src/addresses';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';
import {setupSplits, SplitConfiguredAddresses} from './helpers';
import {BigNumber, Contract} from 'ethers';
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
      const rinkebyAddress = splitsAddresses.rinkeby.splits;
      const splits = new ZeroXSplits(wallet, 4);
      expect(splits.contractAddress).toEqual(rinkebyAddress);
    });
  });
});
