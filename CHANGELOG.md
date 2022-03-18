# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.7] - 2022-03-15

- rework import for `Signer` type on all exported classes

## [0.1.6] - 2022-03-10

- hotfix to include `Mnft20220222` type interface in package

## [0.1.5] - 2022-03-10

- removed `license` from required fields in the `mnft-20220222` schema.

## [0.1.4] - 2022-03-09

- hotfix for `mnft-20220222` schema, fixes required fields

## [0.1.3] - 2022-03-04

- added new metadata schema `mnft-20220222`
- updated tests, added new exported types

## [0.1.2] - 2022-03-04

- updated `@zoralabs/v3` to latest version
- added `OffersV1` class + unit tests
- added new addresses for modules
- removed tests from published package
- cleaned imports

## [0.1.1] - 2022-03-02

- bumped `catalog-contracts` to version `0.1.4`

## [0.1.0] - 2022-02-25

- Added improved test coverage for emitted events
- Added exported `Addresses` and `AddressBook` types

## [0.0.9] - 2022-02-15

### Added

- Added `RegisterModule` to `ZoraModuleManager` (used for testing)
- Added WETH utilities to `utils`
- Improved coverage for both `AsksV11` and `ZoraModuleManager`, write functions now covered/tested
- Cleanup, removal of unused imports

## [0.0.8] - 2022-02-14

### Added

- Implemented ZoraV3 Module classes, `AsksV11` and `ZoraModuleManager`
- Added basic tests for both asks/module manager

## [0.0.7] - 2022-02-10

### Added

- Updated dependency `catalog-contracts` to version `0.1.3` (see `catalog-contracts` repo)
- Minor cleanup

## [0.0.6] - 2022-01-25

### Added

- Implemented the final final UUPS proxy version from `catalog-contracts` version: `0.1.2`
- Added `upgradeContract` function to `Catalog`, UUPS support.
- Updated tests

## [0.0.5] - 2022-01-23

### Added

- Implemented **_almost_** final version, reworks how `contentURI` functions

## [0.0.4] - 2022-01-21

### Added

- Implemented latest version of `catalog-contracts`
- Further tests added for Gnosis Safe

## [0.0.3] - 2022-01-18

### Added

- Implemented final proposed implementation (CFR.sol)
- [./examples](./examples) new `ts-node` example scripts for using the CDK in production settings.
- (DEV) added code formatting and linting to repository

## [0.0.2] - 2022-01-01

### Added

- Added Metadata utils to the cdk. Includes utilities for generating, parsing and validating Catalog metadata.
- Added additional test coverage for Catalog class.
- Improved JSDoc documentation comments for Catalog, Utilities, Addresses classes.
- Added documentation for Catalog class under [docs/catalog.md](docs/catalog.md)
- This changelog

## [0.0.1] - 2021-12-31

### Added

- Initial publish of cdk package

---

[0.1.7]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.7
[0.1.6]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.6
[0.1.5]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.5
[0.1.4]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.4
[0.1.3]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.3
[0.1.2]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.2
[0.1.1]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.1
[0.1.0]: https://github.com/catalogworks/cdk/packages/1173720?version=0.1.0
[0.0.9]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.9
[0.0.8]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.8
[0.0.7]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.7
[0.0.6]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.6
[0.0.5]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.5
[0.0.4]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.4
[0.0.3]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.3
[0.0.2]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.2
[0.0.1]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.1
