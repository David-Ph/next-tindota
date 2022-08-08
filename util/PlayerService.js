import Player from "../models/player";
import {
  CALIBRATION_GAMES_TOTAL,
  CALIBRATION_MMR_CHANGES,
  NORMAL_MMR_CHANGES,
} from "./constants";

export const updatePlayerMmr = async (accountId, win) => {
  if (!accountId) return;

  let findPlayer = await Player.findOne({
    accountId: accountId,
  });

  if (!findPlayer)
    return {
      accountId: accountId,
      player: false,
    };

  if (win) {
    // Update players relevent stats
    findPlayer.totalGames++;
    findPlayer.totalWins++;

    if (
      findPlayer.isCalibrated ||
      findPlayer.calibrationGames >= CALIBRATION_GAMES_TOTAL
    ) {
      findPlayer.inhouseMmr += NORMAL_MMR_CHANGES;
    } else {
      findPlayer.calibrationGames++;
      findPlayer.calibrationWins++;
      findPlayer.calibrationMmr += CALIBRATION_MMR_CHANGES;
      findPlayer.inhouseMmr += CALIBRATION_MMR_CHANGES;

      findPlayer.isCalibrated =
        findPlayer.calibrationGames === CALIBRATION_GAMES_TOTAL ? true : false;
    }

    await findPlayer.save();
  } else {
    // Update players relevent stats
    findPlayer.totalGames++;
    findPlayer.totalLoses++;

    if (
      findPlayer.isCalibrated ||
      findPlayer.calibrationGames >= CALIBRATION_GAMES_TOTAL
    ) {
      findPlayer.inhouseMmr -= NORMAL_MMR_CHANGES;
    } else {
      findPlayer.calibrationGames++;
      findPlayer.calibrationLoses++;
      findPlayer.calibrationMmr -= CALIBRATION_MMR_CHANGES;
      findPlayer.inhouseMmr -= CALIBRATION_MMR_CHANGES;

      findPlayer.isCalibrated =
        findPlayer.calibrationGames === CALIBRATION_GAMES_TOTAL ? true : false;
    }

    await findPlayer.save();
  }

  return {
    player: findPlayer,
    accountId: accountId,
  };
};
