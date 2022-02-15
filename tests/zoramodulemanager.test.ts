// asksv11.test.ts
// Jest test suite for AsksV11 class

import {ZoraModuleManager} from '../src';
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

describe('Zora V3 Module Manager', () => {
  describe('constructor', () => {
    it('throws an error if no contract address is provided with an invalid chain', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ZoraModuleManager(wallet, 420);
      }).toThrow('Invariant failed: chainId: 420 is not currently supported');
    });

    it('throws an error if chainId does not map to a deployed instance', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ZoraModuleManager(wallet, 69);
      }).toThrow('Invariant failed: chainId: 69 is not currently supported');
    });

    it('throws an error if the contract address is not valid', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new ZoraModuleManager(wallet, 4, 'pee pee poo poo');
      }).toThrow('Invariant failed: pee pee poo poo is not a valid address');
    });

    it('sets the instance to readOnly=false if signer is specified', () => {
      const wallet = Wallet.createRandom();
      const moduleManager = new ZoraModuleManager(wallet, 4);

      expect(moduleManager.readOnly).toBe(false);
    });

    it('sets the instance to readOnly if a provider is specified', () => {
      const provider = new JsonRpcProvider();
      const moduleManager = new ZoraModuleManager(
        provider,
        4,
        zoraAddresses.rinkeby.asks
      );

      expect(moduleManager.readOnly).toBe(true);
    });

    it('initializes an instance with the checksum address for specific chainId', () => {
      const wallet = Wallet.createRandom();
      const rinkebyAddress = zoraAddresses.rinkeby.moduleManager;
      const moduleManager = new ZoraModuleManager(wallet, 4);

      expect(moduleManager.contractAddress).toEqual(rinkebyAddress);
    });
  });

  // CONTRACT FUNCTIONS
});
