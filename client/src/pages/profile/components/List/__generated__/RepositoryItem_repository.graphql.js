/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RepositoryItem_repository$ref: FragmentReference;
declare export opaque type RepositoryItem_repository$fragmentType: RepositoryItem_repository$ref;
export type RepositoryItem_repository = {|
  +description: ?string,
  +forkCount: ?number,
  +id: string,
  +licenseInfo: ?{|
    +name: ?string
  |},
  +name: string,
  +owner: {|
    +avatarUrl: ?string,
    +login: string,
    +url: string,
  |},
  +primaryLanguage: ?{|
    +color: ?string,
    +name: ?string,
  |},
  +url: string,
  +$refType: RepositoryItem_repository$ref,
|};
export type RepositoryItem_repository$data = RepositoryItem_repository;
export type RepositoryItem_repository$key = {
  +$data?: RepositoryItem_repository$data,
  +$fragmentRefs: RepositoryItem_repository$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "RepositoryItem_repository",
  "type": "Repository",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
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
        (v0/*: any*/)
      ]
    },
    (v0/*: any*/),
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
        (v1/*: any*/)
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
        (v0/*: any*/)
      ]
    },
    (v1/*: any*/)
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e4c3a9f61350035640de945e307e82d1';

module.exports = node;
