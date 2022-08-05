import db from "../../../middleware/db";
import { authenticated } from "../../../middleware/auth";
import Player from "../../../models/player";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      if (req.body.accountId) {
        return res
          .status(403)
          .json({ message: "Not Allowed to change account id" });
      }

      const { accountId } = req.query;
      const findPlayer = await Player.findOneAndUpdate(
        { accountId: accountId },
        req.body,
        { new: true }
      );

      if (!findPlayer) {
        return res.status(404).json({ message: "Not found" });
      }

      return res.status(201).json({ findPlayer });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(404).json({ message: "Method not found" });
};

export default authenticated(db(handler));
