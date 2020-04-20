import { edgesToArray } from './array';


describe('edgesToArray', () => {
  it('should convert a Cursor connection structure to an array of objects', () => {
    const cursor = { edges: [
      { node: { name: 'John Doe' } }
    ] };
    const receivedArray = edgesToArray(cursor);
    const expectedArray = [{ name: 'John Doe' }];
    expect(receivedArray).toEqual(expectedArray);
  });
});
