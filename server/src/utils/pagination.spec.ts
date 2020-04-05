import { GraphQLError } from 'graphql';

import {
  maxNumberOfItems,
  minNumberOfItemsToSkip,
  paginationArrays,
  paginationBoundaries,
  IPaginationArgs,
} from './pagination';


describe('Pagination Helper', () => {
  describe('validateArgs', () => {
    it('should throw an error when first and last was not provided', () => {
      const error = new GraphQLError('Missing pagination boundaries');
      expect(() => paginationBoundaries({ skip: 2 })).toThrow(error);
      expect(() => paginationArrays({ skip: 2 })).toThrow(error);
    });

    it('should throw an error when first and last was provided at the same time', () => {
      const error = new GraphQLError('first and last must not be specified at the same time');
      expect(() => paginationBoundaries({ first: 5, last: 5 })).toThrow(error);
      expect(() => paginationArrays({ first: 5, last: 5 })).toThrow(error);
    });

    it('should throw an error when first and last was not a positive integer', () => {
      const error = new GraphQLError('first and last must be a positive integer');
      const args: IPaginationArgs[] = [
        { first: -42 },
        { first: 0 },
        { last: -42 },
        { last: 0 },
      ];
      args.forEach(arg => {
        expect(() => paginationBoundaries(arg)).toThrow(error);
        expect(() => paginationArrays(arg)).toThrow(error);
      });
    });

    it('should throw an error when skip is not a positive integer', () => {
      const error = new GraphQLError('skip must be a positive interger');
      expect(() => paginationBoundaries({ first: 10, skip: -10 })).toThrow(error);
      expect(() => paginationArrays({ first: 10, skip: -10 })).toThrow(error);
    });
  });


  describe('paginationBoundaries', () => {
    it('the skip attribute returned should be equal to minNumberOfItemsToSkip when skip arg was not provided', () => {
      const pagination = paginationBoundaries({ first: 10 });
      expect(pagination.skip).toEqual(minNumberOfItemsToSkip);
    });

    it('the limit attribute returned should not be more than maxNumberOfItems', () => {
      const args: IPaginationArgs[] = [
        { first: 1000 },
        { last: 1000 },
      ];
      args.forEach(arg => {
        const pagination = paginationBoundaries(arg);
        expect(pagination.limit).toEqual(maxNumberOfItems);
      });
    });

    it('the sort attribute returned should match the specified structure', () => {
      let structure = { _id: 1 };
      let pagination = paginationBoundaries({ first: 10 });
      expect(pagination.sort).toEqual(structure);

      structure = { _id: -1 };
      pagination = paginationBoundaries({ last: 10 });
      expect(pagination.sort).toEqual(structure);
    });
  });


  describe('paginationArrays', () => {
    it('should return the maxNumberOfItems when first or last attribute are more than that it', () => {
      let args: IPaginationArgs = { first: maxNumberOfItems + 1 };
      let result = paginationArrays(args);
      expect(result.limit).toEqual(maxNumberOfItems);

      args = { last: maxNumberOfItems + 1 };
      result = paginationArrays(args);
      expect(result.limit).toEqual(maxNumberOfItems);
    });

    it('should return the minNumberOfItemsToSkip when the skip attribute was not provided', () => {
      let args = { first: 5 };
      let result = paginationArrays(args);
      expect(result.skip).toEqual(minNumberOfItemsToSkip);
    });

    it('when the last attribute was provided it should be added to the skip returning a negative integer', () => {
      /*
        <------ order
        |------|------|------|------|------|------|------|------|------|------|
        | item | item | item | item | item | item | item | item | item | item |
        |------|------|------|------|------|------|------|------|------|------|
                                           ^                                  ^
                                 args.last 5                        args.skip 0
                                           ^
                              result.skip -5
                                           ^__________________________________^
                                                       result.limit 5
      */
      let args: IPaginationArgs = { last: 5 };
      let result = paginationArrays(args);
      let expectedValue = -args.last - minNumberOfItemsToSkip;
      expect(result.skip).toEqual(expectedValue);

      /*
        |------|------|------|------|------|------|------|------|------|------|
        | item | item | item | item | item | item | item | item | item | item |
        |------|------|------|------|------|------|------|------|------|------|
                      ^                                  ^
            args.last 5                        args.skip 3
                      ^
         result.skip -8
                      ^__________________________________^
                                result.limit 5
      */
      args = { last: 5, skip: 3 };
      result = paginationArrays(args);
      expectedValue = -args.last - args.skip;
      expect(result.skip).toEqual(expectedValue);
    });
  });
});
