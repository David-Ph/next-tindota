import db from "../../../middleware/db";
import Match from "../../../models/match";
import { resetPlayerMmr } from "../../../util/PlayerService";
import { matchValidator } from "../../../middleware/validators/match";
import { GET_MATCH_DETAIL_API_URL } from "../../../util/constants";
import { authenticated } from "../../../middleware/auth";

const getMatchDetail = async (matchId) => {
  return await fetch(`${GET_MATCH_DETAIL_API_URL}/${matchId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { matchId } = req.body;

    if (!matchValidator(matchId)) {
      return res.status(400).send("Invalid Input");
    }

    try {
      // Find Match from database
      const findExistingMatch = await Match.findOneAndDelete({
        matchId: matchId,
      });

      if (!findExistingMatch) {
        return res
          .status(404)
          .json({ message: "Match not found in database." });
      }

      // Find match from opendota api
      const matchDetail = await getMatchDetail(matchId);
      const matchData = await matchDetail.json();

      if (matchData.error) {
        return res.status(400).json({ message: "Match not found in OpenDOTA" });
      }

      // Get Playes List
      const playersList = matchData.players;

      // Get Winning Team
      const winningTeam = matchData.radiant_win;
      const updatedPlayers = [];
      const failedToUpdatePlayers = [];

      // Update Radiant players
      for (let i = 0; i < 5; i++) {
        const response = await resetPlayerMmr(
          playersList[i].account_id,
          winningTeam
        );

        if (response.player) {
          updatedPlayers.push(response.player.name);
        } else {
          failedToUpdatePlayers.push(response.accountId);
        }
      }

      // Update Dire players
      for (let i = 5; i < 10; i++) {
        const response = await resetPlayerMmr(
          playersList[i].account_id,
          !winningTeam
        );
        if (response.player) {
          updatedPlayers.push(response.player.name);
        } else {
          failedToUpdatePlayers.push(response.accountId);
        }
      }

      return res.status(200).send({
        message: "OK!",
        updatedPlayers: updatedPlayers,
        failedToUpdate: failedToUpdatePlayers,
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default authenticated(db(handler));
