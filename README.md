## CDK: The Catalog Development Kit

```
         __  __
        /\ \/\ \
  ___   \_\ \ \ \/'\
 /'___\ /'_` \ \ , <
/\ \__//\ \L\ \ \ \\`\
\ \____\ \___,_\ \_\ \_\
 \/____/\/__,_ /\/_/\/_/

```

WIP Repo
____


## Info

The Catalog Development Kit (**CDK**) is a small set of tools to easily and safely with the Catalog Media Protocl (Catalog Shared Creator NFT's).  
The CDK is written in TS and can be used in any JS environment.

This repository is based on the [Zora ZDK](https://github.com/ourzora/zdk).

The CDK has 4 primary exports plus some types:

- [Catalog]
- [Utils]
- [Addresses]

____

### Installation

(Not packaged yet!)

```bash
yarn add @catalogworks/cdk
```

____

### Development

```bash
git clone https://github.com/catalogworks/cdk.git
```

```bash
cd cdk && yarn install
```

To build: (for publishing/local testing and use)

```bash
yarn build
```

Build output is located in the generated `./dist` directory.



____


### Testing

Tests are written in [Jest](https://jestjs.io/). using ts-jest.
Unit tests are located in the [tests](./tests) folder.

To run the tests:

```bash
yarn test
```

____


### License

View: [LICENSE](./LICENSE)

____


### Changelog

Not setup yet.

____

### Dependencies

- [@catalogworks/catalog-contracts@0.0.6](https://github.com/catalogworks/catalog-contracts/packages/1165811)
- Ethers
- sjcl
- tiny-invariant
- tiny-warning
- ts-node
