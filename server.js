const express = require("express");
const request = require("request");
const querystring = require("querystring");

require("dotenv").config();

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  next();
});

app.get("/", (req, res, next) => {
  const text = req.query["query"];
  const num = req.query["num"] || 50;
  const page = req.query["page"] || 1;
  const baseUrl = "https://api.flickr.com/services/rest/";
  const query = querystring.stringify({
    api_key: process.env.API_KEY,
    method: "flickr.photos.search",
    format: "json",
    nojsoncallback: "1",
    per_page: num,
    page: page,
    text: text
  });
  const url = `${baseUrl}?${query}`;
  console.log(url);

  request(`${baseUrl}?${query}`, (err, resFlickr, body) => {
    if (!err && resFlickr.statusCode === 200) {
      res.send(body);
    } else {
      next(err);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
