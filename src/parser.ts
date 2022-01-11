// parser.ts
// metadata parser utility class

import {validateVersion} from './versions';
import {MetadataLike} from './types';

export class Parser {
  public name: string;
  public calVer: string;

  constructor(version: string) {
    validateVersion(version);

    const [name, calVer] = version.split('-');
    this.name = name;
    this.calVer = calVer;
  }

  // Parse JSON string
  public parse(json: string): MetadataLike {
    const parsed: MetadataLike = JSON.parse(json);
    return parsed;
  }
}
