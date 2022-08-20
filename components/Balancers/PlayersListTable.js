import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { playerActions } from "../../store/players/players-slice";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import styles from "./PlayersListTable.module.css";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";

function PlayersListTable() {
  const dispatch = useDispatch();
  const [error, setError] = useState({ show: false, message: "" });
  const { playerListing, avgMmr } = useSelector((state) => ({
    avgMmr: state.players.avgMmr,
    playerListing: state.players.players,
  }));

  const onDeletePlayer = (name) => {
    if (!name) return;

    dispatch(playerActions.removePlayer(name));
  };

  const onShufflePlayers = () => {
    if (playerListing.length < 10) {
      setError({ show: true, message: "Not enough players!" });
      return;
    }

    dispatch(playerActions.setPlayersReady());
  };

  const onClearPlayerListing = () => {
    dispatch(playerActions.clearPlayerListing());
  };

  const onClearTeam = () => {
    dispatch(playerActions.clearPlayersReady());
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography mb={2} id="modal-modal-title" variant="h6" component="h6">
          Players Listing
        </Typography>
        <Typography mb={2} variant="h6" component="h6">
          Avg MMR: {avgMmr}
        </Typography>
      </Box>
      <table className={styles.playersTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>MMR</th>
            <th></th>
            <th>Rank</th>
            <th>Name</th>
            <th>MMR</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{playerListing[0]?.name}</td>
            <td>{playerListing[0]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[0]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[0]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
            <td>6</td>
            <td>{playerListing[5]?.name}</td>
            <td>{playerListing[5]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[5]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[5]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>{playerListing[1]?.name}</td>
            <td>{playerListing[1]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[1]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[1]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
            <td>7</td>
            <td>{playerListing[6]?.name}</td>
            <td>{playerListing[6]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[6]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[6]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>{playerListing[2]?.name}</td>
            <td>{playerListing[2]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[2]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[2]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
            <td>8</td>
            <td>{playerListing[7]?.name}</td>
            <td>{playerListing[7]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[7]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[7]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>{playerListing[3]?.name}</td>
            <td>{playerListing[3]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[3]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[3]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
            <td>9</td>
            <td>{playerListing[8]?.name}</td>
            <td>{playerListing[8]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[8]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[8]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>{playerListing[4]?.name}</td>
            <td>{playerListing[4]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[4]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[4]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
            <td>10</td>
            <td>{playerListing[9]?.name}</td>
            <td>{playerListing[9]?.mmr}</td>
            <td
              className={styles.deleteBtn}
              onClick={() => onDeletePlayer(playerListing[9]?.name)}
              align="center"
            >
              <ClearIcon
                sx={{ visibility: playerListing[9]?.name ? "visible" : "hidden" }}
                color="error"
                fontSize="small"
              />
            </td>
          </tr>
        </tbody>
      </table>
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
      <Box display="flex" justifyContent={"space-between"}>
        <Button
          onClick={onShufflePlayers}
          sx={{ marginTop: "1rem" }}
          color="info"
          variant="contained"
        >
          Shuffle Players
        </Button>
        <Box>
          <Button
            onClick={onClearPlayerListing}
            sx={{
              marginTop: "1rem",
              marginLeft: "1rem",
              backgroundColor: "#ac2e15",
            }}
            variant="contained"
          >
            Clear Player Listing
          </Button>
          <Button
            onClick={onClearTeam}
            sx={{ marginTop: "1rem", marginLeft: "1rem" }}
            color="success"
            variant="contained"
          >
            Clear Teams
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default PlayersListTable;
