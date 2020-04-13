/**
 * @flow
 * @relayHash 90a69ea6f018b6e2454745430ffbb9cc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TestPagination_user$ref = any;
export type TestPaginationQueryVariables = {|
  login: string,
  cursor?: ?string,
|};
export type TestPaginationQueryResponse = {|
  +user: ?{|
    +$fragmentRefs: TestPagination_user$ref
  |}
|};
export type TestPaginationQuery = {|
  variables: TestPaginationQueryVariables,
  response: TestPaginationQueryResponse,
|};
*/


/*
query TestPaginationQuery(
  $login: String!
  $cursor: String
) {
  user(login: $login) {
    ...TestPagination_user_SneHE
    id
  }
}

fragment RepositoryItem_repository on Repository {
  description
  forkCount
  id
  licenseInfo {
    name
  }
  name
  owner {
    __typename
    avatarUrl
    login
    url
    id
  }
  primaryLanguage {
    color
    name
  }
  url
}

fragment TestPagination_user_SneHE on User {
  repositories(first: 5, after: $cursor) {
    edges {
      node {
        id
        ...RepositoryItem_repository
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "login",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "login",
    "variableName": "login"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TestPaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TestPagination_user",
            "args": [
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TestPaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "repositories",
            "storageKey": null,
            "args": (v2/*: any*/),
            "concreteType": "RepositoryConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "RepositoryEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Repository",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "description",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "forkCount",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "licenseInfo",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "License",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/)
                        ]
                      },
                      (v4/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "owner",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "avatarUrl",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "login",
                            "args": null,
                            "storageKey": null
                          },
                          (v6/*: any*/),
                          (v3/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "primaryLanguage",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Language",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "color",
                            "args": null,
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ]
                      },
                      (v6/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "repositories",
            "args": (v2/*: any*/),
            "handle": "connection",
            "key": "TestPagination_repositories",
            "filters": null
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TestPaginationQuery",
    "id": null,
    "text": "query TestPaginationQuery(\n  $login: String!\n  $cursor: String\n) {\n  user(login: $login) {\n    ...TestPagination_user_SneHE\n    id\n  }\n}\n\nfragment RepositoryItem_repository on Repository {\n  description\n  forkCount\n  id\n  licenseInfo {\n    name\n  }\n  name\n  owner {\n    __typename\n    avatarUrl\n    login\n    url\n    id\n  }\n  primaryLanguage {\n    color\n    name\n  }\n  url\n}\n\nfragment TestPagination_user_SneHE on User {\n  repositories(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...RepositoryItem_repository\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dd622a0eb04cb120eb52cccb805301c8';

module.exports = node;
