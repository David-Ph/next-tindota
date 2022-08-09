import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/players/players-slice";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function AddPlayerFromList({ players }) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const nameRef = useRef();
  const mmrRef = useRef();

  const onAddNewPlayer = (e) => {
    e.preventDefault();

    const newPlayer = {
      name: nameRef.current.value,
      mmr: mmrRef.current.value,
    };

    dispatch(playerActions.addNewPlayer(newPlayer));

    formRef.current.reset();
  };

  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h6">
        Insert Player From List
      </Typography>
      <Box
        component="form"
        noValidate
        ref={formRef}
        autoComplete="off"
        onSubmit={onAddNewPlayer}
        id="modal-modal-description"
      >
        <Box display="flex" gap={2}>
          <TextField
            name="name"
            fullWidth
            label="Player Name"
            variant="outlined"
            margin="normal"
            inputRef={nameRef}
          />
        </Box>
        <Button
          sx={{ marginTop: "0.5rem" }}
          type="submit"
          color="info"
          variant="contained"
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default AddPlayerFromList;
