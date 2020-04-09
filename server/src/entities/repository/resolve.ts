
import { Repository as RepositoryModel } from './model';
import { handleError } from '../../utils/error-handler';
import { findRepositoryOwner } from './loader';
import { IRepositoryOutput } from '../../graphql/interfaces';

export const Repository = {
  owner: async (parent: IRepositoryOutput) => {
    return findRepositoryOwner.load(JSON.stringify(parent.owner));
  },
};

export const Mutation = {
  createRepository: async (parent: any, args: any) => {
    const repository = new RepositoryModel(args.input);
    return repository.save().catch(handleError);
  }
};
