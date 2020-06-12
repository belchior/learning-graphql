
export const useQueryString = () => {
  const search = new window.URLSearchParams(window.location.search);

  const setSearch = (key, value) => {
    search.set(key, value);
    window.history.pushState(undefined, '', `?${search}`);
  };

  return [search, setSearch];
};
