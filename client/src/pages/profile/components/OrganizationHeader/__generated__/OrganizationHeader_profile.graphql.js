/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrganizationHeader_profile$ref: FragmentReference;
declare export opaque type OrganizationHeader_profile$fragmentType: OrganizationHeader_profile$ref;
export type OrganizationHeader_profile = {|
  +avatarUrl: string,
  +description: ?string,
  +location: ?string,
  +login: string,
  +name: ?string,
  +url: string,
  +websiteUrl: ?string,
  +$refType: OrganizationHeader_profile$ref,
|};
export type OrganizationHeader_profile$data = OrganizationHeader_profile;
export type OrganizationHeader_profile$key = {
  +$data?: OrganizationHeader_profile$data,
  +$fragmentRefs: OrganizationHeader_profile$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "OrganizationHeader_profile",
  "type": "Organization",
  "metadata": null,
  "argumentDefinitions": [],
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
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "login",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "url",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "websiteUrl",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'e8c6dee6c8eff7b784fb5e94f391fe37';

module.exports = node;
