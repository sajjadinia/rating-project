import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { saveData, getDataByName, getAllData } from "./apiConnect";
const LANG = "lang";
const CATEGORY = "category";
const RATING_CATEGORY = "rating_category";
let enLang = {};
let faLang = {};
let enBehaviour = {};
let faBehaviour = {};
let faProduct = {};
let enQuality = {};
let enService = {};
let faQuality = {};

const LANGS = getAllData(LANG);
const CATEGORIES = getAllData(CATEGORY);
const RATING_CATEGORIES = getAllData(RATING_CATEGORY);

if (LANGS.length === 0) {
  enLang = saveData(LANG, {
    name: "en",
    country: "uk",
    displayLanguage: "English",
  });
  faLang = saveData(LANG, {
    name: "fa",
    country: "iran",
    displayLanguage: "فارسی",
  });
}

if (RATING_CATEGORIES.length === 0) {
  enBehaviour = saveData(RATING_CATEGORY, {
    name: "behavior",
    lanuageId: enLang.id,
  });
  faBehaviour = saveData(RATING_CATEGORY, {
    name: "شخصیت",
    lanuageId: faLang.id,
  });
  faProduct = saveData(RATING_CATEGORY, {
    name: "محصول",
    lanuageId: faLang.id,
  });
  enQuality = saveData(RATING_CATEGORY, {
    name: "quality",
    lanuageId: enLang.id,
  });
  enService = saveData(RATING_CATEGORY, {
    name: "service",
    lanuageId: enLang.id,
  });
  faQuality = saveData(RATING_CATEGORY, {
    name: "کیفیت",
    lanuageId: faLang.id,
  });
}

if (CATEGORIES.length === 0) {
  saveData(CATEGORY, {
    name: "product",
    languageId: enLang.id,
    ratingCategoriyIds: [enService.id, enQuality.id],
  });

  saveData(CATEGORY, {
    name: "دکتر",
    languageId: faLang.id,
    ratingCategoriyIds: [faBehaviour.id, faQuality.id],
  });
  saveData(CATEGORY, {
    name: "محصول",
    languageId: faLang.id,
    ratingCategoriyIds: [faQuality.id],
  });

  saveData(CATEGORY, {
    name: "محصول",
    languageId: faLang.id,
    ratingCategoriyIds: [faQuality.id, faLang.id],
  });
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
