// catalog.test.ts
// Jest test suite for Catalog class

import {
  Catalog,
  TokenData,
  Proof,
  generateMerkleTree,
  generateMerkleProofs,
  generateMerkleRootFromTree,
  generateMerkleProof,
  ContentData,
  sha256FromHexString,
} from '../src';
import {Wallet} from '@ethersproject/wallet';
import {JsonRpcProvider} from '@ethersproject/providers';
import {addresses as CatalogAddresses} from '../src/addresses';
import {BigNumber, Bytes} from 'ethers';
import {BytesLike, formatUnits} from 'ethers/lib/utils';
import {AddressZero} from '@ethersproject/constants';
import {Catalog__factory} from '@catalogworks/catalog-contracts/dist/types/typechain';
import {Blockchain} from './utils/blockchain';
import {generatedWallets} from './utils/wallets';
import {setupCatalog, CatalogConfiguredAddresses} from './helpers';
import {waffleJest} from '@ethereum-waffle/jest';
const provider = new JsonRpcProvider();
const blockchain = new Blockchain(provider);

jest.setTimeout(30000);
expect.extend(waffleJest);

describe('Catalog', () => {
  describe('constructor', () => {
    // 01
    it('throws an error if no contract address is provided with an invalid chain', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new Catalog(wallet, 420);
      }).toThrow('Invariant failed: chainId: 420 is not currently supported');
    });

    // 02
    it('throws an error if the chainId does not map to a deployed instance of the catalog contract', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new Catalog(wallet, 69);
      }).toThrow('Invariant failed: chainId: 69 is not currently supported');
    });

    // 03
    it('throws an error if the contract address is not a valid ethereum address', () => {
      const wallet = Wallet.createRandom();

      expect(() => {
        new Catalog(wallet, 4, 'pee in me pants');
      }).toThrow('Invariant failed: pee in me pants is not a valid address');
    });

    // 04
    it('sets the Catalog instance to readOnly=false if signer is specified', () => {
      const wallet = Wallet.createRandom();
      const catalog = new Catalog(wallet, 4);

      expect(catalog.readOnly).toBe(false);
    });

    // 05
    it('sets the Catalog instance of readOnly=true is a Provider is specified', () => {
      const provider = new JsonRpcProvider();
      const catalog = new Catalog(
        provider,
        4,
        CatalogAddresses.rinkeby.Catalog
      );

      expect(catalog.readOnly).toBe(true);
    });

    // 06
    it('initializes a Catalog instance with the checksummed contract address for the specific chainId', () => {
      const wallet = Wallet.createRandom();
      const rinkebyAddress = CatalogAddresses['rinkeby'].catalog;
      const catalog = new Catalog(wallet, 4);

      expect(catalog.contractAddress).toBe(rinkebyAddress);
    });
  });

  // CONTRACT FUNCTIONS

  describe('contract functions', () => {
    let catalogConfig: CatalogConfiguredAddresses;
    const provider = new JsonRpcProvider();
    const [mainWallet, otherWallet] = generatedWallets(provider);

    beforeEach(async () => {
      await blockchain.resetAsync();
      catalogConfig = await setupCatalog(mainWallet);
    });

    // 01
    describe('write functions', () => {
      let defaultTokendata: TokenData;
      let defaultContentData: ContentData;
      let defaultProof: Proof;
      let otherProof: Proof;
      let metadata: string;
      let content: string;
      let contentHash: BytesLike;
      let defaultRoot: string;

      beforeEach(() => {
        metadata = 'https://catalog.com/metadata';
        content = 'https://catalog.com/content';
        contentHash = sha256FromHexString(
          '0xE1447C16F5DA1173C488CD2D3450415E7677D1E65D28CFA957E96A660FFDEA97'
        );

        defaultTokendata = {
          metadataURI: metadata,
          creator: mainWallet.address,
          royaltyPayout: mainWallet.address,
          royaltyBPS: 1000,
        };

        defaultContentData = {
          contentURI: content,
          contentHash: contentHash,
        };

        // generate proof/tree/root
        const tree = generateMerkleTree([
          mainWallet.address,
          otherWallet.address,
        ]);

        const mainProof = generateMerkleProof(tree, mainWallet.address);
        otherProof = generateMerkleProof(tree, otherWallet.address);
        defaultRoot = generateMerkleRootFromTree(tree);
        defaultProof = mainProof;
      });

      // 02 Update Content URI
      describe('update content URI', () => {
        it('throws error on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.updateContentURI(1, defaultContentData)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('throws an error if the input URI is not valid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );
          const tempContentData = {
            contentURI: 'http://pee.com',
            contentHash: contentHash,
          };
          await expect(
            catalog.updateContentURI(1, tempContentData)
          ).rejects.toThrowError(
            'Invariant failed: http://pee.com must begin with `https://` or `ipfs://`'
          );
        });

        // TODO: write a better test for this, capture event
        it('succesfully updates the contentURI for a token', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          // update contentURI
          const updateTx = await catalog.updateContentURI(
            1,
            defaultContentData
          );
          const receipt = await updateTx.wait();

          // capture event (not sure how in jest here rn)
        });
      });

      describe('updateMetadataURI', () => {
        it('throws an eror if called on readOnly instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.updateMetadataURI(0, metadata)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('throws an error if metadataURI is invalid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );
          await expect(
            catalog.updateMetadataURI(0, 'http://pee.com')
          ).rejects.toThrowError(
            'Invariant failed: http://pee.com must begin with `https://` or `ipfs://`'
          );
        });

        it('succesfully updates the metadataURI for a token', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          // assertion check
          const metadataURI = await catalog.fetchMetadataURI(1);
          expect(metadataURI).toEqual(defaultTokendata.metadataURI);

          // update metadataURI
          await catalog.updateMetadataURI(
            1,
            'https://catalog.com/new-metadata'
          );

          const newMetadataURI = await catalog.fetchMetadataURI(1);
          expect(newMetadataURI).toEqual('https://catalog.com/new-metadata');
        });
      });

      describe('update royalty info', () => {
        it('throws an erorr if called on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.updateRoyaltyInfo(0, mainWallet.address)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('throws an error if the input address is not valid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );
          const invalidAddress = 'pooppee';

          expect(catalog.readOnly).toBe(false);

          await expect(
            catalog.updateRoyaltyInfo(1, invalidAddress)
          ).rejects.toThrowError(
            'Invariant failed: pooppee is not a valid address'
          );
        });

        it('succesffuly updates the royalty information', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          expect(catalog.readOnly).toBe(false);

          await catalog.updateRoyaltyInfo(1, otherWallet.address);

          await expect(catalog.fetchRoyaltyPayoutAddress(1)).resolves.toEqual(
            otherWallet.address
          );
        });
      });

      describe('update merkle root', () => {
        it('throws an error if called on a read only insance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(catalog.updateRoot(defaultRoot)).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('throws an error if the input root is not valid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          const invalidRoot = 'poopee';
          expect(catalog.readOnly).toBe(false);

          await expect(catalog.updateRoot(invalidRoot)).rejects.toThrowError(
            'Invariant failed: poopee is not a valid Bytes32 hex string'
          );
        });

        it('succesfully updates the merkle root', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          expect(catalog.readOnly).toBe(false);
          await catalog.updateRoot(defaultRoot);

          await expect(catalog.fetchMerkleRoot()).resolves.toEqual(defaultRoot);
        });
      });

      describe('updateCreator', () => {
        it('throws an error if called on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.updateCreator(1, mainWallet.address)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('throws an error if the address is invalid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);

          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          expect(catalog.readOnly).toBe(false);

          await expect(
            catalog.updateCreator(1, 'pooppee')
          ).rejects.toThrowError(
            'Invariant failed: pooppee is not a valid address'
          );
        });

        it('succesfully updates the creator from admin account', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);

          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          expect(catalog.readOnly).toBe(false);

          await catalog.updateCreator(1, otherWallet.address);

          await expect(catalog.fetchCreator(1)).resolves.toEqual(
            otherWallet.address
          );
        });
      });

      describe('mint', () => {
        it('throws an error if called on read only instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.mint(defaultTokendata, defaultContentData, defaultProof)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('throws an erorr if the metadataURIs are invalid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);

          const invalidTokenData: TokenData = {
            metadataURI: 'http://pee.com',
            creator: mainWallet.address,
            royaltyPayout: mainWallet.address,
            royaltyBPS: 1000,
          };
          expect(catalog.readOnly).toBe(false);

          await expect(
            catalog.mint(invalidTokenData, defaultContentData, defaultProof)
          ).rejects.toThrowError(
            'Invariant failed: http://pee.com must begin with `https://` or `ipfs://`'
          );
        });

        it('throws an error if the contentURIs are invalid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);

          const invalidTokenData: TokenData = {
            metadataURI: 'https://pee.com',
            creator: mainWallet.address,
            royaltyPayout: mainWallet.address,
            royaltyBPS: 1000,
          };

          const invalidContentData: ContentData = {
            contentURI: 'http://pee.com',
            contentHash: '0x0',
          };
          expect(catalog.readOnly).toBe(false);

          await expect(
            catalog.mint(invalidTokenData, invalidContentData, defaultProof)
          ).rejects.toThrowError(
            'Invariant failed: http://pee.com must begin with `https://` or `ipfs://`'
          );
        });

        it('throws an error if the proof is invalid', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);

          const invalidProof: Proof = {
            proof: ['0x0'],
          };
          expect(catalog.readOnly).toBe(false);

          await expect(
            catalog.mint(defaultTokendata, defaultContentData, invalidProof)
          ).rejects.toThrowError(
            'Invariant failed: 0x0 is not a valid Bytes32 hex string'
          );
        });

        it('sucessfully mints a token', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);

          expect(catalog.readOnly).toBe(false);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          const tokenOwner = await catalog.fetchOwnerOf(1);
          const creator = await catalog.fetchCreator(1);
          const onChainMetadataURI = await catalog.fetchMetadataURI(1);
          // TODO: check for contentURI validity (event)
          expect(tokenOwner.toLowerCase()).toBe(
            mainWallet.address.toLowerCase()
          );
          expect(creator.toLowerCase()).toBe(mainWallet.address.toLowerCase());
          expect(onChainMetadataURI).toEqual(defaultTokendata.metadataURI);
        });
      });

      describe('burn', () => {
        it('throws an error on readOnly instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(catalog.burn(1)).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('burns a token', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          const tokenOwner = await catalog.fetchOwnerOf(1);
          expect(tokenOwner.toLowerCase()).toBe(
            mainWallet.address.toLowerCase()
          );

          const tx = await catalog.burn(1);
          const test = await tx.wait();

          // super janky way of checking this lol
          const event = test.events?.find((e) => e.event === 'Transfer');
          expect(event?.event?.toLowerCase()).toBe('transfer');
          // expect(event).toEqual('Transfer');
        });
      });

      describe('approve', () => {
        it('throws an error if called on readOnly instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.approve(otherWallet.address, 1)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('grants approval for another address', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          const nullApproved = await catalog.fetchApproved(1);
          expect(nullApproved).toBe(AddressZero);

          await catalog.approve(otherWallet.address, 1);
          const approved = await catalog.fetchApproved(1);
          expect(approved.toLowerCase()).toBe(
            otherWallet.address.toLowerCase()
          );
        });
      });

      describe('set Approval for all', () => {
        it('throws an error if called on a readOnly instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.setApprovalForAll(otherWallet.address, true)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('sets approval for another address for all tokens owned by signer', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          const notApproved = await catalog.fetchIsApprovedForAll(
            mainWallet.address,
            otherWallet.address
          );
          expect(notApproved).toBe(false);

          await catalog.setApprovalForAll(otherWallet.address, true);
          const approved = await catalog.fetchIsApprovedForAll(
            mainWallet.address,
            otherWallet.address
          );
          expect(approved).toBe(true);

          await catalog.setApprovalForAll(otherWallet.address, false);
          const revoked = await catalog.fetchIsApprovedForAll(
            mainWallet.address,
            otherWallet.address
          );
          expect(revoked).toBe(false);
        });
      });

      describe('transferFrom', () => {
        it('throws an error if called on a readOnly instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.transferFrom(mainWallet.address, otherWallet.address, 1)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('transfers the token to another address', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          const tokenOwner = await catalog.fetchOwnerOf(1);
          expect(tokenOwner.toLowerCase()).toBe(
            mainWallet.address.toLowerCase()
          );

          await catalog.transferFrom(
            mainWallet.address,
            otherWallet.address,
            1
          );
          const newOwner = await catalog.fetchOwnerOf(1);
          expect(newOwner.toLowerCase()).toBe(
            otherWallet.address.toLowerCase()
          );
        });
      });

      describe('safe transfer from', () => {
        it('throws an erorr if called on readOnly instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.safeTransferFrom(mainWallet.address, otherWallet.address, 1)
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });

        it('transfers the token to another address', async () => {
          const catalog = new Catalog(mainWallet, 50, catalogConfig.cnft);
          await catalog.initialize('catalog', 'CTST');
          await catalog.updateRoot(defaultRoot);
          await catalog.mint(
            defaultTokendata,
            defaultContentData,
            defaultProof
          );

          const tokenOwner = await catalog.fetchOwnerOf(1);
          expect(tokenOwner.toLowerCase()).toBe(
            mainWallet.address.toLowerCase()
          );

          await catalog.safeTransferFrom(
            mainWallet.address,
            otherWallet.address,
            1
          );
          const newOwner = await catalog.fetchOwnerOf(1);
          expect(newOwner.toLowerCase()).toBe(
            otherWallet.address.toLowerCase()
          );
        });
      });

      describe('initializer', () => {
        it('throws an error if called on readOnly instance', async () => {
          const provider = new JsonRpcProvider();
          const catalog = new Catalog(provider, 50, catalogConfig.cnft);
          expect(catalog.readOnly).toBe(true);

          await expect(
            catalog.initialize('catalog', 'CTST')
          ).rejects.toThrowError(
            'ensureReadOnly: Cannot modify read-only instance'
          );
        });
      });
    });
  });
});
