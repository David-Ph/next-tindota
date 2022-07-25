import db from "../../../middleware/db";
import { sign } from "../../../middleware/auth";
import User from "../../../models/user";
import { userValidator } from "../../../middleware/validators/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, password } = req.body;

    if (!userValidator(name, password)) {
      return res.status(400).send("Invalid Input");
    }

    try {
      const passwordhash = await sign(password);
      const user = new User({
        name,
        password: passwordhash,
      });

      const usercreated = await user.save();
      return res.status(200).send(usercreated);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default db(handler);
