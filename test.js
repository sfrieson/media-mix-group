const { createClient } = require("contentful");

const menuId = "53rOVo3GzYmKewswUmG2oG";

const client = createClient({
  space: "6pybob1rhf9g",
  accessToken:
    "a9e346f44c2bb496d829e74ad5c02d58467bd5f4c12c0d1006db5546cdb9a887",
});

client
  .getEntry(menuId)
  .then((entry) => new MenuBar(entry))
  .then((menu) =>
    Promise.all(menu.items.map((gallery) => gallery.getItems(client)))
  );
