const express = require("express");
const cors = require("cors");
const data = require("./data/mess.json");

const app = express();
app.use(cors());

app.get("/data", (req, res) => {
  //if no filter, returning complete file
  if (Object.keys(req.query).length === 0) {
    return res.json(data);
  }

  let filteredData = { ...data }; //Since mess.json has data as nested obejcts
  for (const key in req.query) {
    const keys = key.split(".");

    let nestedItem = filteredData;

    for (const nestedKey of keys) {
      if (nestedItem[nestedKey]) {
        nestedItem = nestedItem[nestedKey];
      } else {
        filteredData = {};
        break;
      }
    }

    if (typeof nestedItem === "object") {
      filteredData = nestedItem;
    }
  }

  res.json(filteredData);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:" + 3000);
});
