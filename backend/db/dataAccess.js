const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/appDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { v4: uuidv4 } = require("uuid");
const {
  langSchema,
  ratingCategoryScheme,
  categorySchema,
  itemSchema,
  userSchema,
  userGroupSchema,
  rateSchema,
} = require("./collection.js").default;
const Schema = mongoose.Schema;

const Lang = new mongoose.model("Lang", langSchema);
const RatingCategory = new mongoose.model(
  "RatingCategory",
  ratingCategoryScheme
);
const Category = new mongoose.model("Category", categorySchema);

async function getAllLanguages() {
  return await Lang.find();
}
async function getAllRatingCategories(){
  return await RatingCategory.find();
}


async function getLangById(id) {
  return await Lang.findOne({ id: id });
}
async function getCategoryById(id){
  return await Category.findOne({id:id}); 
}

async function saveLanguage(lang) {
  if (lang.id !== "") {
    let dbLang = await getLangById(lang.id);
    dbLang.name = lang.name;
    dbLang.country = lang.country;
    dbLang.displayLanguage = lang.displayLanguage;
   await dbLang.save();
  } else {
    lang.id = uuidv4();
    await Lang.insertMany([lang], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successfully added");
      }
    });
  }
  return lang;
}

async function deleteLanguage(id) {
  console.log("IIIIIIIIDDDDDDDDDDD", id);
  await Lang.deleteMany({ id: id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully deleted...");
    }
  });
}
async function addCategory(category) {
  if(category.id === "")
  {
    category.id = uuidv4();
    await Category.insertMany([category], err=>{
      if (err){console.log(err);}
      else{
        console.log("successfuly added...");
      }
    })
  } else {
    let dbCategory = getCategoryById(category.id)
        
        dbCategory.name = category.name;
        dbCategory.languageId = category.languageId;
        await dbCategory.save();
  }
  
}

// async function addLanguage(lang) {
//   lang.id = uuidv4();
//   console.log("sssssssssss", []);
//   await Lang.insertMany([lang], (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("successfully added...");
//     }
//   });

// }

exports.getAllLanguages = getAllLanguages;
exports.saveLanguage = saveLanguage;
exports.deleteLanguage = deleteLanguage;
exports.getAllRatingCategories = getAllRatingCategories;
exports.addCategory = addCategory;
// exports.addLanguage = addLanguage;
