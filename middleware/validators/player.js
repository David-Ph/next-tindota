import validator from "validator";

export const playerValidator = (accountId, name, realMmr) => {
  if (!name || !accountId || !realMmr) return false;

  if (
    !validator.isNumeric(realMmr.toString()) ||
    !validator.isNumeric(accountId.toString()) ||
    !validator.isLength(name, { min: 0 })
  ) {
    return false;
  }

  return true;
};
