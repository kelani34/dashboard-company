import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { debounce } from 'Utils/debounce';

export const ProjectsContext = createContext({});

export const ProjectsSearchFunctions = () => {
  const [searchValue, setSearchValue] = useState('');

  const searchBoxRef = useRef(null);

  // handle search box value change
  const handleSearchValueChange = ({ target: { value } }: any) => {
    if (value.length <= 24) {
      setSearchValue(value);
    }
  };

  // debounce function on search value change
  const onChangeSearchValue = useMemo(() => debounce(handleSearchValueChange, 700), []);

  const onClickClearButton = useCallback(() => {
    searchBoxRef.current.value = '';
    setSearchValue('');
  }, []);

  return {
    searchValue,
    searchBoxRef,
    onChangeSearchValue,
    onClickClearButton,
  };
};

export const useProjectsFunctions = () => useContext(ProjectsContext);
