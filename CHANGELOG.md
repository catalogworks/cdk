# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- Initial pubish of cdk package

[0.0.2]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.2
[0.0.1]: https://github.com/catalogworks/cdk/packages/1173720?version=0.0.1
