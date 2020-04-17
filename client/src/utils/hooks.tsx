
type TQueryStringTuple = [URLSearchParams, (key: string, value: string) => void]

export const useQueryString = (): TQueryStringTuple => {
  const search = new window.URLSearchParams(window.location.search);

  const setSearch = (key: string, value: string) => {
    search.set(key, value);
    window.history.pushState(undefined, '', `?${search}`);
  };

  return [search, setSearch];
};
