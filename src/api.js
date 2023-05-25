import { createClient } from "contentful";

function memoize(fn) {
  const store = {};
  return function () {
    const key = JSON.stringify(arguments);
    if (!(key in store)) {
      store[key] = fn.apply(null, arguments);
    }
    return store[key];
  };
}

export const ids = { menu: "53rOVo3GzYmKewswUmG2oG" };

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const getEntryById = memoize(function (id) {
  return client.getEntry(id);
});
