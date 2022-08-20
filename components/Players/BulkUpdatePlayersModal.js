import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import { callApi } from "../../util/CommonService";
import styles from "./BulkUpdatePlayersModal.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

function BulkUpdatePlayersModal({
  open = false,
  handleClose = () => {},
  players = [],
}) {
  const router = useRouter();
  // Add Player Ref
  const formRef = useRef();
  const nameRef = useRef();
  const [error, setError] = useState({ show: false, message: "" });
  const [info, setInfo] = useState({ show: false, message: "" });
  const playersDisplayLabel = getDisplayLabels(players);
  const [playerListing, setPlayerListing] = useState([]);
  const [conditions, setConditions] = useState(true);

  const handleChange = (event) => {
    setConditions(event.target.value);
  };

  const onAddNewPlayer = async (event) => {
    event.preventDefault();

    const findPlayer = getPlayerByName(
      nameRef.current.value,
      playersDisplayLabel
    );

    if (!findPlayer) {
      setError({ show: true, message: "Invalid Player" });
      return;
    }

    if (playerListing.length >= 5) {
      setError({ show: true, message: "Max player is 5!" });
      return;
    }

    if (_.find(playerListing, ["name", findPlayer.name])) {
      setError({ show: true, message: "That player has been inserted!" });
      return;
    }

    const newPlayer = {
      name: findPlayer.name,
      accountId: findPlayer.accountId,
    };

    const tempTeam = [...playerListing];
    tempTeam.push(newPlayer);
    setPlayerListing(tempTeam);

    const ele = formRef.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    if (ele) ele.click();
  };

  const onDeletePlayer = (name) => {
    if (!name) return;

    const tempTeam = playerListing.filter((player) => player.name !== name);
    setPlayerListing(tempTeam);
  };

  const onBulkUpdate = () => {
    if (playerListing.length < 1) {
      setError({ show: true, message: "Not enough player!" });
    }

    const payload = {
      players: playerListing,
      wins: conditions,
    };

    console.log(payload);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modalContainer">
        <Typography mb={2} id="modal-modal-title" variant="h6" component="h2">
          Bulk Update Players Stats
        </Typography>
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
        <Divider />
        <Box
          sx={{ marginTop: "1rem" }}
          component="form"
          noValidate
          ref={formRef}
          autoComplete="off"
          onSubmit={onAddNewPlayer}
          id="modal-modal-description"
          display="flex"
          alignItems="center"
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
                fullWidth
                label="Search for player"
              />
            )}
          />
          <Button
            sx={{ marginLeft: "0.5rem", height: 55 }}
            type="submit"
            color="info"
            variant="contained"
          >
            Add
          </Button>
        </Box>
        <Box mt={2} display="flex" gap={2}>
          <Box>
            <table className={styles.playersTable}>
              <tbody>
                <tr>
                  <td className={styles.playerCell}>
                    {playerListing[0]?.name}
                  </td>
                  <td
                    className={styles.deleteBtn}
                    onClick={() => onDeletePlayer(playerListing[0]?.name)}
                    align="center"
                  >
                    <ClearIcon
                      sx={{
                        visibility: playerListing[0]?.name
                          ? "visible"
                          : "hidden",
                      }}
                      color="error"
                      fontSize="small"
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.playerCell}>
                    {playerListing[1]?.name}
                  </td>
                  <td
                    className={styles.deleteBtn}
                    onClick={() => onDeletePlayer(playerListing[1]?.name)}
                    align="center"
                  >
                    <ClearIcon
                      sx={{
                        visibility: playerListing[1]?.name
                          ? "visible"
                          : "hidden",
                      }}
                      color="error"
                      fontSize="small"
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.playerCell}>
                    {playerListing[2]?.name}
                  </td>
                  <td
                    className={styles.deleteBtn}
                    onClick={() => onDeletePlayer(playerListing[2]?.name)}
                    align="center"
                  >
                    <ClearIcon
                      sx={{
                        visibility: playerListing[2]?.name
                          ? "visible"
                          : "hidden",
                      }}
                      color="error"
                      fontSize="small"
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.playerCell}>
                    {playerListing[3]?.name}
                  </td>
                  <td
                    className={styles.deleteBtn}
                    onClick={() => onDeletePlayer(playerListing[3]?.name)}
                    align="center"
                  >
                    <ClearIcon
                      sx={{
                        visibility: playerListing[3]?.name
                          ? "visible"
                          : "hidden",
                      }}
                      color="error"
                      fontSize="small"
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.playerCell}>
                    {playerListing[4]?.name}
                  </td>
                  <td
                    className={styles.deleteBtn}
                    onClick={() => onDeletePlayer(playerListing[4]?.name)}
                    align="center"
                  >
                    <ClearIcon
                      sx={{
                        visibility: playerListing[4]?.name
                          ? "visible"
                          : "hidden",
                      }}
                      color="error"
                      fontSize="small"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl sx={{ width: 100 }}>
              <InputLabel id="demo-simple-select-label">Conditions</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={conditions}
                label="Conditions"
                onChange={handleChange}
              >
                <MenuItem value={true}>Win</MenuItem>
                <MenuItem value={false}>Lose</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ marginTop: "1rem" }}
              type="submit"
              color="info"
              variant="contained"
              onClick={onBulkUpdate}
            >
              Bulk Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default BulkUpdatePlayersModal;
