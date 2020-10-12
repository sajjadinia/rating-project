
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/appDB', { useNewUrlParser: true, useUnifiedTopology: true });
const { v4: uuidv4 } = require('uuid');
const { langSchema, ratingCategoryScheme, categorySchema, itemSchema, userSchema, userGroupSchema, rateSchema } = require("./collection.js").default
const Schema = mongoose.Schema;

const Lang = new mongoose.model("Lang", langSchema);
const RatingCategory = new mongoose.model("RatingCategory", ratingCategoryScheme);
const Category = new mongoose.model("Category", categorySchema);

async function getAllLanguages() {
    return await Lang.find();
}

async function addLanguage(name) {
        const lang = {
            id: uuidv4(),
            name: name
        }
        await Lang.insertMany([lang]);
        return lang;
}

exports.getAllLanguages = getAllLanguages
exports.addLanguage = addLanguage