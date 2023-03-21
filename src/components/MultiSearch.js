import React, { useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    "& > *": {
      // margin: theme.spacing(0.5),
    },
  },
  inputRoot: {
    flexWrap: "wrap",
  },
  inputInput: {
    width: "auto",
    flexGrow: 1,
  },
  endAdornment: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    marginLeft: theme.spacing(1),
  },
}));

const MultiSearch = () => {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue) {
      setValue([...value, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setValue((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        freeSolo
        options={value}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip          
              variant="outlined"
              label={option}
              onDelete={handleDelete(option)}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            placeholder="Type any term"
            onKeyDown={handleKeyDown}
            InputProps={{
              ...params.InputProps,
              classes: { root: classes.inputRoot, input: classes.inputInput },
              endAdornment: (
                <div >
                  {inputValue && (
                    <Chip
                      variant="outlined"
                      label={inputValue}
                      onDelete={handleDelete(inputValue)}
                    />
                  )}
                </div>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default MultiSearch;
