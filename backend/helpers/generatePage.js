export const generatePage = (page = 1, limit = 10) => {
  return { limit: +limit, skip: limit * (+page - 1) };
};
