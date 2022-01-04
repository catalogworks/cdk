## Catalog

The Catalog class gives a developer direct read / write access to a specified instance of the Catalog Protocol.

## Constructor

```typescript
constructor(
    signerOrProvider: Signer | Provider,
    chainId: number,
    contractAddress?: string,
)
```

The constructor requires two arguments:

- signerOrProvider
- chainID

The constructor will use the `signerOrProvider` to determine if the Catalog Instance is `readOnly` or `readAndWrite` capable.
If a `signer` is passed in then the Catalog instance will be able to invoke both read and write functions.
If only a `provider` is passed in then the Catalog instance can only invoke readOnly methods.

The constructor will use the `chainID` to look up the officially supported Catalog Protocol addresses and return a Catalog instance connected the protocol

If the chainId does not exist in `chainIdToNetworkName` the constructor will raise.

The constructor can optionally accept one parameters to `override` the official supported Catalog Protocol address. This override is particularly useful for development on a local blockchain. 

### Examples

#### Mainnet

```typescript
import { Catalog } from '@catalogworks/cdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const catalog = new Catalog(wallet, 1)
const root = await catalog.fetchMerkleRoot()
```

#### Rinkeby

```typescript
import { Catalog } from '@catalogworks/cdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const catalog = new Catalog(wallet, 4)
const root = await catalog.fetchMerkleRoot()
```

#### Local Blockchain

When using a local blockchain you must specify override for `contractAddress`. This should point to the address of a deployed Catalog Shared creator contract on your local blockchain.

```typescript
import { Catalog } from '@catalogworks/cdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const catalog = new Catalog(wallet, 50, inputAddress)
const root = await catalog.fetchMerkleRoot()
```

## Read Functions

### fetchContentURI

Fetch the `contentURI` of a given token.

| **Name** | **Type**     | **Description**                                         |
| -------- | ------------ | ------------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose content uri is being fetched |

### fetchMetadataURI

Fetch the `metadataURI` of a given token.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose metadata uri is being fetched |

### fetchCreator

Fetch the `creator` of a piece of media.

| **Name** | **Type**     | **Description**                                     |
| -------- | ------------ | --------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose creator is being fetched |

### fetchRoyaltyPayoutAddress

Fetch the current `payoutAddress` of a given token.

| **Name** | **Type**     | **Description**                                                 |
| -------- | ------------ | --------------------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose current royalty payout address is being fetched |

### fetchRoyaltyInfo

Fetch the current `RoyaltyInfo` of a given token.

| **Name** | **Type**     | **Description**                                         |
| -------- | ------------ | ------------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose current royalty info is being fetched |
| salePrice   | BigNumberish       | The input sale price of the token.    

### fetchTokenURI

Fetch the current `metadataURI` for a given token.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose metadata uri is being fetched |
                              

### fetchMerkleRoot

Fetch the current `MerkleRoot` for the given contract.

| **Name** | **Type** | **Description**                                                |
| -------- | -------- | -------------------------------------------------------------- |
| N/A  | N/A   | N/A |

### fetchBalanceOf

Fetch the token balance for a given address on an instance of the Catalog shared creator contract.

| **Name** | **Type** | **Description**                                                     |
| -------- | -------- | ------------------------------------------------------------------- |
| owner  | string   | The address of the account whose balance is being fetched |

### fetchOwnerOf

Fetch the owner of a given token on an instance of the Catalog shared creator contract.

| **Name** | **Type**     | **Description**                                   |
| -------- | ------------ | ------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose owner is being fetched |

### fetchOwner

Fetch the current `owner` for the given Catalog contract.

| **Name** | **Type** | **Description**                                                |
| -------- | -------- | -------------------------------------------------------------- |
| N/A  | N/A   | N/A |


### fetchApproved

Fetch the approved account for the specified token.

| **Name** | **Type**     | **Description**                                              |
| -------- | ------------ | ------------------------------------------------------------ |
| tokenId  | BigNumberish | The ID for the token whose approved address is being fetched |

### fetchIsApprovedForAll

Fetch if the specified operator is approved for all tokens owned by the specified owner

| **Name** | **Type** | **Description**                 |
| -------- | -------- | ------------------------------- |
| owner    | string   | An address on the Catalog shared creator contract |
| operator | string   | An address on the Catalog shared creator contract |

## Write Functions

### mint

Mint a new token from the Catalog shared creator contract.

| **Name**  | **Type**  | **Description**                                                                         |
| --------- | --------- | --------------------------------------------------------------------------------------- |
| tokenData | TokenData | The data represented by this token, including royalty info |
| proof | Proof | The valid bytes32[] proof for the input `tokenData.creator` address |

### updateContentURI

Update the `contentURI` of a given token.

| **Name** | **Type**     | **Description**                                         |
| -------- | ------------ | ------------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose content uri is being updated |

### updateMetadataURI

Update the `metadataURI` of a given token.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose metadata uri is being updated |

### updateRoyaltyInfo

Update the `RoyaltyInfo` of a given token.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| tokenId  | BigNumberish | The ID for the token whose royalty info is being updated |
| royaltyPayoutAddress  | string | The input address for the token whose royalty info is being updated |

### updateRoot

Update the `MerkleRoot` of a given contract instance.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| merkleRoot  | BytesLike | The bytes32 merkle root to be updated |

### burn

Burn a Catalog token.

| **Name** | **Type**     | **Description**              |
| -------- | ------------ | ---------------------------- |
| tokenId  | BigNumberish | The ID for the token to burn |

### approve

Grant approval to the specified address for the specified token on an instance of the Catalog shared creator contract.

| **Name** | **Type**     | **Description**                                  |
| -------- | ------------ | ------------------------------------------------ |
| to       | string       | The address being granted approval for the token |
| tokenId  | BigNumberish | The ID for the token                             |

### setApprovalForAll

Grant approval for all token owner by msg.sender on an instance of the Catalog shared creator contract.

| **Name** | **Type** | **Description**                                               |
| -------- | -------- | ------------------------------------------------------------- |
| operator | string   | The address of the account the approvalForAll is being set    |
| approved | boolean  | Whether or not the operator address is being granted approval |

### transferFrom

Transfers the specified token to the specified to address on an instance of the Catalog shared creator contract.

| **Name** | **Type**     | **Description**                        |
| -------- | ------------ | -------------------------------------- |
| from     | string       | The from address of the token transfer |
| to       | string       | The to address of the token transfer   |
| tokenId  | BigNumberish | The ID for the token being transferred |

### safeTransferFrom

Transfers specified token to the specified address if and only if it adheres to the ERC721-Receiver Interface

| **Name** | **Type**     | **Description**                        |
| -------- | ------------ | -------------------------------------- |
| from     | string       | The from address of the token transfer |
| to       | string       | The to address of the token transfer   |
| tokenId  | BigNumberish | The ID for the token being transferred |