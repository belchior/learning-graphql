
import { Repository as RepositoryModel } from './model';
import { handleError } from '../../utils/error-handler';


export const Repository = {
  owner: async (parent, args, context) => {
    return context.loader.findRepositoryOwner.load(JSON.stringify(parent.owner));
  },
};

export const Mutation = {
  createRepository: async (parent, args) => {
    const repository = new RepositoryModel(args.input);
    return repository.save().catch(handleError);
  }
};
