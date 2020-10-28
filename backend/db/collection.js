const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const langSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4() },
  name: String,
  country: String,
  displayLanguage: String,
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const ratingCategoryScheme = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4() },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  name: String,
});

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4() },
  name: String,
  lang: 
    {
      type: Schema.Types.ObjectId,
      ref: "Lang",
    },
  
  ratingCategorie: 
    {
      type: Schema.Types.ObjectId,
      ref: "RatingCategory",
    },

  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4() },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  name: String,
  address: String,
});

const userGroupSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4() },
  name: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const rateSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4() },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rate: {
    min: 1,
    max: 5,
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4() },
  name: String,
  usergroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
    },
  ],
});

exports.default = {
  langSchema,
  ratingCategoryScheme,
  categorySchema,
  itemSchema,
  userSchema,
  userGroupSchema,
  rateSchema,
};
