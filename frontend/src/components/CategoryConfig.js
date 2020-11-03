import React, { useState, useEffect } from "react";
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
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CategoryConfig(props) {

  const classes = useStyles();
  const theme = useTheme();

  const currentCategory = {
    id: "",
    name: "",
    languageId:
      props.data.languages.length > 0 ? props.data.languages[0].id : "",
    ratingCategoryIds:
      props.data.ratingCategories,
  };

  const [inputsData, setInputsData] = useState(currentCategory);
  const [selectedRatingCategory, setSelectedRatingcategory] = useState([]);

  const handleInputData = (event, inputKey) => {
    let tempState = { ...inputsData };
    tempState[inputKey] = event.target.value;
    setInputsData(tempState);
  };

  const handleDelete = (id) => {
    if (props.onDelete) props.onDelete(id);
  };

  const handleEdit = (id) => {
    let category = props.data.categories.find((category) => id == category.id);
    let tempInputs = { ...inputsData };
    tempInputs.name = category.name;
    tempInputs.languageId = category.languageId;
    tempInputs.ratingCategoryIds = category.ratingCategoryIds;
    setInputsData(tempInputs);
  };

  const getLanguageName = (id) =>
    props.data.languages.find((lang) => lang.id === id).name;

  const getRatingCategoryNames = (ratingCategoryIds) => {
    return props.data.ratingCategories
      .filter((ratingCategory) =>
        ratingCategoryIds.some(
          (ratingCategoryId) => ratingCategory.id === ratingCategoryId
        )
      )
      .map((ratingCategory) => ratingCategory.name)
      .join(",");
  };

  function handleSaveCategory() {
    if (props.onSaveCategory) {
      let category = { ...inputsData };
      props.onSaveCategory(category);
    }
  }

  const handleChangeDropdownList = (event) => {
    setInputsData({...inputsData,  ratingCategoryIds: event.target.value})
    // setSelectedRatingcategory(event.target.value);
    // getRatingCategoryNames(selectedRatingCategory)
  };

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
                <TableCell align="left">
                  {getRatingCategoryNames(category.ratingCategoryIds)}
                </TableCell>
                <TableCell align="left">
                  {getLanguageName(category.languageId)}
                </TableCell>
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
        <FormControl
          className={classes.formControl}
          style={{ margin: "15px 50px 30px 10px", float: "left" }}
        >
          <InputLabel id="demo-mutiple-checkbox-label"></InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={inputsData.ratingCategoryIds}
            onChange={handleChangeDropdownList}
            input={<Input />}
            renderValue={(selected) =>  getRatingCategoryNames(selected)}
            MenuProps={MenuProps}
          >
            {props.data.ratingCategories.map((ratingCategory) => (
              <MenuItem key={ratingCategory.id} value={ratingCategory.id}>
                <Checkbox
                  checked={
                    inputsData.ratingCategoryIds.indexOf(ratingCategory.id) > -1
                  }
                />
                <ListItemText primary={ratingCategory.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        style={{ margin: "40px 5px 40px 40px" }}
        variant="contained"
        size="small"
        color="primary"
        className={classes.margin}
      >
        Save
      </Button>
      <Button
        style={{ margin: "40px 40px 40px 0" }}
        onClick={() => setInputsData(currentCategory)}
        variant="contained"
        size="small"
        color="primary"
        className={classes.margin}
      >
        Add
      </Button>
    </form>
  );
}
export default CategoryConfig;
