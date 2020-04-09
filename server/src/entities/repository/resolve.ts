
import { Repository as RepositoryModel } from './model';
import { handleError } from '../../utils/error-handler';
import { repositoryOwnerLoader } from './loader';
import { IRepositoryOutput } from '../../graphql/interfaces';

export const Repository = {
  owner: async (parent: IRepositoryOutput) => {
    return repositoryOwnerLoader.load(JSON.stringify(parent.owner));
  },
};

export const Mutation = {
  createRepository: async (parent: any, args: any) => {
    const repository = new RepositoryModel(args.input);
    return repository.save().catch(handleError);
  }
};
