import { TArgs, IGraphQLContext } from '../interfaces';


export const Query = {
  user: async (parent: any, args: TArgs, context: IGraphQLContext) => {
    return context.loader.findUserByLogin.load(args.login);
  },
};
