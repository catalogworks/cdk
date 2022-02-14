// asksv11.test.ts
// Jest test suite for AsksV11 class

import {AsksV11, ZoraModuleManager} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {zoraAddresses} from '../src/addresses';
import {BytesLike, formatUnits} from 'ethers/lib/utils';
import {AddressZero} from '@ethersproject/constants';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';

import {setupZora, ZoraConfiguredAddresses} from './helpers';
import {waffleJest} from '@ethereum-waffle/jest';

const provider = new JsonRpcProvider();
const blockchain = new Blockchain(provider);

jest.setTimeout(30000);
expect.extend(waffleJest);

describe('Zora V3', () => {
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
});
