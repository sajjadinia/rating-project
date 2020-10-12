const {init} = require("./db/initialization")
const {getAllLanguages, addLanguage} = require("./db/repository")


const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data

init();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/api/languages', async (req, res) => {
  console.log('api/languages');
  const langs = await getAllLanguages()
  res.json(langs);
});

app.post('/api/addLanguage', async (req, res) => {
  console.log('api/addLanguage');
  console.log(req);
  const lang = await addLanguage(req.body.name)
  res.json(lang);
});

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});