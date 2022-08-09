import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/players/players-slice";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function AddCustomPlayer() {
  const dispatch = useDispatch();
  const [error, setError] = useState({ show: false, message: "" });
  const formRef = useRef();
  const nameRef = useRef();
  const mmrRef = useRef();
  const playerListing = useSelector((state) => state.players.players);

  const onAddNewPlayer = (e) => {
    e.preventDefault();

    if (!nameRef.current.value || !mmrRef.current.value) {
      setError({ show: true, message: "Invalid Name or MMR" });
      return;
    }

    if (playerListing.length >= 10) {
      setError({ show: true, message: "Max player is 10!" });
      return;
    }

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
        Insert Custom Player
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
          <TextField
            fullWidth
            name="realMmr"
            label="Player MMR"
            variant="outlined"
            margin="normal"
            type="number"
            inputRef={mmrRef}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Box>
        <Alert
          variant="outlined"
          severity="error"
          sx={{ display: error.show ? "flex" : "none" }}
          onClose={() => {
            setError({ ...error, show: false });
          }}
        >
          {error.message}
        </Alert>
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

export default AddCustomPlayer;
