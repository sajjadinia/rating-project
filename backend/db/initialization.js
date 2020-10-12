
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/appDB', { useNewUrlParser: true, useUnifiedTopology: true });
const { v4: uuidv4 } = require('uuid');
const { langSchema, ratingCategoryScheme, categorySchema, itemSchema, userSchema, userGroupSchema, rateSchema } = require("./collection.js").default
const Schema = mongoose.Schema;

const Lang = new mongoose.model("Lang", langSchema);
const RatingCategory = new mongoose.model("RatingCategory", ratingCategoryScheme);
const Category = new mongoose.model("Category", categorySchema);

async function initLangs() {
    await Lang.deleteMany({});
    await Lang.insertMany([{
        id: uuidv4(),
        name: "en"
    }, {
        id: uuidv4(),
        name: "de"
    }, {
        id: uuidv4(),
        name: "fa"
    }]);
}

async function initRatingCategories() {
    await RatingCategory.deleteMany({})
    await RatingCategory.insertMany([{
        id: uuidv4(),
        name: "performance"
    }, {
        id: uuidv4(),
        name: "behaviour"
    }, {
        id: uuidv4(),
        name: "quality"
    }
    ])
}

async function initCategories() {
    await Category.deleteMany({})
    await Category.insertMany([{
        id: uuidv4(),
        name: "person"
    }, {
        id: uuidv4(),
        name: "product"
    }
    ])
}

async function initCategoryAndRatingCategory() {
    const person = await Category.find({ name: "person" });
    const product = await Category.find({ name: "product" });
    const ratingcategories = await RatingCategory.find();
    ratingcategories.forEach(ratingCategory => {

        //  if("performance" == ratingCategory.name || "behaviour" == ratingCategory.name)
        //  if(["performance", "behaviour"].findIndex(res => ratingCategory.name == res) >= 0)
        //  if ("<performance><behaviour>".indexOf("<" + ratingCategory.name + ">") > 0)
        //  if(["performance", "behaviour"].some(res => ratingCategory.name == res))
        
        if (["performance", "behaviour"].indexOf(ratingCategory.name) >= 0)
            person[0].ratingCategories.push(ratingCategory._id)
        if (["performance", "quality"].indexOf(ratingCategory.name) >= 0)
            product[0].ratingCategories.push(ratingCategory._id)
    });
    // console.log("ratingcategories", person);
    // console.log("ratingcategories", product);
    person[0].save();
    product[0].save();
}

async function init() {

    await initCategories();
    await initRatingCategories();
    await initLangs();
    initCategoryAndRatingCategory();

}

// const UserGroup = new mongoose.model("UserGoup", userGroupSchema);
// const Rate = new mongoose.model("Rate", rateSchema);
// const User = new mongoose.model("User", userSchema);

exports.init = init