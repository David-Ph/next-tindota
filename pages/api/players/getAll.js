import db from "../../../middleware/db";
import Player from "../../../models/player";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const players = await Player.find();
      // Create new user
      return res.status(200).send(players);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default db(handler);
