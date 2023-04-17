import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./TeamTable.module.css";
import _ from "lodash";
import {
  NORMAL_BALANCER,
  TRIPLE_HIGH,
  ONE_HIGH,
  GARY_SHUFFLE,
  CLOSEST_MMR_SHUFFLER,
} from "../../util/constants";
import { copyToClipBoard } from "../../util/CommonService";
import {
  getNormalShuffles,
  getOneHighShuffles,
  getTripleHighShuffles,
  getGaryShuffles,
  getClosestMmrShuffle,
} from "../../util/TeamService";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const getPlayerByName = (name, players) => {
  return players.find((player) => player.name === name);
};

function TeamTable({ type = "normal", title = "", description = "" }) {
  // Team State
  const [firstTeam, setFirstTeam] = useState([]);
  const [secondTeam, setSecondTeam] = useState([]);
  const { playerListing } = useSelector((state) => ({
    playerListing: state.players.currentPlayers,
  }));
  // Swap Player State
  let playerToSwap = null;
  let firstPlayerTeam = null;
  let secondPlayerToSwap = null;
  let secondPlayerTeam = null;
  let selectedCell = null;

  const getAvgMmr = (team) => {
    return parseInt(team.reduce((a, b) => a + b.mmr, 0) / team.length || 0, 10);
  };

  const onCopy = (team = [], initialText = "") => {
    let copyString = initialText;
    const avgMmr = getAvgMmr(team);
    team.forEach((player) => (copyString += `${player.name}, `));
    copyString += `AVG MMR: ${avgMmr}`;
    copyToClipBoard(copyString);
  };

  const onPlayerCellClick = (name, team, target) => {
    if (!name) return;
    if (firstTeam?.length < 1 || secondTeam?.length < 1) return;

    // Set up selected cell UI
    // Change bg color first for first player, then remove it for 2nd click
    if (!selectedCell) {
      target.classList.add("selected");
      selectedCell = target;
    } else {
      selectedCell.classList.remove("selected");
      selectedCell = null;
    }

    // Set the team and players
    if (!firstPlayerTeam && !playerToSwap) {
      firstPlayerTeam = team;
      playerToSwap = name;
      return;
    } else {
      secondPlayerTeam = team;
      secondPlayerToSwap = name;
    }

    // if teams are the same
    if (firstPlayerTeam === secondPlayerTeam) {
      // firstPlayerTeam = null;
      // playerToSwap = null;
      // secondPlayerTeam = null;
      // secondPlayerToSwap = null;
      if (firstPlayerTeam === 1) {
        const firstPlayer = getPlayerByName(playerToSwap, firstTeam);
        const secondPlayer = getPlayerByName(secondPlayerToSwap, firstTeam);

        const newFirstTeam = firstTeam.map((player) => {
          if (player.name === firstPlayer.name) {
            return secondPlayer;
          } else if (player.name === secondPlayer.name) {
            return firstPlayer;
          }
          return player;
        });
        setFirstTeam(newFirstTeam);
      } else {
        const firstPlayer = getPlayerByName(playerToSwap, secondTeam);
        const secondPlayer = getPlayerByName(secondPlayerToSwap, secondTeam);

        const newSecondTeam = secondTeam.map((player) => {
          if (player.name === firstPlayer.name) {
            return secondPlayer;
          } else if (player.name === secondPlayer.name) {
            return firstPlayer;
          }
          return player;
        });
        setSecondTeam(newSecondTeam);
      }
      return;
    }

    // Swap players based on team
    if (firstPlayerTeam === 1) {
      const firstPlayer = getPlayerByName(playerToSwap, firstTeam);
      const secondPlayer = getPlayerByName(secondPlayerToSwap, secondTeam);

      const newFirstTeam = firstTeam.map((player) => {
        if (player.name === firstPlayer.name) {
          return secondPlayer;
        }
        return player;
      });
      const newSecondTeam = secondTeam.map((player) => {
        if (player.name === secondPlayer.name) {
          return firstPlayer;
        }
        return player;
      });

      setFirstTeam(newFirstTeam);
      setSecondTeam(newSecondTeam);
    } else {
      const firstPlayer = getPlayerByName(playerToSwap, secondTeam);
      const secondPlayer = getPlayerByName(secondPlayerToSwap, firstTeam);

      const newFirstTeam = firstTeam.map((player) => {
        if (player.name === secondPlayer.name) {
          return firstPlayer;
        }
        return player;
      });

      const newSecondTeam = secondTeam.map((player) => {
        if (player.name === firstPlayer.name) {
          return secondPlayer;
        }
        return player;
      });

      setFirstTeam(newFirstTeam);
      setSecondTeam(newSecondTeam);
    }

    // reset everything
    firstPlayerTeam = null;
    playerToSwap = null;
    secondPlayerTeam = null;
    secondPlayerToSwap = null;
  };

  useEffect(() => {
    switch (type) {
      case NORMAL_BALANCER:
        const [first, second] = getNormalShuffles(playerListing);
        setFirstTeam(first);
        setSecondTeam(second);
        break;
      case GARY_SHUFFLE:
        const [firstGary, secondGary] = getGaryShuffles(playerListing);
        setFirstTeam(firstGary);
        setSecondTeam(secondGary);
        break;
      case TRIPLE_HIGH:
        const [firstTriple, secondTriple] =
          getTripleHighShuffles(playerListing);
        setFirstTeam(firstTriple);
        setSecondTeam(secondTriple);
        break;
      case ONE_HIGH:
        const [firstOne, secondOne] = getOneHighShuffles(playerListing);
        setFirstTeam(firstOne);
        setSecondTeam(secondOne);
        break;
      case CLOSEST_MMR_SHUFFLER:
        const [firstClosest, secondClosest] =
          getClosestMmrShuffle(playerListing);
        setFirstTeam(firstClosest);
        setSecondTeam(secondClosest);
        break;
      default:
        break;
    }
  }, [playerListing]);

  const titleColor =
    type === TRIPLE_HIGH
      ? "#ab003c"
      : type === ONE_HIGH
      ? "#03a9f4"
      : "#00e676";

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ color: titleColor }}
          id="modal-modal-title"
          variant="h6"
          component="h6"
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography mb={2} variant="caption">
          {description}
        </Typography>
      </Box>
      <table className={styles.playersTable}>
        <thead>
          <tr>
            <th align="center" colSpan={3}>
              Team 1
            </th>
            <th align="center" colSpan={3}>
              Team 2
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>MMR</th>
            <th>Rank</th>
            <th>Name</th>
            <th>MMR</th>
          </tr>
          <tr>
            <td className={styles.playerRank}>{firstTeam[0]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(firstTeam[0]?.name, 1, e.target)
              }
              className={styles.playerCell}
            >
              {firstTeam[0]?.name}
            </td>
            <td className={styles.playerMmr}>{firstTeam[0]?.mmr}</td>
            <td className={styles.playerRank}>{secondTeam[0]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(secondTeam[0]?.name, 2, e.target)
              }
              className={styles.playerCell}
            >
              {secondTeam[0]?.name}
            </td>
            <td className={styles.playerMmr}>{secondTeam[0]?.mmr}</td>
          </tr>
          <tr>
            <td className={styles.playerRank}>{firstTeam[1]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(firstTeam[1]?.name, 1, e.target)
              }
              className={styles.playerCell}
            >
              {firstTeam[1]?.name}
            </td>
            <td className={styles.playerMmr}>{firstTeam[1]?.mmr}</td>
            <td className={styles.playerRank}>{secondTeam[1]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(secondTeam[1]?.name, 2, e.target)
              }
              className={styles.playerCell}
            >
              {secondTeam[1]?.name}
            </td>
            <td className={styles.playerMmr}>{secondTeam[1]?.mmr}</td>
          </tr>
          <tr>
            <td className={styles.playerRank}>{firstTeam[2]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(firstTeam[2]?.name, 1, e.target)
              }
              className={styles.playerCell}
            >
              {firstTeam[2]?.name}
            </td>
            <td className={styles.playerMmr}>{firstTeam[2]?.mmr}</td>
            <td className={styles.playerRank}>{secondTeam[2]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(secondTeam[2]?.name, 2, e.target)
              }
              className={styles.playerCell}
            >
              {secondTeam[2]?.name}
            </td>
            <td className={styles.playerMmr}>{secondTeam[2]?.mmr}</td>
          </tr>
          <tr>
            <td className={styles.playerRank}>{firstTeam[3]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(firstTeam[3]?.name, 1, e.target)
              }
              className={styles.playerCell}
            >
              {firstTeam[3]?.name}
            </td>
            <td className={styles.playerMmr}>{firstTeam[3]?.mmr}</td>
            <td className={styles.playerRank}>{secondTeam[3]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(secondTeam[3]?.name, 2, e.target)
              }
              className={styles.playerCell}
            >
              {secondTeam[3]?.name}
            </td>
            <td className={styles.playerMmr}>{secondTeam[3]?.mmr}</td>
          </tr>
          <tr>
            <td className={styles.playerRank}>{firstTeam[4]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(firstTeam[4]?.name, 1, e.target)
              }
              className={styles.playerCell}
            >
              {firstTeam[4]?.name}
            </td>
            <td className={styles.playerMmr}>{firstTeam[4]?.mmr}</td>
            <td className={styles.playerRank}>{secondTeam[4]?.index}</td>
            <td
              onClick={(e) =>
                onPlayerCellClick(secondTeam[4]?.name, 2, e.target)
              }
              className={styles.playerCell}
            >
              {secondTeam[4]?.name}
            </td>
            <td className={styles.playerMmr}>{secondTeam[4]?.mmr}</td>
          </tr>
          <tr>
            <td
              onClick={() => onCopy(firstTeam, "Team 1: ")}
              className={styles.copyBtn}
              align="center"
            >
              <ContentCopyIcon color="info" fontSize="small" />
            </td>
            <td>Average</td>
            <td>{getAvgMmr(firstTeam)}</td>
            <td
              onClick={() => onCopy(secondTeam, "Team 2: ")}
              className={styles.copyBtn}
              align="center"
            >
              <ContentCopyIcon color="info" fontSize="small" />
            </td>
            <td>Average</td>
            <td>{getAvgMmr(secondTeam)}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
}

export default TeamTable;
