
import { Repository as RepositoryModel, IRepositoryDocument } from './model';
import { handleError } from '../../utils/error-handler';
import { findRepositoryOwner } from './loader';

export const Repository = {
  id: async (parent: IRepositoryDocument) => parent._id.toString(),

  owner: async (parent: IRepositoryDocument) => {
    return findRepositoryOwner.load(JSON.stringify(parent.owner));
  },
};

export const Mutation = {
  createRepository: async (parent: any, args: any) => {
    const repository = new RepositoryModel(args.input);
    return repository.save().catch(handleError);
  }
};
