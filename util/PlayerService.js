import Player from "../models/player";
import {
  CALIBRATION_GAMES_TOTAL,
  CALIBRATION_MMR_CHANGES,
  NORMAL_MMR_CHANGES,
  STREAK_DETECTOR,
  STREAK_MMR_CHANGES,
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

  let mmrChanges = NORMAL_MMR_CHANGES;

  // Check Calibration Stats
  if (findPlayer.calibrationGames < CALIBRATION_GAMES_TOTAL) {
    mmrChanges = CALIBRATION_MMR_CHANGES;
    findPlayer.calibrationGames++;

    if (win) {
      findPlayer.calibrationWins++;
      findPlayer.calibrationMmr += mmrChanges;
    } else {
      findPlayer.calibrationLoses++;
      findPlayer.calibrationMmr -= mmrChanges;
    }
  }

  // check if win
  if (win) {
    findPlayer.totalWins++;
  } else {
    findPlayer.totalLoses++;
    mmrChanges = -Math.abs(mmrChanges);
  }

  // check on streak
  if (findPlayer.lastGameResult === win) {
    findPlayer.streak++;
  } else {
    findPlayer.streak = 0;
  }
  
  // Update player
  findPlayer.lastGameResult = win;
  findPlayer.totalGames++;
  findPlayer.inhouseMmr += mmrChanges;
  await findPlayer.save();

  return {
    player: findPlayer,
    accountId: accountId,
  };
};

export const resetPlayerMmr = async (accountId, win) => {
  if (!accountId) return;

  let findPlayer = await Player.findOne({
    accountId: accountId,
  });

  if (!findPlayer)
    return {
      accountId: accountId,
      player: false,
    };

  let mmrChanges = NORMAL_MMR_CHANGES;

  // Check Calibration Stats
  if (findPlayer.calibrationGames <= CALIBRATION_GAMES_TOTAL) {
    mmrChanges = CALIBRATION_MMR_CHANGES;
    findPlayer.calibrationGames--;

    if (win) {
      findPlayer.calibrationWins--;
      findPlayer.calibrationMmr -= mmrChanges;
    } else {
      findPlayer.calibrationLoses--;
      findPlayer.calibrationMmr += mmrChanges;
    }
  }

  // check if win
  if (win) {
    findPlayer.totalWins--;
  } else {
    findPlayer.totalLoses--;
    mmrChanges = -Math.abs(mmrChanges);
  }

  // Update player
  findPlayer.totalGames--;
  findPlayer.inhouseMmr -= mmrChanges;
  await findPlayer.save();

  return {
    player: findPlayer,
    accountId: accountId,
  };
};
