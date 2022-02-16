// zoramodulemanager.test.ts
// Jest test suite for ZoraModuleManager class

import {ZoraModuleManager} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {zoraAddresses} from '../src/addresses';
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

  describe('contract functions', () => {
    let moduleManagerConfig: ZoraConfiguredAddresses;
    const provider = new JsonRpcProvider();
    const [mainWallet, otherWallet] = generatedWallets(provider);

    beforeEach(async () => {
      await blockchain.resetAsync();
      moduleManagerConfig = await setupZora(mainWallet);
    });

    describe('setApprovalForModule', () => {
      // 01
      it('throws an erorr on read only instance', async () => {
        const provider = new JsonRpcProvider();
        const moduleManager = new ZoraModuleManager(
          provider,
          50,
          moduleManagerConfig.moduleManager
        );

        expect(moduleManager.readOnly).toBe(true);

        await expect(
          moduleManager.setApprovalForModule(moduleManagerConfig.asksV11, true)
        ).rejects.toThrow('ensureReadOnly: Cannot modify read-only instance');
      });

      // 02
      it('throws an error if the module address is not valid', async () => {
        const moduleManager = new ZoraModuleManager(
          mainWallet,
          50,
          moduleManagerConfig.moduleManager
        );

        await expect(
          moduleManager.setApprovalForModule('pee pee poo poo', true)
        ).rejects.toThrow(
          'Invariant failed: pee pee poo poo is not a valid address'
        );
      });
    });

    describe('setBatchApprovalForModules', () => {
      // 01
      it('throws an erorr on read only instance', async () => {
        const provider = new JsonRpcProvider();
        const moduleManager = new ZoraModuleManager(
          provider,
          50,
          moduleManagerConfig.moduleManager
        );

        expect(moduleManager.readOnly).toBe(true);

        await expect(
          moduleManager.setBatchApprovalForModules(
            [moduleManagerConfig.asksV11],
            true
          )
        ).rejects.toThrow('ensureReadOnly: Cannot modify read-only instance');
      });

      // 02
      it('throws an error if the module address is not valid', async () => {
        const moduleManager = new ZoraModuleManager(
          mainWallet,
          50,
          moduleManagerConfig.moduleManager
        );

        await expect(
          moduleManager.setBatchApprovalForModules(['pee pee poo poo'], true)
        ).rejects.toThrow(
          'Invariant failed: pee pee poo poo is not a valid address'
        );
      });
    });

    describe('setApprovalForModuleBySig', () => {
      // 01
      it('throws an erorr on read only instance', async () => {
        const provider = new JsonRpcProvider();
        const moduleManager = new ZoraModuleManager(
          provider,
          50,
          moduleManagerConfig.moduleManager
        );

        expect(moduleManager.readOnly).toBe(true);

        await expect(
          moduleManager.setApprovalForModuleBySig(
            moduleManagerConfig.asksV11,
            mainWallet.address,
            true,
            100,
            '0x',
            '0x',
            '0x'
          )
        ).rejects.toThrow('ensureReadOnly: Cannot modify read-only instance');
      });

      // 02
      it('throws an error if the module address is not valid', async () => {
        const moduleManager = new ZoraModuleManager(
          mainWallet,
          50,
          moduleManagerConfig.moduleManager
        );

        await expect(
          moduleManager.setApprovalForModuleBySig(
            'pee pee poo poo',
            mainWallet.address,
            true,
            100,
            '0x',
            '0x',
            '0x'
          )
        ).rejects.toThrow(
          'Invariant failed: pee pee poo poo is not a valid address'
        );
      });

      // 03
      it('throws an error if the wallet address is not valid', async () => {
        const moduleManager = new ZoraModuleManager(
          mainWallet,
          50,
          moduleManagerConfig.moduleManager
        );

        await expect(
          moduleManager.setApprovalForModuleBySig(
            moduleManagerConfig.asksV11,
            'pee pee poo poo',
            true,
            100,
            '0x',
            '0x',
            '0x'
          )
        ).rejects.toThrow(
          'Invariant failed: pee pee poo poo is not a valid address'
        );
      });
    });
  });
});
