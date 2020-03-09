import { useLocation, useHistory } from 'react-router-dom';


export const useQueryString = () => {
  const search = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const setSearch = (key, value) => {
    search.set(key, value);
    history.push({
      pathname: history.location.pathname,
      search: search.toString(),
    });
  };

  return [search, setSearch];
};