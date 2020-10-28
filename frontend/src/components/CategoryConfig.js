import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  table: {
    minWidth: 650,
  },
}));

function CategoryConfig(props) {
  const currentCategory = {
    id: "",
    name: "",
    languageId:
      props.data.languages.length > 0 ? props.data.languages[0].id : "",
    ratingCategoryId:
      props.data.ratingCategories.length > 0
        ? props.data.ratingCategories[0].id
        : "",
  };
  // languages: languages, ratingCategories:ratingCategories, categories:categories}
  const classes = useStyles();
  // console.log("before", props.data);

  const [inputsData, setInputsData] = useState(currentCategory);
  // console.log("after", currentCategory);
  // // const [categoryName, setCategoryName] = useState(currentCategory.name);
  // // const [ratingCategoryId, setRatingCategory] = useState(currentCategory.ratingCategoryId);
  // // const [languageId, setLang] = useState(currentCategory.languagesId);

  // console.log(inputsData.ratingCategoryId);
  // console.log(inputsData.languageId);

  // useEffect(() => {
  //   setInputsData(currentCategory)
  // }, [])

  const handleInputData = (event, inputKey) => {
    let tempState = { ...inputsData };
    tempState[inputKey] = event.target.value;
    setInputsData(tempState);
  };

  const handleDelete = (id) => {
    if (props.onDelete) props.onDelete(id);
  };

  const handleEdit = (id) => {
    let category = props.data.categories.find(category => id == category.id);
    let tempInputs = {...inputsData};
    tempInputs.name = category.name;
    tempInputs.languageId = category.languageId;
    tempInputs.ratingCategoryId = category.ratingCategoryId;
    setInputsData(tempInputs);
  }

  

  // const handleChangeCategoryName = (event) => {
  //   setCategoryName(event.target.value);
  // };

  // const handleChangeRatingCategory = (event) => {
  //   setRatingCategory(event.target.value);
  // };

  // const handleChangeLanguage = (event) => {
  //   setLang(event.target.value);
  // };

  function handleSaveCategory() {
    if (props.onSaveCategory) {
      let category = { ...inputsData };
      props.onSaveCategory(category);
    }
  }

  //   const handleChange = (event) => {
  //     setCurrency(event.target.value);
  //   };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <label>Category</label>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Category Name</TableCell>
              <TableCell align="left">Rating Category</TableCell>
              <TableCell align="left">language</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell component="th" scope="row">
                  {category.id}
                </TableCell>
                <TableCell align="left">{category.name}</TableCell>
                <TableCell align="left">{
                  props.data.languages.find(id => id==category.ratingCategoryId)
                }</TableCell>
                <TableCell align="left">{category.languageId}</TableCell>
                <TableCell align="left">
                  {
                    <div>
                      <DeleteOutlinedIcon
                        onClick={() => handleDelete(category.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <EditOutlinedIcon
                        onClick={() => handleEdit(category.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <label style={{ margin: "50px 0px 30px 30px", float: "left" }}>
          Name
        </label>
        <TextField
          style={{ margin: "30px 30px 30px 10px", float: "left" }}
          id="name"
          onChange={(e) => handleInputData(e, "name")}
          value={inputsData.name}
          placeholder="Category Name"
          variant="outlined"
        ></TextField>
      </div>
      <div>
        <label style={{ margin: "50px 0px 30px 10px", float: "left" }}>
          Rating Categories
        </label>
        <TextField
          style={{ margin: "30px 0 30px 10px", float: "left" }}
          id="ratingCategoryId"
          select
          value={inputsData.ratingCategoryId}
          onChange={(e) => handleInputData(e, "ratingCategoryId")}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {props.data.ratingCategories.map((rating) => (
            <option key={rating.id} value={rating.id}>
              {rating.name}
            </option>
          ))}
        </TextField>
      </div>
      <div>
        <label style={{ margin: "50px 0px 30px 30px", float: "left" }}>
          Language
        </label>
        <TextField
          style={{ margin: "30px 0 30px 10px", float: "left" }}
          id="languageId"
          select
          value={inputsData.languageId}
          onChange={(e) => handleInputData(e, "languageId")}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {props.data.languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </TextField>
      </div>
      <Button
        onClick={() => handleSaveCategory()}
        style={{ margin: "40px" }}
        variant="contained"
        size="small"
        color="primary"
        className={classes.margin}
      >
        Save
      </Button>
    </form>
  );
}
export default CategoryConfig;
