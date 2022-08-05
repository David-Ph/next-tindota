import db from "../../../middleware/db";
import Match from "../../../models/match";
import { updatePlayerMmr } from "../../../util/PlayerService";
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
      const findExistingMatch = await Match.findOne({
        matchId: matchId,
      });

      if (findExistingMatch) {
        return res.status(400).json({ message: "Match ID has been submitted" });
      }

      const newMatch = new Match({
        matchId: matchId,
      });
      await newMatch.save();
      // // Get Match Data
      const matchDetail = await getMatchDetail(matchId);
      const matchData = await matchDetail.json();

      if (matchData.error) {
        return res.status(400).json({ message: "Match Not Found" });
      }

      // Get Playes List
      const playersList = matchData.players;

      // Get Winning Team
      const winningTeam = matchData.radiant_win;
      const updatedPlayers = [];
      const failedToUpdatePlayers = [];

      // Update Radiant players
      for (let i = 0; i < 5; i++) {
        const response = await updatePlayerMmr(
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
        const response = await updatePlayerMmr(
          playersList[i].account_id,
          !winningTeam
        );
        if (response.player) {
          updatedPlayers.push(response.player.name);
        } else {
          failedToUpdatePlayers.push(response.accountId);
        }
      }

      return res
        .status(200)
        .send({
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
