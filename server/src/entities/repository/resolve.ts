
import { Repository as RepositoryModel, IRepositoryDocument } from './model';
import { handleError } from '../../utils/error-handler';
import { TArgs, IGraphQLContext } from '../../apollo/interfaces';

export const Repository = {
  id: async (parent: IRepositoryDocument) => parent._id.toString(),

  owner: async (parent: IRepositoryDocument, args: TArgs, context: IGraphQLContext) => {
    return context.loader.findRepositoryOwner.load(JSON.stringify(parent.owner));
  },
};

export const Mutation = {
  createRepository: async (parent: any, args: any) => {
    const repository = new RepositoryModel(args.input);
    return repository.save().catch(handleError);
  }
};
