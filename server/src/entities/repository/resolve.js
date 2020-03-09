
import { Repository as RepositoryModel } from './model';
import { handleError } from '../../utils/error-handler';
import { userByIdLoader } from '../../loaders/user';



export const Repository = {
  owner: async parent => {
    return userByIdLoader.load(parent.ownerId.toString());
  },
};


export const Mutation = {
  createRepository: async (parent, args) => {
    const repository = new RepositoryModel(args.input);
    return repository.save().catch(handleError);
  }
};