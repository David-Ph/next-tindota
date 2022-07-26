import validator from "validator";

export const matchValidator = (matchId) => {
  if (!matchId) return false;

  if (!validator.isNumeric(matchId.toString())) {
    return false;
  }

  return true;
};
