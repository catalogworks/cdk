// validator.ts
// json validator utility class
import {Validator as JsonValidator} from 'jsonschema';
import {validateVersion} from './versions';

export class Validator {
  public name: string;
  public calVer: string;

  constructor(version: string) {
    validateVersion(version);

    const [name, calVer] = version.split('-');
    this.name = name;
    this.calVer = calVer;
  }

  // validate a json object against a schema
  // @param {object} json - json object to validate
  public validate(json: {[key: string]: unknown}): boolean {
    const jsonValidator = new JsonValidator();
    const schema = require(`./schemas/${this.name}/${this.calVer}.json`);
    return jsonValidator.validate(json, schema).valid;
  }
}
