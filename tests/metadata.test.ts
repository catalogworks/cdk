// metadata.test.ts
// jest test suite for exported Metadata functions

import {
  generateMetadata,
  parseMetadata,
  validateMetadata,
} from '../src/metadata';
import {Catalog20210202, Mnft20220222, Catalog20220222} from '../src';

describe('Metadata tests', () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function isCatalogSchema(json: Object): json is Catalog20210202 {
    // nasty
    return (
      'name' in json &&
      'mimeType' in json &&
      'version' in json &&
      'description' in json
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  function isMnftSchema(json: Object): json is Catalog20220222 {
    return (
      'name' in json &&
      'mimeType' in json &&
      'version' in json &&
      'duration' in json &&
      'title' in json &&
      'license' in json &&
      'losslessAudio' in json &&
      'image' in json &&
      'external_url' in json &&
      'animation_url' in json
    );
  }

  // 01
  describe('generate metadata', () => {
    it('generates the metadata', () => {
      const expected = require('./fixtures/catalog20220000-minified.json');
      const metadata = generateMetadata('catalog-20220000', {
        name: 'test name',
        description: 'catalogworks',
        version: 'catalog-20210202',
        mimeType: 'application/json',
      });

      expect(metadata).toBe(JSON.stringify(expected));
    });

    it('throws erorr if unsupported version is specified', () => {
      expect(() => {
        generateMetadata('catalog-999999', {});
      }).toThrow('Unsupported version: 999999');
    });
  });

  describe('parse metadata', () => {
    it('parses the metadata', () => {
      const json = {
        description: 'poop',
        mimeType: 'application/json',
        name: 'pee',
        version: 'catalog-20210202',
      };

      const result = parseMetadata('catalog-20210202', JSON.stringify(json));
      expect(isCatalogSchema(result)).toBe(true);
      expect(result).toMatchObject(json);
    });

    it('parses the new catalog metadata format', () => {
      const inputJson = {
        artist: 'COMPUTER DATA',
        version: 'catalog-20220222',
        title: 'pp100',
        duration: 363.696,
        mimeType: 'audio/wav',
        license: 'All Rights Reserved',
        losslessAudio: 'ipfs://QmfVHFpVpHgVoeQjSXp37KeFABpUNGB3ai2oMt3L8sFaxZ',
        image:
          'https://ipfs.io/ipfs/bafybeiblre5chsbifqtpsrq5akxsqc5wzvyrn6py2423a4hly4jibq3vgi',
        name: 'COMPUTER DATA - pp100',
        external_url: 'https://beta.catalog.works/computerdata/pp100',
        animation_url:
          'https://ipfs.io/ipfs/QmUY3er2YV372dbv9PTdLGGjudHWrSJefBu54FEXELMjfh',
      };

      const result = parseMetadata(
        'catalog-20220222',
        JSON.stringify(inputJson)
      );
      console.log('RESULTY', result);
      expect(isMnftSchema(result)).toBe(true);
      expect(result).toMatchObject(inputJson);
    });

    it('throws erorr if unsupported version is specified', () => {
      expect(() => {
        parseMetadata('catalog-999999', '{}');
      }).toThrow('Unsupported version: 999999');
    });
  });

  describe('validate metadata', () => {
    it('throws error if an unsupported version is specified', () => {
      expect(() => {
        validateMetadata('catalog-999999', {});
      }).toThrow('Unsupported version: 999999');
    });
    it('validates the metadata and returns true given valid schema', () => {
      const json = {
        description: 'poop',
        mimeType: 'application/json',
        name: 'pee',
        version: 'catalog-20220000',
      };

      const result = validateMetadata('catalog-20220000', json);
      expect(result).toBe(true);
    });

    it('doesnt validate metadata, returns false given bad schema', () => {
      const json = {
        description: 'poop',
        mimeType: 'application/json',
        name: 'pee',
        version: 'catalog-999999',
        testPoo: 'PeePee',
      };

      const result = validateMetadata('catalog-20210202', json);
      expect(result).toBe(false);
    });

    it('validates the mnft metadata schema', () => {
      const inputJson = {
        artist: 'COMPUTER DATA',
        version: 'catalog-20220222',
        title: 'pp100',
        duration: 363.696,
        mimeType: 'audio/wav',
        losslessAudio: 'ipfs://QmfVHFpVpHgVoeQjSXp37KeFABpUNGB3ai2oMt3L8sFaxZ',
        image:
          'https://ipfs.io/ipfs/bafybeiblre5chsbifqtpsrq5akxsqc5wzvyrn6py2423a4hly4jibq3vgi',
        name: 'COMPUTER DATA - pp100',
        external_url: 'https://beta.catalog.works/computerdata/pp100',
        animation_url:
          'https://ipfs.io/ipfs/QmUY3er2YV372dbv9PTdLGGjudHWrSJefBu54FEXELMjfh',
      };
      const validateResult = validateMetadata('catalog-20220222', inputJson);
      expect(validateResult).toBe(true);
    });
  });
});
