import db from "../../../middleware/db";
import { checkPassword, getToken } from "../../../middleware/auth";
import User from "../../../models/user";
import { userValidator } from "../../../middleware/validators/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, password } = req.body;

    if (!userValidator(name, password)) {
      return res.status(400).send("Invalid Input");
    }

    try {
      const user = await User.findOne({
        name: name,
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      const comparePassword = checkPassword(password, user.password);

      if (!comparePassword) {
        return res.status(403).send("Wrong Password");
      }

      const token = getToken({ user });

      return res.status(200).send({ token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  return res.status(404).send("Method not found");
};

export default db(handler);
