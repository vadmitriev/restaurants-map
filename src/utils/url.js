export const queryToString = (params) => {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');
};

export const getUrl = (root, path, query) => {
  return `${root}/${path}?${queryToString(query)}`;
};
