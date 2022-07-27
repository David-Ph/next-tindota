import db from "../../../middleware/db";
import Match from "../../../models/match";
import Player from "../../../models/player";
import { updatePlayerMmr } from "../../../util/PlayerService";
import { matchValidator } from "../../../middleware/validators/match";
import { GET_MATCH_DETAIL_API_URL } from "../../../util/constants";

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
        return res.status(200).send("Match ID has been submitted");
      }

      const newMatch = new Match({
        matchId: matchId,
      });
      await newMatch.save();
      // // Get Match Data
      const matchDetail = await getMatchDetail(matchId);
      const matchData = await matchDetail.json();

      // Get Playes List
      const playersList = matchData.players;

      // Get Winning Team
      const winningTeam = matchData.radiant_win;

      // Update Radiant players
      for (let i = 0; i < 5; i++) {
        updatePlayerMmr(playersList[i].account_id, winningTeam);
      }

      // Update Dire players
      for (let i = 5; i < 10; i++) {
        updatePlayerMmr(playersList[i].account_id, !winningTeam);
      }

      return res.status(200).send({ message: "OK!" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default db(handler);
