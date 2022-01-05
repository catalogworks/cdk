// treeproofdb.ts
// Example usage of generating Merkle proofs from input data pulled from Hasura
// This is a ts-node script
// Execute with `$ ts-node examples/scripts/treeproofdb.ts`
// @note This is not included in the SDK, requires Environment Variables.

import axios, { AxiosRequestConfig } from 'axios';
import { generateMerkleTree, generateMerkleProofs, generateMerkleProof, generateMerkleRootFromTree} from '../../src/utils';
import type { Proof } from '../../src/types';
import dotenv from 'dotenv';

dotenv.config();


// Fetches GraphQL data from Hasura
// @param {string} operationsDoc - GraphQL query string
// @param {string} operationName - GraphQL operation name
// @param {Record<string, any>} variables - GraphQL variables
// @returns {Promise<any>} result of the GraphQL query
// @note This is a demo function, it is not part of the SDK
const fetchGraphQL = async (
    operationsDoc: string,
    operationName: string,
    variables: Record<string, any>
) => {    
    if (process.env.HASURA_ENDPOINT) {
        console.log('\x1b[37m','USING HASURA_ENDPOINT: ', process.env.HASURA_ENDPOINT, '\x1b[0m');
    }
    const config: AxiosRequestConfig = {
        url: process.env.HASURA_ENDPOINT || 'https://catalog.hasura.app/v1/graphql',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'undefined',
        },
        data: {
            query: operationsDoc,
            variables,
            operationName,
        },
    };
    const result = await axios(config).then(res => {
        return res.data;
    }).catch(e => {
        console.error(e);
    });
    return result;
};

// GQL query to fetch all valid artists
const operation = `
    query MyQuery {
      catalog_users(where: {isArtist: {_eq: true}}) {
        id
      }
    }
  `;


// Fetches Input GQL Query
// @returns {Promise<string[]>} array of strings, 'addresses'=
// @note This is a demo function, it is not part of the SDK
const fetchMyQuery = async (): Promise<string[]> => {
    const result = await fetchGraphQL(operation, 'MyQuery', {});
    // format
    const formatted: [] = result.data.catalog_users.map((artist: any) => { return artist.id});
    return formatted;
};

// Fetches GQL Query, displays information to console and generates Merkle Tree, Merkle Proofs and Merkle Root.
// @returns {Promise<{string, <T>}} - merkleRoot and map of proofs
// @note This is a demo function, it is not part of the SDK
const main = async (_inputAddress?: string) => {

        console.group(
           '\n \n \x1b[34m','༼ つ ◕_◕ ༽つ tree proof root ༼ つ ◕_◕ ༽つ', '\x1b[0m \n \n',
        );

        // fetch all artists
        const input:string[] = await fetchMyQuery();

        const tree = generateMerkleTree(input)
        const root = generateMerkleRootFromTree(tree);
        tree.print();
        console.log('\x1b[32m','root: ', root, '\x1b[0m');

        const proofMap = input.map((address: string) => {
            return {
                address,
                proof: generateMerkleProof(tree, address)
            }
        });
        proofMap.forEach((x) => {
            console.log('\x1b[32m','proof: ', x.proof, '\x1b[0m');
            console.log('\x1b[33m','address: ', x.address, '\x1b[0m');
        });
        

        return {root, proofMap};

}


main()
.catch((error) => {
    console.error(error);
    process.exit(1);
});