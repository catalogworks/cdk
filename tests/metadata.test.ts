// metadata.test.ts
// jest test suite for exported Metadata functions

import {
  generateMetadata,
  parseMetadata,
  validateMetadata,
} from '../src/metadata';
import {Catalog20210202} from '../src';

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

    it('throws erorr if unsupported version is specified', () => {
      expect(() => {
        parseMetadata('catalog-999999', '{}');
      }).toThrow('Unsupported version: 999999');
    });
  });

  describe('validate metadata', () => {
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

    it('throws error if an unsupported version is specified', () => {
      expect(() => {
        validateMetadata('catalog-999999', {});
      }).toThrow('Unsupported version: 999999');
    });
  });
});
