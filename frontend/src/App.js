import React, { useEffect, useState } from "react";
import LanguageConfig from "./components/LanguageConfig";
import CategoryConfig from "./components/CategoryConfig";
import RatingCategoryCofig from "./components/RatingCategoryConfig";
import NavBar from "./components/NavBar";
import ErrorAlert from "./components/ErrorAlert";

import { getAllData, getDataByID, saveData, deleteData } from "./apiConnect";

const LANG = "lang";
const CATEGORY = "category";
const RATING_CATEGORY = "rating_category";

let alertMessage = { type: "", text: "" };

function App() {
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const [languageConfigData, setLanguageConfigData] = useState({
    languages: [],
  });
  const [CategoryConfigData, setCategoryConfigData] = useState({
    languages: [],
    ratingCategories: [],
    categories: [],
  });

  const [ratingCategoryConfigData, setRatingCategoryConfigData] = useState({
    ratingCategories: [],
  });

  const showMessageAlert = (type, text) => {
    alertMessage = { type: type, text: text };
    setIsErrorAlertOpen(true);
    setTimeout(() => {
      alertMessage = {};
      setIsErrorAlertOpen(false);
    }, 5000);
  };

  const handleLanguageSave = async (lang) => {
    if(lang.name == ""){
      showMessageAlert("error", "Language name is empty!");
    } else {
    lang = await saveData(LANG, lang);
    refresh();
    }
  };

  const handleLanguageDelete = async (id) => {
    if (getAllData(CATEGORY).some((category) => category.languageId === id)) {
      showMessageAlert(
        "error",
        "This language is used before and you can not delete it"
      );
    } else {
      await deleteData(LANG, id);
      refresh();
    }
  };

  const handleDeleteRatingCategory = async (id) => {
    if (isRatingCategoryUsed(id)) {
      showMessageAlert(
        "error",
        "This ratingCategory is used before and you can not delete it"
      );
    } else {
      await deleteData(RATING_CATEGORY, id);
      refresh();
    }
  };

  const handleSaveCategory = async (category) => {
    if (category.name == ""){
      showMessageAlert("error", "Category name is empty!");
    }else {
    await saveData(CATEGORY, category);
    refresh();
    }
  };
  const handleDeleteCategory = async (id) => {
    deleteData(CATEGORY, id);
    refresh();
  };

  const handleSaveRatingCategory = async (ratingCategory) => {
    if (ratingCategory.name == "") {
      showMessageAlert("error", "Rating category name is empty!");
    } else {
      await saveData(RATING_CATEGORY, ratingCategory);
      refresh();
    }
  };

  const refresh = () => {
    const languages = getAllData(LANG);
    const ratingCategories = getAllData(RATING_CATEGORY);
    const categories = getAllData(CATEGORY);
    setLanguageConfigData({ languages: languages });
    setRatingCategoryConfigData({ ratingCategories: ratingCategories });

    setCategoryConfigData({
      languages: languages,
      ratingCategories: ratingCategories,
      categories: categories,
    });
  };

  useEffect(() => {
    refresh();
    showMessageAlert("success", "Data successfully loaded");
  }, []);

  return (
    <div>
      <NavBar />
      <section>
        {languageConfigData.languages.length == 0 ? (
          <>Loding...</>
        ) : (
          <LanguageConfig
            data={languageConfigData}
            onSave={handleLanguageSave}
            onDelete={handleLanguageDelete}
          />
        )}
      </section>
      <section style={{ marginTop: "50px" }}>
        {CategoryConfigData.ratingCategories.length > 0 && (
          <CategoryConfig
            data={CategoryConfigData}
            onSaveCategory={handleSaveCategory}
            onDelete={handleDeleteCategory}
          />
        )}
      </section>
      <ErrorAlert open={isErrorAlertOpen} message={alertMessage} />
      {languageConfigData.languages.length > 0 && (
        <section>
          <RatingCategoryCofig
            data={ratingCategoryConfigData}
            LangData={languageConfigData}
            onDelete={handleDeleteRatingCategory}
            onSaveRatingCategory={handleSaveRatingCategory}
          />
        </section>
      )}
    </div>
  );
}

export default App;

function isRatingCategoryUsed(id) {
  return getAllData(CATEGORY).some((category) =>
    category.ratingCategoryIds.some(
      (ratingCategoryId) => ratingCategoryId === id
    )
  );
}
