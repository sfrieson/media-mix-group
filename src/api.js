import { createClient } from 'contentful';

function memoize (fn) {
  const store = {};
  return function () {
    const key = JSON.stringify(arguments);
    if (!(key in store)) {
      store[key] = fn.apply(null, arguments);
    }
    return store[key];
  };
}

export const ids = { menu: '53rOVo3GzYmKewswUmG2oG' };

const client = createClient({
  space: '6pybob1rhf9g',
  accessToken: 'a9e346f44c2bb496d829e74ad5c02d58467bd5f4c12c0d1006db5546cdb9a887'
});

export const getEntryById = memoize(function (id) {
  return client.getEntry(id);
});
