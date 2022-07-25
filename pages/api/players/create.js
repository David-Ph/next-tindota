import db from "../../../middleware/db";
import Player from "../../../models/player";
import { playerValidator } from "../../../middleware/validators/player";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { accountId, name, realMmr } = req.body;

    if (!playerValidator(accountId, name, realMmr)) {
      return res.status(400).send("Invalid Input");
    }

    try {
      const player = new Player({
        name,
        accountId,
        realMmr,
        calibrationMmr: realMmr,
        inhouseMmr: realMmr,
      });
      // Create new user
      const playerCreated = await player.save();
      return res.status(200).send(playerCreated);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default db(handler);
