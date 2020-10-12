import axios from "axios"
async function getAllLanguages() {
    // return await fetch('http://localhost:3080/api/users');
    axios.get('http://localhost:3080/api/languages')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
    // return await response.json();
}

async function addLanguage() {
  // return await fetch('http://localhost:3080/api/users');
  axios.post('http://localhost:3080/api/addLanguage',{name:"fr"})
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});
  // return await response.json();
}

export {getAllLanguages, addLanguage}