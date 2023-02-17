import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import EditPlayerModal from "./EditPlayerModal";
import styles from "./PlayersTable.module.css";
import _ from "lodash";
import { getDaysFrom } from "../../util/CommonService";
import {
  STREAK_DETECTOR_LIGHT,
  STREAK_DETECTOR_HARD,
} from "../../util/constants";

const getLastEditStr = (days) => {
  if (days === "Never") return days;

  if (days === 0) return "Today";

  if (days === 1) return "Yesterday";

  return `${days} days ago`;
};

function PlayersTable({ players }) {
  const [editModal, setEditModal] = useState({ show: false, data: null });
  const [sortBy, setSortBy] = useState("desc");
  const handleOpen = (data) => setEditModal({ show: true, data: data });
  const handleClose = () => setEditModal({ ...editModal, show: false });

  const onSortCol = (property) => {
    if (property === "winrate") {
      players.sort((player, nextPlayer) => {
        const playerWinrate = parseInt(
          (player.totalWins / (player.totalGames ? player.totalGames : 1)) *
            100,
          10
        );
        const nextPlayerWinrate = parseInt(
          (nextPlayer.totalWins /
            (nextPlayer.totalGames ? nextPlayer.totalGames : 1)) *
            100,
          10
        );

        return sortBy === "asc"
          ? playerWinrate - nextPlayerWinrate
          : nextPlayerWinrate - playerWinrate;
      });
    } else if (property === "name") {
      players.sort((player, nextPlayer) => {
        const nameA = player[property].toUpperCase();
        const nameB = nextPlayer[property].toUpperCase();

        if (nameA < nameB) {
          return sortBy === "asc" ? 1 : -1;
        }

        if (nameB < nameA) {
          return sortBy === "asc" ? -1 : 1;
        }

        return 0;
      });
    } else if (property === "lastEdit") {
      players.sort((player, nextPlayer) => {
        const dateA = getLastEditStr(getDaysFrom(player.updatedAt));
        const dateB = getLastEditStr(getDaysFrom(nextPlayer.updatedAt));

        if (dateA < dateB) {
          return sortBy === "asc" ? 1 : -1;
        }

        if (dateB < dateA) {
          return sortBy === "asc" ? -1 : 1;
        }

        return 0;
      });
    } else {
      players.sort((player, nextPlayer) => {
        return sortBy === "asc"
          ? player[property] - nextPlayer[property]
          : nextPlayer[property] - player[property];
      });
    }

    setSortBy(sortBy === "desc" ? "asc" : "desc");
  };

  const streakDetector = (streak, id) => {
    if (streak >= STREAK_DETECTOR_HARD) {
      return 2;
    }
    if (streak >= STREAK_DETECTOR_LIGHT) {
      return 1;
    }
    return 0;
  };

  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table id={styles["player-table"]}>
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("name")}
            >
              Name
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("calibrationGames")}
            >
              Calib. Games
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("calibrationWins")}
            >
              Calib. Wins
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("calibrationLoses")}
            >
              Calib. Loses
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("calibrationMmr")}
            >
              Calib. MMR
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("realMmr")}
            >
              Real MMR
            </TableCell>

            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("totalGames")}
            >
              Total Games
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("totalWins")}
            >
              Total Wins
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("totalLoses")}
            >
              Total Loses
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("winrate")}
            >
              Winrate
            </TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("inhouseMmr")}
            >
              Inhouse MMR
            </TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell
              className={styles.sortable}
              onClick={() => onSortCol("lastEdit")}
            >
              Last Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((row) => (
            <TableRow
              key={row.name}
              className={
                streakDetector(row.streak) === 2
                  ? styles.hardStreak
                  : streakDetector(row.streak) === 1
                  ? styles.lightStreak
                  : ""
              }
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">{row.accountId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.calibrationGames}</TableCell>
              <TableCell>{row.calibrationWins}</TableCell>
              <TableCell>{row.calibrationLoses}</TableCell>
              <TableCell>{row.calibrationMmr}</TableCell>
              <TableCell>{row.realMmr}</TableCell>

              <TableCell>{row.totalGames}</TableCell>
              <TableCell>{row.totalWins}</TableCell>
              <TableCell>{row.totalLoses}</TableCell>
              <TableCell>
                {`${parseInt(
                  (row.totalWins / (row.totalGames ? row.totalGames : 1)) * 100,
                  10
                )}`}
                %
              </TableCell>
              <TableCell>{row.inhouseMmr}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleOpen(row)}
                  variant="text"
                  size="small"
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                {getLastEditStr(getDaysFrom(row.updatedAt))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditPlayerModal
        open={editModal.show}
        data={editModal.data}
        handleClose={handleClose}
      />
    </TableContainer>
  );
}

export default PlayersTable;
