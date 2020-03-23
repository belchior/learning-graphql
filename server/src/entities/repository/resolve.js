
import { Repository as RepositoryModel } from './model';
import { handleError } from '../../utils/error-handler';
import { repositoryOwnerLoader } from './loader';


export const Repository = {
  owner: async parent => {
    return repositoryOwnerLoader.load(JSON.stringify(parent.owner));
  },
};

export const Mutation = {
  createRepository: async (parent, args) => {
    const repository = new RepositoryModel(args.input);
    return repository.save().catch(handleError);
  }
};
