// metadata.ts
// Utility functions to generate valid Catalog metadata

import { validateVersion, supportedVersions, supportedVersionsTypeMapping} from './versions';
import { Generator } from './generator';
import { Parser } from './parser';
import { Validator } from './validator';


import { Catalog20210202 as MetadataTypes } from './types';

// Type  & function exports to contain to Metadata
export { validateVersion, supportedVersions, supportedVersionsTypeMapping };
export { MetadataTypes };
export type JSONLike = { [key: string]: any};


// Generate ordered and minified JSOn for the specified schema version
// @param {string} version - version of schema to validate against
// @param {JSONLike} data - input data to generate metadata from
// @returns {string} - valid json schema minified
export const generateMetadata = (version: string, data: JSONLike): string => {
    const generator = new Generator(version);
    return generator.generateJSON(data);
};

// Parse metadata into the schema versions interface
// @param {string} version - version of schema to parse against
// @param {string} json - input minified json to parse metadata from
export const parseMetadata = (version: string, json: string) => {
    const parser = new Parser(version);
    return parser.parse(json);
};

// Validate metadata against the schema versions
// @param {string} version - version of schema to validate against
// @param {JSONLike} data - input metadata to validate schema against
export const validateMetadata = (version: string, data: JSONLike): boolean => {
    const validator = new Validator(version);
    return validator.validate(data);
};



