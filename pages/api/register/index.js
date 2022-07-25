import db from "../../../middleware/db";
import { sign } from "../../../middleware/auth";
import User from "../../../models/user";
import { authValidator } from "../../../middleware/validators/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, password } = req.body;
    if (authValidator(name, password)) {
      try {
        // Hash password to store it in DB
        const passwordhash = await sign(password);
        const user = new User({
          name,
          password: passwordhash,
        });
        // Create new user
        const usercreated = await user.save();
        return res.status(200).send(usercreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    }

    return res.status(400).send("Invalid Input");
  }

  return res.status(404).send("Method not found");
};

export default db(handler);
