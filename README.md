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

---

## Info

The Catalog Development Kit (**CDK**) is a small set of tools to easily and safely with the Catalog Media Protocl (Catalog Shared Creator NFT's).  
The CDK is written in TS and can be used in any JS environment.

This repository is based on the [Zora ZDK](https://github.com/ourzora/zdk).

The CDK has 4 primary exports plus some types:

- [Catalog](docs/catalog.md)
- [Utils]
- [Addresses]
- [Metadata]

---

### Installation

[Package](https://github.com/catalogworks/cdk/packages/1173720)

```bash
yarn add @catalogworks/cdk@0.0.7
```

---

### Examples

Example usage of the CDK in a NodeJS environment can be found in the [examples](./examples) directory.

- [tree+proofs+root](./examples/scripts/treeproofdb.ts)
- [gnosissafe](./examples/scripts/connectsafe.ts)

---

### Development

```bash
git clone https://github.com/catalogworks/cdk.git
```

```bash
cd cdk
```

_Note: you may need to do the following before being able to install packages_

- In GitHub, go to settings > developer settings > personal access tokens
- Generate new access token with permission `read:packages`
- Add the following line to bottom of .npmrc `//npm.pkg.github.com/:_authToken=<Your Access Token>`

```bash
yarn
```

To build: (for publishing/local testing and use)

```bash
yarn build
```

Build output is located in the generated `./dist` directory.

---

### Testing

Tests are written in [Jest](https://jestjs.io/). using ts-jest.
Unit tests are located in the [tests](./tests) folder.

To run the tests locally:

in a seperate terminal:

```bash
yarn chain
```

then:

```bash
yarn test
```

---

### Code Coverage

Coverage reports can be generated by running:

```bash
yarn coverage
```

Reports are located in the `./coverage` directory.

---

### License

View: [LICENSE](./LICENSE)

---

### Changelog

[CHANGELOG.md](./CHANGELOG.md)

---

### Dependencies

- [@catalogworks/catalog-contracts@0.1.2](https://github.com/catalogworks/catalog-contracts/packages/1165811)
- Ethers
- sjcl
- tiny-invariant
- tiny-warning
- ts-node
