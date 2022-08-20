import db from "../../../middleware/db";
import { updatePlayerMmr } from "../../../util/PlayerService";
import { authenticated } from "../../../middleware/auth";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { players, wins } = req.body;

    if (players?.length < 1) {
      return res.status(400).json({ message: "Not enough players!" });
    }

    try {
      // Get Playes List
      const playersList = players;

      // Update players
      for (let i = 0; i < playersList.length; i++) {
        await updatePlayerMmr(playersList[i].accountId, wins);
      }

      return res.status(200).send({
        message: "OK!",
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default authenticated(db(handler));
