const { init } = require("./db/initialization");
const {
  getAllLanguages,
  saveLanguage,
  deleteLanguage,
  getAllRatingCategories,
  addCategory: addCategory,
} = require("./db/dataAccess");

const express = require("express");
const app = express();

const path = require("path");
bodyParser = require("body-parser");
port = 3080;

// place holder for the data

init();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/api/languages", async (req, res) => {
  // console.log('api/languages');
  const langs = await getAllLanguages();
  res.json(langs);
  // console.log("langs", langs);
});

// app.post("/api/addLanguage", async (req, res) => {
//   const lang = await addLanguage(req.body);
//   //res.json(lang);
// });

app.post("/api/saveLanguage", async (req, res) => {
  const langs = await saveLanguage(req.body);
  res.json(langs)
});

app.delete("/api/deleteLanguage" ,async (req , res) => {
  await deleteLanguage(req.body.id);
})

app.get("/api/getAllRatingCategories" , async(req,res) =>{
const allRatingCategories = await getAllRatingCategories();
res.json(allRatingCategories);
})

app.post("/api/addCategory" , async(req, res) =>{
  await addCategory(req.body.data);
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
