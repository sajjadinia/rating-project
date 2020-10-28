const getAllData = docName =>
  JSON.parse(localStorage.getItem(docName)) || []

const getDataByID = (docName, id) => 
  JSON.parse(localStorage.getItem(docName)).find(item => item.id == id);

  const getDataByName = (docName, name) => 
  JSON.parse(localStorage.getItem(docName)).find(item => item.name == name);  

const deleteData = (docName, id) =>  {
  let allData = getAllData(docName).filter(item => item.id != id);
  setDataToLocalStorage(docName, allData);  
}

const saveData = (docName, data) => {
  let allData = getAllData(docName);
  if(data.id && data.id != ""){    
    let findIndex = allData.findIndex(item => item.id == data.id);
    allData[findIndex] = data;
  }else{
    data.id = UUIDGeneratorBrowser();
    allData.push(data);    
  }
  setDataToLocalStorage(docName, allData);
  return data;
}

const setDataToLocalStorage = (docName, data) => localStorage.setItem(docName, JSON.stringify(data))

const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );

export {getAllData, getDataByID, getDataByName, saveData, deleteData}

// import axios from "axios";

// const getAllLanguages = () => {
//   return localStorage.getItem("languages");
//   // return axios.get("http://localhost:3080/api/languages");
// };
// const saveLanguage = async (lang) => {

//   const res = await axios.post("http://localhost:3080/api/saveLanguage", lang);
//   return res.data;
// };
// const deleteLanguage = (id) => {
//   axios({
//     method: "delete",
//     url: "http://localhost:3080/api/deleteLanguage",
//     data: { id },
//   });
// };
// const getAllRatingCategories = () => {
//   return axios.get("http://localhost:3080/api/getAllRatingCategories");
// };



// const addCategory = async (category) => {
//   return await axios.post("http://localhost:3080/api/addCategory" , {data:category})
// }
// // const addLanguage = (newlang) => {
// //   console.log(newlang);
// //   return axios.post("http://localhost:3080/api/addLanguage", newlang);
// // };

// // const ddd = {id: id, yy: "kkk"};
// // console.log(ddd);
// // return axios.delete("http://localhost:3080/api/deleteLanguage1" , {data: {id:33}},  {
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }})

// export { getAllLanguages, saveLanguage, deleteLanguage , getAllRatingCategories, addCategory};


