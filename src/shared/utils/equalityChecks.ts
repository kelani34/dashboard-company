// Other Node Modules
import deepEqual from 'deep-equal';
import isMatch from 'lodash/isMatch';

export const areEqual = (objectOne: any, objectTwo: any) => deepEqual(objectOne, objectTwo, { strict: true });

export const areEqualNotStrict = (objectOne: any, objectTwo: any) => deepEqual(objectOne, objectTwo);

// This will do a deep check of the two objects and determine if they are equal
export const areEqualShallow = (obj1: any, obj2: any) => isMatch(obj1, obj2);
