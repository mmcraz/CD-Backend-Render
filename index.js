var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");

var app = Express();
app.use(cors());

var DATABASENAME = "tododb";
var database;

const cs =
  "mongodb+srv://admin:admin@cluster0.lmpvayp.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT;
app.listen(PORT, () => {
  MongoClient.connect(
    process.env.MONGODB_CONNECT_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      database = client.db(DATABASENAME);
      console.log("Mongo DB Connection successful. Connected port is: ", +PORT);
    }
  );
});

app.get("/api/tododb/getData/", (request, response) => {
  database
    .collection("tododbCollection")
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});

app.post("/api/tododb/addData/", multer().none(), (request, response) => {
  database
    .collection("tododbCollection")
    .count({}, function (error, numOfDocs) {
      database.collection("tododbCollection").insertOne({
        id: (numOfDocs + 1).toString(),
        desc: request.body.addData,
      });
      response.json("Added Succefully");
    });
});

app.delete("/api/tododb/deleteData/", (request, response) => {
  database.collection("tododbCollection").deleteOne({ id: request.query.id });
  response.json("Deleted Succefully");
});
