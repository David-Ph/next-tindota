import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export const sign = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const checkPassword = (inputPassword, dbPassword) => {
  return bcrypt.compareSync(inputPassword, dbPassword);
};

export const getToken = (data) => {
  return jwt.sign(data, process.env.JWT_TOKEN, {
    expiresIn: "60d",
  });
};
