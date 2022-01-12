// generator.ts
// metadata generator utility class

import {Validator} from './validator';
import {validateVersion} from './versions';

export class Generator {
  public name: string;
  public calVer: string;

  constructor(version: string) {
    validateVersion(version);

    const [name, calVer] = version.split('-');
    this.name = name;
    this.calVer = calVer;
  }

  // generate valid json schema
  // @param {object} json - json object to validate
  // @returns {string} - valid json schema minified
  public generateJSON(unorderedJSON: {[key: string]: any}): string {
    // validate the input schema
    const version = this.name.concat('-').concat(this.calVer);
    const validator = new Validator(version);
    const validated = validator.validate(unorderedJSON);

    if (!validated) {
      throw new Error(`Invalid JSON, does not conform to ${version} schema`);
    }

    // sort the json object
    const orderedJSON: {[key: string]: {}} = {};
    Object.keys(unorderedJSON)
      .sort()
      .forEach((key) => {
        orderedJSON[key] = unorderedJSON[key];
      });
    return JSON.stringify(orderedJSON);
  }
}
