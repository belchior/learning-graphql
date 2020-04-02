/**
 * @flow
 * @relayHash f75483599d83278e1158caee1bf331fe
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizationHeader_profile$ref = any;
type UserSidebar_profile$ref = any;
export type ProfileQueryVariables = {|
  login: string
|};
export type ProfileQueryResponse = {|
  +profile: ?{|
    +id: string,
    +__typename: string,
    +$fragmentRefs: UserSidebar_profile$ref & OrganizationHeader_profile$ref,
  |}
|};
export type ProfileQuery = {|
  variables: ProfileQueryVariables,
  response: ProfileQueryResponse,
|};
*/


/*
query ProfileQuery(
  $login: String!
) {
  profile(login: $login) {
    id
    __typename
    ... on User {
      ...UserSidebar_profile
    }
    ... on Organization {
      ...OrganizationHeader_profile
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
    "name": "login",
    "type": "String!",
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
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "avatarUrl",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "login",
  "args": null,
  "storageKey": null
},
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
  "name": "websiteUrl",
  "args": null,
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 10
  }
],
v9 = {
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
    "name": "ProfileQuery",
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
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProfileQuery",
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
              (v4/*: any*/),
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
                "name": "email",
                "args": null,
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "organizations",
                "storageKey": "organizations(last:10)",
                "args": (v8/*: any*/),
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
                          (v4/*: any*/),
                          (v2/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v9/*: any*/),
                          (v3/*: any*/)
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
                "args": (v8/*: any*/),
                "handle": "connection",
                "key": "UserSidebar_organizations",
                "filters": null
              }
            ]
          },
          {
            "kind": "InlineFragment",
            "type": "Organization",
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
                "name": "location",
                "args": null,
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
              (v9/*: any*/),
              (v7/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ProfileQuery",
    "id": null,
    "text": "query ProfileQuery(\n  $login: String!\n) {\n  profile(login: $login) {\n    id\n    __typename\n    ... on User {\n      ...UserSidebar_profile\n    }\n    ... on Organization {\n      ...OrganizationHeader_profile\n    }\n  }\n}\n\nfragment OrganizationHeader_profile on Organization {\n  avatarUrl\n  description\n  location\n  login\n  name\n  url\n  websiteUrl\n}\n\nfragment UserSidebar_profile on User {\n  avatarUrl\n  bio\n  email\n  login\n  name\n  websiteUrl\n  organizations(last: 10) {\n    edges {\n      node {\n        avatarUrl\n        id\n        login\n        name\n        url\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c05a83503958da940807859883a7027';

module.exports = node;
