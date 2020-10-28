import React, { useEffect, useState } from "react";
import LanguageConfig from "./components/LanguageConfig";
import CategoryConfig from "./components/CategoryConfig";
import NavBar from "./components/NavBar";

import { getAllData, getDataByID, saveData, deleteData } from "./apiConnect";

const LANG = "lang";
const CATEGORY = "category";
const RATING_CATEGORY = "rating_category";

function App() {
  const [languageConfigData, setLanguageConfigData] = useState({
    languages: [],
  });
  const [CategoryConfigData, setCategoryConfigData] = useState({
    languages: [],
    ratingCategories: [],
    categories: [],
  });
  // const [ratingCategories , setRatingCategiries] = useState([]);
  // const [categories , setCategories] = useState([]);

  const handleLanguageSave = async (lang) => {
    lang = await saveData(LANG, lang);
    // let currentLangs = [...languageConfigData ];
    // let currentLanguageId = currentLangs.findIndex(currentLang => currentLang.id === lang.id);
    // if(currentLanguageId < 0)
    //   currentLangs.push(lang);
    // else
    //   currentLangs[currentLanguageId] = lang;
    // setLanguages(currentLangs);
    refresh();
  };

  const handleLanguageDelete = async (id) => {
    await deleteData(LANG, id);
    // const langsAfterDelete = languageConfigData.filter(lang => lang.id !== id)
    // setLanguages(langsAfterDelete);
    refresh();
  };

  const handleSaveCategory = async (category) => {
    await saveData(CATEGORY, category);
    refresh();
  };
  const handleDeleteCategory = async (id) => {
    deleteData(CATEGORY, id);
    refresh();
  };

  const refresh = () => {
    const languages = getAllData(LANG);
    const ratingCategories = getAllData(RATING_CATEGORY);
    const categories = getAllData(CATEGORY);
    setLanguageConfigData({ languages: languages });

    setCategoryConfigData({
      languages: languages,
      ratingCategories: ratingCategories,
      categories: categories,
    });
  };

  useEffect(() => {
    refresh();
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
            // onAdd={handleAddLanguage}
          />
        )}
      </section>
      <section style={{ marginTop: "50px" }}>
        {CategoryConfigData.ratingCategories.length > 0 && (
          <CategoryConfig
            data={CategoryConfigData}
            onSaveCategory={handleSaveCategory}
            onDelete={handleDeleteCategory}
            onEdit={handleSaveCategory}
          />
        )}
      </section>
    </div>
  );
}

export default App;

//node import axios from "axios"
// const langs = await axios.get('http://localhost:3080/api/languages');
// console.log(langs);
// const lang = await axios.post('http://localhost:3080/api/addLanguage',{name:"fr"});
// console.log(lang);
// getAllLanguages()
// addLanguage()
