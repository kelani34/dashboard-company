import debouncer from 'lodash/debounce';

export const debounce = (fn: any, wait = 300) => debouncer(fn, wait);
