
export const stringToBase64 = (str) => {
  const buff = Buffer.from(String(str), 'utf-8');
  return buff.toString('base64');
};

export const base64ToString = (base64) => {
  const buff = Buffer.from(base64, 'base64');
  return buff.toString('utf-8');
};
