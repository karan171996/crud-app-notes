const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://127.0.0.1:27017";
const dbName = "random_data";
let db;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);

    db = client.db(dbName);
    const quotesCollection = db.collection("quotes");
    console.log(`Connected MongoDB: ${url}`);
    console.log(`Database: ${dbName}`);
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, function () {
      console.log("listening on port 3000");
    });
  }
);
