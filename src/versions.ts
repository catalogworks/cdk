// versions.ts
// handles schema versioning

export const supportedVersions: {[key: string]: Array<string>} = {
  // Schema versions for Catalog Contracts
  catalog: ['20210202', '20220000', '20220222'],
};

export const supportedVersionsTypeMapping: {
  [key: string]: {[key: string]: string};
} = {
  // Schema versions for Catalog Contracts (mapping)
  catalog: {
    '20210202': 'Catalog20210202',
    '20220000': 'Catalog20220000',
    '20220222': 'Mnft20220222',
  },
};

// @param {string} version - version of schema to validate against
export const validateVersion = (version: string): void => {
  const [name, calVer] = version.split('-');
  // Name must exist in 'versions'
  if (!supportedVersions[name]) {
    throw new Error(`Unsupported version: ${name}`);
  }
  // CalVer must exist in 'versions'
  if (!supportedVersions[name].includes(calVer)) {
    throw new Error(`Unsupported version: ${calVer}`);
  }

  return;
};
