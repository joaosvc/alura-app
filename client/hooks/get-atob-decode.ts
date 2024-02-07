export const getAtobURIDecode = (str: string) => {
  try {
    return atob(decodeURIComponent(str));
  } catch {
    return str;
  }
};
