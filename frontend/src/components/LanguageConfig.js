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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const emptyLang = {
  id: "",
  name: "",
  country: "",
  displayLanguage: "",
};

function LanguageConfig(props) {
  const classes = useStyles();

  const [currentLang, setCurrentLang] = useState(emptyLang);

  function handleDelete(id) {
    if (props.onDelete) props.onDelete(id);
  }

  function handleEdit(id) {
    let lang = props.data.languages.find((row) => row.id === id);
    setCurrentLang({ ...lang });
  }
  
  function handleFieldChange(e, name) {
    let lang = { ...currentLang };
    lang[name] = e.target.value;
    setCurrentLang(lang);
  }

  function save() {
    if (props.onSave) props.onSave(currentLang);
  }

  // // if (props.data.indexOf(currentLang.name) === -1) {
  // //   console.log(props.data);
  // //   console.log(currentLang.name);
  // //   console.log("dosen't exist");
  // // } else{
  // //   console.log("exist");
  // // }
  // if (currentLang.id !== "") {
  //  setCurrentLang({ ...currentLang });
  //   if (props.onSave) props.onSave(currentLang);
  // } else {
  //  setCurrentLang({...newLang})
  //  console.log("currentLang123",currentLang);
  //   if(props.onSave) props.onAdd(currentLang);
  // }

  function add() {
    setCurrentLang(emptyLang);
    //if (props.onAdd) props.onAdd({ ...SelectedRow });
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Display Language</TableCell>
              <TableCell align="left"></TableCell>
              {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.languages.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.country}</TableCell>
                <TableCell align="left">{row.displayLanguage}</TableCell>
                <TableCell align="left">
                  {
                    <div>
                      <DeleteOutlinedIcon
                        onClick={() => handleDelete(row.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <EditOutlinedIcon
                        onClick={() => handleEdit(row.id)}
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
      <div style={{ marginTop: "10px" }}>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-size-small"
            onChange={(e) => handleFieldChange(e, "name")}
            style={{ marginRight: "10px", width: "120px" }}
            value={currentLang.name}
            variant="outlined"
            size="small"
          />
          <TextField
            id="outlined-size-small"
            onChange={(e) => handleFieldChange(e, "country")}
            style={{ marginRight: "10px", width: "120px" }}
            value={currentLang.country}
            variant="outlined"
            size="small"
          />
          <TextField
            id="outlined-size-small"
            onChange={(e) => handleFieldChange(e, "displayLanguage")}
            style={{ marginRight: "10px", width: "150px" }}
            value={currentLang.displayLanguage}
            variant="outlined"
            size="small"
          />
          <Button
            onClick={save}
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
            style={{ margin: "5px" }}
          >
            Save
          </Button>
          <Button
            onClick={() => setCurrentLang(emptyLang)}
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
export default LanguageConfig;

// function createData(Id, Name, Actions) {
//   return { Id, Name, Actions };
// }

// const rows = [
//   // createData("Id", "en", <div><DeleteOutlinedIcon /><EditOutlinedIcon /></div>),
//   // createData("Id", "en",<div><DeleteOutlinedIcon /><EditOutlinedIcon /></div>),
//   // createData("Id", "en", <div><DeleteOutlinedIcon /><EditOutlinedIcon /></div>),
//   //   createData('Cupcake', 305, 3.7, 67, 4.3),
//   //   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
// const [row, setRow] = useState("");
// function handleRow(){
//   const row = setRow(props.id,props.Name);
//   log
//   return row
// }
