import { useCallback } from 'react';

import { debounce } from 'Utils/debounce';

export const useDebounce = (fn: any, wait = 300) => useCallback(debounce(fn, wait), []);
