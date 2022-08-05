import Player from "../models/player";

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

    if (findPlayer.isCalibrated || findPlayer.calibrationGames >= 10) {
      findPlayer.inhouseMmr += 50;
    } else {
      findPlayer.calibrationGames++;
      findPlayer.calibrationWins++;
      findPlayer.calibrationMmr += 200;
      findPlayer.inhouseMmr += 200;

      findPlayer.isCalibrated =
        findPlayer.calibrationGames === 10 ? true : false;
    }

    await findPlayer.save();
  } else {
    // Update players relevent stats
    findPlayer.totalGames++;
    findPlayer.totalLoses++;

    if (findPlayer.isCalibrated || findPlayer.calibrationGames >= 10) {
      findPlayer.inhouseMmr -= 50;
    } else {
      findPlayer.calibrationGames++;
      findPlayer.calibrationLoses++;
      findPlayer.calibrationMmr -= 200;
      findPlayer.inhouseMmr -= 200;

      findPlayer.isCalibrated =
        findPlayer.calibrationGames === 10 ? true : false;
    }

    await findPlayer.save();
  }

  return {
    player: findPlayer,
    accountId: accountId,
  };
};
