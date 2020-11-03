import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
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

const emptyRatingCategory = {
  id: "",
  name: "",
  languageId: "",
};

function RatingCategoryCofig(props) {
  const classes = useStyles();

  let currentRatingCategory = {
    id: "",
    name: "",
    languageId: props.LangData.languages.length>0 ? props.LangData.languages[0].id : "",
  };

  const [inputRatingCategory, setInputRatingCategory] = useState(
    currentRatingCategory
  );

  const getLanguageName = id => {
      console.log(id);
    return props.LangData.languages.find((language) => language.id === id).name;
  }

  const handleDelete = (id) => {
    if (props.onDelete) props.onDelete(id);
  };

  const handleSaveRatingCategory = () => {
      let ratingCategory = {...inputRatingCategory};
      props.onSaveRatingCategory(ratingCategory)
  }

  const handleEdit = (id) => {
    let ratingCategory = props.data.ratingCategories.find(
      (ratingCategory) => ratingCategory.id === id
    );
    let tempRatingCategory = { ...inputRatingCategory };
    tempRatingCategory.name = ratingCategory.name;
    tempRatingCategory.languageId = ratingCategory.languageId;
    setInputRatingCategory(tempRatingCategory);
  };

  const handleFieldChange = (event, inputKey) => {
    let ratingCat = { ...inputRatingCategory };
    ratingCat[inputKey] = event.target.value;
    setInputRatingCategory(ratingCat);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rating Category ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.ratingCategories.map((ratingCategory, index) => (
              <TableRow key={ratingCategory.id}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="left">{ratingCategory.name}</TableCell>
                <TableCell align="left">
                  {getLanguageName(ratingCategory.languageId)}
                </TableCell>
                <TableCell align="left">
                  {
                    <div>
                      <DeleteOutlinedIcon
                        onClick={() => handleDelete(ratingCategory.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <EditOutlinedIcon
                        onClick={() => handleEdit(ratingCategory.id)}
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
        <div style={{ marginTop: "30px" }}>
          <label style={{ margin: "15px 30px 30px 30px", float: "left" }}>
            Name
          </label>
          <TextField
            style={{ margin: "30px 30 30px 10px", float: "left" }}
            id="outlined-size-small"
            onChange={(e) => handleFieldChange(e, "name")}
            style={{ marginRight: "10px", width: "120px" }}
            value={inputRatingCategory.name}
            variant="outlined"
            size="larg"
            placeholder="Rating Name"
          ></TextField>

          <TextField
            style={{ margin: "30px 0 30px 10px", float: "left" }}
            id="languageId"
            select
            value={inputRatingCategory.languageId}
            onChange={(e) => handleFieldChange(e, "languageId")}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {props.LangData.languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </TextField>
        </div>
        <Button
          style={{ margin: "40px 5px 40px 40px" }}
          onClick={()=> handleSaveRatingCategory()}
          variant="contained"
          size="small"
          color="primary"
          className={classes.margin}
          style={{ margin: "5px" }}
        >
          Save
        </Button>
        <Button
          style={{ margin: "40px 5px 40px 40px" }}
          onClick={() => setInputRatingCategory(emptyRatingCategory)}
          variant="contained"
          size="small"
          color="primary"
          className={classes.margin}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
export default RatingCategoryCofig;
