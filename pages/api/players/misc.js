import db from "../../../middleware/db";
import { authenticated } from "../../../middleware/auth";
import Player from "../../../models/player";

// This API is to do any miscellanous calls to the database so we don't need to use mongodb shell

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const response = await Player.updateMany({}, { streak: 0 });
      console.log(response);
      return res.status(200).send({ message: "OK" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default authenticated(db(handler));
