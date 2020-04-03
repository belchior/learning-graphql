/**
 * @flow
 * @relayHash 0ca3cf420a7497b6e01a1b815a35b1eb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RepositoryItem_repository$ref = any;
type UserItem_user$ref = any;
export type UserNavigatorQueryVariables = {|
  login: string,
  repositories: boolean,
  starredRepositories: boolean,
  followers: boolean,
  following: boolean,
|};
export type UserNavigatorQueryResponse = {|
  +user: ?{|
    +repositories?: {|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +$fragmentRefs: RepositoryItem_repository$ref,
        |}
      |}>
    |},
    +starredRepositories?: {|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +$fragmentRefs: RepositoryItem_repository$ref,
        |}
      |}>
    |},
    +followers?: {|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +$fragmentRefs: UserItem_user$ref,
        |}
      |}>
    |},
    +following?: {|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +$fragmentRefs: UserItem_user$ref,
        |}
      |}>
    |},
  |}
|};
export type UserNavigatorQuery = {|
  variables: UserNavigatorQueryVariables,
  response: UserNavigatorQueryResponse,
|};
*/


/*
query UserNavigatorQuery(
  $login: String!
  $repositories: Boolean!
  $starredRepositories: Boolean!
  $followers: Boolean!
  $following: Boolean!
) {
  user(login: $login) {
    repositories(last: 20) @include(if: $repositories) {
      edges {
        node {
          id
          ...RepositoryItem_repository
        }
      }
    }
    starredRepositories(last: 20) @include(if: $starredRepositories) {
      edges {
        node {
          id
          ...RepositoryItem_repository
        }
      }
    }
    followers(last: 20) @include(if: $followers) {
      edges {
        node {
          id
          ...UserItem_user
        }
      }
    }
    following(last: 20) @include(if: $following) {
      edges {
        node {
          id
          ...UserItem_user
        }
      }
    }
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

fragment UserItem_user on User {
  avatarUrl
  bio
  company
  location
  login
  name
  url
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
    "name": "repositories",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "starredRepositories",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "followers",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "following",
    "type": "Boolean!",
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
    "kind": "Literal",
    "name": "last",
    "value": 20
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
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
            "kind": "FragmentSpread",
            "name": "RepositoryItem_repository",
            "args": null
          }
        ]
      }
    ]
  }
],
v5 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "UserEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "UserItem_user",
            "args": null
          }
        ]
      }
    ]
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "avatarUrl",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "login",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v10 = [
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
              (v6/*: any*/)
            ]
          },
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "owner",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
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
              (v6/*: any*/)
            ]
          },
          (v9/*: any*/)
        ]
      }
    ]
  }
],
v11 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "UserEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v7/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "bio",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "company",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "location",
            "args": null,
            "storageKey": null
          },
          (v8/*: any*/),
          (v6/*: any*/),
          (v9/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserNavigatorQuery",
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
            "kind": "Condition",
            "passingValue": true,
            "condition": "repositories",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "repositories",
                "storageKey": "repositories(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "RepositoryConnection",
                "plural": false,
                "selections": (v4/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "starredRepositories",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "starredRepositories",
                "storageKey": "starredRepositories(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "RepositoryConnection",
                "plural": false,
                "selections": (v4/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "followers",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "followers",
                "storageKey": "followers(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "UserConnection",
                "plural": false,
                "selections": (v5/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "following",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "following",
                "storageKey": "following(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "UserConnection",
                "plural": false,
                "selections": (v5/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserNavigatorQuery",
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
          (v3/*: any*/),
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "repositories",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "repositories",
                "storageKey": "repositories(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "RepositoryConnection",
                "plural": false,
                "selections": (v10/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "starredRepositories",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "starredRepositories",
                "storageKey": "starredRepositories(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "RepositoryConnection",
                "plural": false,
                "selections": (v10/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "followers",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "followers",
                "storageKey": "followers(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "UserConnection",
                "plural": false,
                "selections": (v11/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "following",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "following",
                "storageKey": "following(last:20)",
                "args": (v2/*: any*/),
                "concreteType": "UserConnection",
                "plural": false,
                "selections": (v11/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "UserNavigatorQuery",
    "id": null,
    "text": "query UserNavigatorQuery(\n  $login: String!\n  $repositories: Boolean!\n  $starredRepositories: Boolean!\n  $followers: Boolean!\n  $following: Boolean!\n) {\n  user(login: $login) {\n    repositories(last: 20) @include(if: $repositories) {\n      edges {\n        node {\n          id\n          ...RepositoryItem_repository\n        }\n      }\n    }\n    starredRepositories(last: 20) @include(if: $starredRepositories) {\n      edges {\n        node {\n          id\n          ...RepositoryItem_repository\n        }\n      }\n    }\n    followers(last: 20) @include(if: $followers) {\n      edges {\n        node {\n          id\n          ...UserItem_user\n        }\n      }\n    }\n    following(last: 20) @include(if: $following) {\n      edges {\n        node {\n          id\n          ...UserItem_user\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment RepositoryItem_repository on Repository {\n  description\n  forkCount\n  id\n  licenseInfo {\n    name\n  }\n  name\n  owner {\n    __typename\n    avatarUrl\n    login\n    url\n    id\n  }\n  primaryLanguage {\n    color\n    name\n  }\n  url\n}\n\nfragment UserItem_user on User {\n  avatarUrl\n  bio\n  company\n  location\n  login\n  name\n  url\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '42182b29a8f782037ca86b967e3596b5';

module.exports = node;