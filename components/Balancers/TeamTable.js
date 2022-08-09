import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./TeamTable.module.css";
import _ from "lodash";
import { NORMAL_BALANCER, TRIPLE_HIGH, ONE_HIGH } from "../../util/constants";
import { copyToClipBoard } from "../../util/CommonService";
import { getNormalShuffles } from "../../util/TeamService";

function TeamTable({ type = "normal", title = "", description = "" }) {
  const { playerListing } = useSelector((state) => ({
    playerListing: state.players.currentPlayers,
  }));

  const getAvgMmr = (team) => {
    return parseInt(team.reduce((a, b) => a + b.mmr, 0) / team.length || 0, 10);
  };

  let firstTeam = [];
  let secondTeam = [];

  switch (type) {
    case NORMAL_BALANCER:
      const [first, second] = getNormalShuffles(playerListing);
      firstTeam = first;
      secondTeam = second;
      break;
    case TRIPLE_HIGH:
      playerListing.forEach((player, index) => {
        if (
          index === 0 ||
          index === 3 ||
          index === 5 ||
          index === 6 ||
          index === 9
        ) {
          firstTeam.push({
            ...player,
            index: index + 1,
          });
        } else {
          secondTeam.push({
            ...player,
            index: index + 1,
          });
        }
      });
      break;
    case ONE_HIGH:
      playerListing.forEach((player, index) => {
        if (
          index === 0 ||
          index === 3 ||
          index === 5 ||
          index === 7 ||
          index === 9
        ) {
          firstTeam.push({
            ...player,
            index: index + 1,
          });
        } else {
          secondTeam.push({
            ...player,
            index: index + 1,
          });
        }
      });
      break;
    default:
      break;
  }

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
            <td>{firstTeam[0]?.index}</td>
            <td>{firstTeam[0]?.name}</td>
            <td>{firstTeam[0]?.mmr}</td>
            <td>{secondTeam[0]?.index}</td>
            <td>{secondTeam[0]?.name}</td>
            <td>{secondTeam[0]?.mmr}</td>
          </tr>
          <tr>
            <td>{firstTeam[1]?.index}</td>
            <td>{firstTeam[1]?.name}</td>
            <td>{firstTeam[1]?.mmr}</td>
            <td>{secondTeam[1]?.index}</td>
            <td>{secondTeam[1]?.name}</td>
            <td>{secondTeam[1]?.mmr}</td>
          </tr>
          <tr>
            <td>{firstTeam[2]?.index}</td>
            <td>{firstTeam[2]?.name}</td>
            <td>{firstTeam[2]?.mmr}</td>
            <td>{secondTeam[2]?.index}</td>
            <td>{secondTeam[2]?.name}</td>
            <td>{secondTeam[2]?.mmr}</td>
          </tr>
          <tr>
            <td>{firstTeam[3]?.index}</td>
            <td>{firstTeam[3]?.name}</td>
            <td>{firstTeam[3]?.mmr}</td>
            <td>{secondTeam[3]?.index}</td>
            <td>{secondTeam[3]?.name}</td>
            <td>{secondTeam[3]?.mmr}</td>
          </tr>
          <tr>
            <td>{firstTeam[4]?.index}</td>
            <td>{firstTeam[4]?.name}</td>
            <td>{firstTeam[4]?.mmr}</td>
            <td>{secondTeam[4]?.index}</td>
            <td>{secondTeam[4]?.name}</td>
            <td>{secondTeam[4]?.mmr}</td>
          </tr>
          <tr>
            <td></td>
            <td>Average</td>
            <td>{getAvgMmr(firstTeam)}</td>
            <td></td>
            <td>Average</td>
            <td>{getAvgMmr(secondTeam)}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
}

export default TeamTable;
