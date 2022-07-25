import validator from "validator";

export const userValidator = (name, password) => {
  if (!name || !password) return false;

  if (
    !validator.isAlphanumeric(name) ||
    !validator.isLength(password, { min: 0 })
  ) {
    return false;
  }

  return true;
};
