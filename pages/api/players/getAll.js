import db from "../../../middleware/db";
import Player from "../../../models/player";
import { authenticated } from "../../../middleware/auth";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const players = await Player.find().sort({
        name: "desc",
      });

      return res.status(200).json(players);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(404).json({ message: "Method not found" });
};

export default authenticated(db(handler));
