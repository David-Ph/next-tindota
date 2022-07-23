import bcrypt from "bcrypt";

const saltRounds = 10;

export const sign = async (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const checkPassword = async (inputPassword, dbPassword) => {
  return bcrypt.compareSync(inputPassword, dbPassword);
};
