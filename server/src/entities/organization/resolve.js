import { findOrganizationByLogin } from './loader';

export const Query = {
  organization: async (parent, args) => {
    return findOrganizationByLogin.load(args.login);
  }
};
