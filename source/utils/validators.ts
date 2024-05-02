export const validateIsDigit = (param: string) => {
  const regext = /[^0-9]/g;
  if (regext.test(param)) {
    return param;
  }
  return '';
};
