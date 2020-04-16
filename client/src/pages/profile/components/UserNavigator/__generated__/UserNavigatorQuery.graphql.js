/**
 * @flow
 * @relayHash 8f4443b173abdca5052b3ed5f4065ddc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FollowersList_user$ref = any;
type FollowingList_user$ref = any;
type RepositoriesList_owner$ref = any;
type StarredRepositoriesList_user$ref = any;
export type UserNavigatorQueryVariables = {|
  cursor?: ?string,
  followers: boolean,
  following: boolean,
  login: string,
  repositories: boolean,
  starredRepositories: boolean,
|};
export type UserNavigatorQueryResponse = {|
  +profile: ?{|
    +$fragmentRefs: FollowersList_user$ref & FollowingList_user$ref & RepositoriesList_owner$ref & StarredRepositoriesList_user$ref
  |}
|};
export type UserNavigatorQuery = {|
  variables: UserNavigatorQueryVariables,
  response: UserNavigatorQueryResponse,
|};
*/


/*
query UserNavigatorQuery(
  $cursor: String
  $followers: Boolean!
  $following: Boolean!
  $login: String!
  $repositories: Boolean!
  $starredRepositories: Boolean!
) {
  profile(login: $login) {
    __typename
    ...FollowersList_user_SneHE @include(if: $followers)
    ...FollowingList_user_SneHE @include(if: $following)
    ...RepositoriesList_owner_SneHE @include(if: $repositories)
    ...StarredRepositoriesList_user_SneHE @include(if: $starredRepositories)
    id
  }
}

fragment FollowersList_user_SneHE on User {
  followers(first: 5, after: $cursor) {
    edges {
      node {
        id
        ...UserItem_user
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

fragment FollowingList_user_SneHE on User {
  following(first: 5, after: $cursor) {
    edges {
      node {
        id
        ...UserItem_user
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

fragment RepositoriesList_owner_SneHE on RepositoryOwner {
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

fragment StarredRepositoriesList_user_SneHE on User {
  starredRepositories(first: 5, after: $cursor) {
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
    "name": "cursor",
    "type": "String",
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
  },
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
    "name": "cursor",
    "variableName": "cursor"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = [
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
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "avatarUrl",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "login",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
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
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v11 = {
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
},
v12 = [
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
          (v4/*: any*/),
          (v6/*: any*/),
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
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v3/*: any*/)
        ]
      },
      (v10/*: any*/)
    ]
  },
  (v11/*: any*/)
],
v13 = [
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
          (v4/*: any*/),
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
              (v8/*: any*/)
            ]
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "owner",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v9/*: any*/),
              (v4/*: any*/)
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
              (v8/*: any*/)
            ]
          },
          (v9/*: any*/),
          (v3/*: any*/)
        ]
      },
      (v10/*: any*/)
    ]
  },
  (v11/*: any*/)
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
        "name": "profile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "followers",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "FollowersList_user",
                "args": (v2/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "following",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "FollowingList_user",
                "args": (v2/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "repositories",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "RepositoriesList_owner",
                "args": (v2/*: any*/)
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "starredRepositories",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "StarredRepositoriesList_user",
                "args": (v2/*: any*/)
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
        "name": "profile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "followers",
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "User",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "followers",
                    "storageKey": null,
                    "args": (v5/*: any*/),
                    "concreteType": "UserConnection",
                    "plural": false,
                    "selections": (v12/*: any*/)
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "followers",
                    "args": (v5/*: any*/),
                    "handle": "connection",
                    "key": "FollowersList_followers",
                    "filters": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "following",
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "User",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "following",
                    "storageKey": null,
                    "args": (v5/*: any*/),
                    "concreteType": "UserConnection",
                    "plural": false,
                    "selections": (v12/*: any*/)
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "following",
                    "args": (v5/*: any*/),
                    "handle": "connection",
                    "key": "FollowingList_following",
                    "filters": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "repositories",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "repositories",
                "storageKey": null,
                "args": (v5/*: any*/),
                "concreteType": "RepositoryConnection",
                "plural": false,
                "selections": (v13/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "repositories",
                "args": (v5/*: any*/),
                "handle": "connection",
                "key": "RepositoriesList_repositories",
                "filters": null
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "starredRepositories",
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "User",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "starredRepositories",
                    "storageKey": null,
                    "args": (v5/*: any*/),
                    "concreteType": "RepositoryConnection",
                    "plural": false,
                    "selections": (v13/*: any*/)
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "starredRepositories",
                    "args": (v5/*: any*/),
                    "handle": "connection",
                    "key": "StarredRepositoriesList_starredRepositories",
                    "filters": null
                  }
                ]
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
    "text": "query UserNavigatorQuery(\n  $cursor: String\n  $followers: Boolean!\n  $following: Boolean!\n  $login: String!\n  $repositories: Boolean!\n  $starredRepositories: Boolean!\n) {\n  profile(login: $login) {\n    __typename\n    ...FollowersList_user_SneHE @include(if: $followers)\n    ...FollowingList_user_SneHE @include(if: $following)\n    ...RepositoriesList_owner_SneHE @include(if: $repositories)\n    ...StarredRepositoriesList_user_SneHE @include(if: $starredRepositories)\n    id\n  }\n}\n\nfragment FollowersList_user_SneHE on User {\n  followers(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...UserItem_user\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment FollowingList_user_SneHE on User {\n  following(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...UserItem_user\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment RepositoriesList_owner_SneHE on RepositoryOwner {\n  repositories(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...RepositoryItem_repository\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment RepositoryItem_repository on Repository {\n  description\n  forkCount\n  id\n  licenseInfo {\n    name\n  }\n  name\n  owner {\n    __typename\n    avatarUrl\n    login\n    url\n    id\n  }\n  primaryLanguage {\n    color\n    name\n  }\n  url\n}\n\nfragment StarredRepositoriesList_user_SneHE on User {\n  starredRepositories(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...RepositoryItem_repository\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserItem_user on User {\n  avatarUrl\n  bio\n  company\n  location\n  login\n  name\n  url\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c2e1ecd23c4c80ff43b83ab3386f9297';

module.exports = node;
