import { stringToBase64, base64ToString } from './converter';


describe('converter', () => {
  it('stringToBase64 should convert string to base64', () => {
    const receivedValue = stringToBase64('string to base64');
    const expectedValue = 'c3RyaW5nIHRvIGJhc2U2NA==';
    expect(receivedValue).toEqual(expectedValue);
  });

  it('base64ToString should convert base64 to string', () => {
    const receivedValue = base64ToString('c3RyaW5nIHRvIGJhc2U2NA==');
    const expectedValue = 'string to base64';
    expect(receivedValue).toEqual(expectedValue);
  });
});
