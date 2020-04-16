/**
 * @flow
 * @relayHash eae5b9c538f31cd2daaad4f75cf4d4e2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FollowersList_user$ref = any;
type FollowingList_user$ref = any;
type OrganizationHeader_profile$ref = any;
type PeopleList_organization$ref = any;
type RepositoriesList_owner$ref = any;
type StarredRepositoriesList_user$ref = any;
type UserSidebar_profile$ref = any;
export type ProfileRelayQueryVariables = {|
  cursor?: ?string,
  followers: boolean,
  following: boolean,
  login: string,
  people: boolean,
  repositories: boolean,
  starredRepositories: boolean,
|};
export type ProfileRelayQueryResponse = {|
  +profile: ?{|
    +id: string,
    +__typename: string,
    +$fragmentRefs: UserSidebar_profile$ref & FollowersList_user$ref & FollowingList_user$ref & RepositoriesList_owner$ref & StarredRepositoriesList_user$ref & OrganizationHeader_profile$ref & PeopleList_organization$ref,
  |}
|};
export type ProfileRelayQuery = {|
  variables: ProfileRelayQueryVariables,
  response: ProfileRelayQueryResponse,
|};
*/


/*
query ProfileRelayQuery(
  $cursor: String
  $followers: Boolean!
  $following: Boolean!
  $login: String!
  $people: Boolean!
  $repositories: Boolean!
  $starredRepositories: Boolean!
) {
  profile(login: $login) {
    id
    __typename
    ... on User {
      ...UserSidebar_profile
      ...FollowersList_user_SneHE @include(if: $followers)
      ...FollowingList_user_SneHE @include(if: $following)
      ...RepositoriesList_owner_SneHE @include(if: $repositories)
      ...StarredRepositoriesList_user_SneHE @include(if: $starredRepositories)
    }
    ... on Organization {
      ...OrganizationHeader_profile
      ...RepositoriesList_owner_SneHE @include(if: $repositories)
      ...PeopleList_organization_SneHE @include(if: $people)
    }
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

fragment OrganizationHeader_profile on Organization {
  avatarUrl
  description
  location
  login
  name
  url
  websiteUrl
}

fragment PeopleList_organization_SneHE on Organization {
  people(first: 5, after: $cursor) {
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

fragment UserSidebar_profile on User {
  avatarUrl
  bio
  email
  login
  name
  websiteUrl
  organizations(last: 10) {
    edges {
      node {
        avatarUrl
        id
        login
        name
        url
        __typename
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
  }
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
    "name": "people",
    "type": "Boolean!",
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "cursor",
    "variableName": "cursor"
  }
],
v5 = {
  "kind": "Condition",
  "passingValue": true,
  "condition": "repositories",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "RepositoriesList_owner",
      "args": (v4/*: any*/)
    }
  ]
},
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
  "name": "bio",
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "websiteUrl",
  "args": null,
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 10
  }
],
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v14 = [
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
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "location",
  "args": null,
  "storageKey": null
},
v16 = {
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
v17 = [
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
          (v2/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "company",
            "args": null,
            "storageKey": null
          },
          (v15/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v12/*: any*/),
          (v3/*: any*/)
        ]
      },
      (v13/*: any*/)
    ]
  },
  (v16/*: any*/)
],
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v19 = [
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
          (v2/*: any*/),
          (v18/*: any*/),
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
              (v9/*: any*/)
            ]
          },
          (v9/*: any*/),
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
              (v8/*: any*/),
              (v12/*: any*/),
              (v2/*: any*/)
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
              (v9/*: any*/)
            ]
          },
          (v12/*: any*/),
          (v3/*: any*/)
        ]
      },
      (v13/*: any*/)
    ]
  },
  (v16/*: any*/)
],
v20 = {
  "kind": "Condition",
  "passingValue": true,
  "condition": "repositories",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "repositories",
      "storageKey": null,
      "args": (v14/*: any*/),
      "concreteType": "RepositoryConnection",
      "plural": false,
      "selections": (v19/*: any*/)
    },
    {
      "kind": "LinkedHandle",
      "alias": null,
      "name": "repositories",
      "args": (v14/*: any*/),
      "handle": "connection",
      "key": "RepositoriesList_repositories",
      "filters": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProfileRelayQuery",
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
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "User",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "UserSidebar_profile",
                "args": null
              },
              {
                "kind": "Condition",
                "passingValue": true,
                "condition": "followers",
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "FollowersList_user",
                    "args": (v4/*: any*/)
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
                    "args": (v4/*: any*/)
                  }
                ]
              },
              (v5/*: any*/),
              {
                "kind": "Condition",
                "passingValue": true,
                "condition": "starredRepositories",
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "StarredRepositoriesList_user",
                    "args": (v4/*: any*/)
                  }
                ]
              }
            ]
          },
          {
            "kind": "InlineFragment",
            "type": "Organization",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "OrganizationHeader_profile",
                "args": null
              },
              (v5/*: any*/),
              {
                "kind": "Condition",
                "passingValue": true,
                "condition": "people",
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "PeopleList_organization",
                    "args": (v4/*: any*/)
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProfileRelayQuery",
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
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "User",
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "email",
                "args": null,
                "storageKey": null
              },
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "organizations",
                "storageKey": "organizations(last:10)",
                "args": (v11/*: any*/),
                "concreteType": "OrganizationConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrganizationEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Organization",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v2/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v12/*: any*/),
                          (v3/*: any*/)
                        ]
                      },
                      (v13/*: any*/)
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
                        "name": "hasPreviousPage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "startCursor",
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
                "name": "organizations",
                "args": (v11/*: any*/),
                "handle": "connection",
                "key": "UserSidebar_organizations",
                "filters": null
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
                    "storageKey": null,
                    "args": (v14/*: any*/),
                    "concreteType": "UserConnection",
                    "plural": false,
                    "selections": (v17/*: any*/)
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "followers",
                    "args": (v14/*: any*/),
                    "handle": "connection",
                    "key": "FollowersList_followers",
                    "filters": null
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
                    "storageKey": null,
                    "args": (v14/*: any*/),
                    "concreteType": "UserConnection",
                    "plural": false,
                    "selections": (v17/*: any*/)
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "following",
                    "args": (v14/*: any*/),
                    "handle": "connection",
                    "key": "FollowingList_following",
                    "filters": null
                  }
                ]
              },
              (v20/*: any*/),
              {
                "kind": "Condition",
                "passingValue": true,
                "condition": "starredRepositories",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "starredRepositories",
                    "storageKey": null,
                    "args": (v14/*: any*/),
                    "concreteType": "RepositoryConnection",
                    "plural": false,
                    "selections": (v19/*: any*/)
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "starredRepositories",
                    "args": (v14/*: any*/),
                    "handle": "connection",
                    "key": "StarredRepositoriesList_starredRepositories",
                    "filters": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "InlineFragment",
            "type": "Organization",
            "selections": [
              (v6/*: any*/),
              (v18/*: any*/),
              (v15/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v12/*: any*/),
              (v10/*: any*/),
              (v20/*: any*/),
              {
                "kind": "Condition",
                "passingValue": true,
                "condition": "people",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "people",
                    "storageKey": null,
                    "args": (v14/*: any*/),
                    "concreteType": "UserConnection",
                    "plural": false,
                    "selections": (v17/*: any*/)
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "people",
                    "args": (v14/*: any*/),
                    "handle": "connection",
                    "key": "PeopleList_people",
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
    "name": "ProfileRelayQuery",
    "id": null,
    "text": "query ProfileRelayQuery(\n  $cursor: String\n  $followers: Boolean!\n  $following: Boolean!\n  $login: String!\n  $people: Boolean!\n  $repositories: Boolean!\n  $starredRepositories: Boolean!\n) {\n  profile(login: $login) {\n    id\n    __typename\n    ... on User {\n      ...UserSidebar_profile\n      ...FollowersList_user_SneHE @include(if: $followers)\n      ...FollowingList_user_SneHE @include(if: $following)\n      ...RepositoriesList_owner_SneHE @include(if: $repositories)\n      ...StarredRepositoriesList_user_SneHE @include(if: $starredRepositories)\n    }\n    ... on Organization {\n      ...OrganizationHeader_profile\n      ...RepositoriesList_owner_SneHE @include(if: $repositories)\n      ...PeopleList_organization_SneHE @include(if: $people)\n    }\n  }\n}\n\nfragment FollowersList_user_SneHE on User {\n  followers(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...UserItem_user\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment FollowingList_user_SneHE on User {\n  following(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...UserItem_user\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment OrganizationHeader_profile on Organization {\n  avatarUrl\n  description\n  location\n  login\n  name\n  url\n  websiteUrl\n}\n\nfragment PeopleList_organization_SneHE on Organization {\n  people(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...UserItem_user\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment RepositoriesList_owner_SneHE on RepositoryOwner {\n  repositories(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...RepositoryItem_repository\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment RepositoryItem_repository on Repository {\n  description\n  forkCount\n  id\n  licenseInfo {\n    name\n  }\n  name\n  owner {\n    __typename\n    avatarUrl\n    login\n    url\n    id\n  }\n  primaryLanguage {\n    color\n    name\n  }\n  url\n}\n\nfragment StarredRepositoriesList_user_SneHE on User {\n  starredRepositories(first: 5, after: $cursor) {\n    edges {\n      node {\n        id\n        ...RepositoryItem_repository\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserItem_user on User {\n  avatarUrl\n  bio\n  company\n  location\n  login\n  name\n  url\n}\n\nfragment UserSidebar_profile on User {\n  avatarUrl\n  bio\n  email\n  login\n  name\n  websiteUrl\n  organizations(last: 10) {\n    edges {\n      node {\n        avatarUrl\n        id\n        login\n        name\n        url\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8372c7f1a0a5a68c4ada73b27915c170';

module.exports = node;
