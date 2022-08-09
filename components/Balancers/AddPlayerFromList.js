import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/players/players-slice";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const getDisplayLabels = (players) => {
  return players.map((player) => ({
    accountId: player.accountId,
    name: player.name,
    mmr: player.inhouseMmr,
  }));
};

const getPlayerByName = (name, players) => {
  return players.find((player) => player.name === name);
};

function AddPlayerFromList({ players }) {
  const dispatch = useDispatch();
  const [error, setError] = useState({ show: false, message: "" });
  const formRef = useRef();
  const nameRef = useRef();
  const playersDisplayLabel = getDisplayLabels(players);

  const onAddNewPlayer = (e) => {
    e.preventDefault();

    const findPlayer = getPlayerByName(
      nameRef.current.value,
      playersDisplayLabel
    );

    if (!findPlayer) {
      setError({ show: true, message: "Invalid Player" });
      return;
    }

    const newPlayer = {
      name: findPlayer.name,
      mmr: findPlayer.mmr,
    };

    dispatch(playerActions.addNewPlayer(newPlayer));
    const ele = formRef.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    if (ele) ele.click();
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
        <Autocomplete
          disablePortal
          freeSolo
          fullWidth
          id="combo-box-demo"
          options={playersDisplayLabel}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={nameRef}
              margin="normal"
              fullWidth
              label="Search for player"
            />
          )}
        />
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

export default AddPlayerFromList;
