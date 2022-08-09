import { getRandomInt } from "./CommonService";

export const shufflePlayer = (playersList) => {
  const sortedPlayers = playersList;

  const firstTeam = [];
  const secondTeam = [];

  sortedPlayers?.forEach((player, index) => {
    const getTeam = getRandomInt(1, 2);

    if (index % 2 === 0) {
      getTeam === 1
        ? firstTeam.push({
            ...player,
            index: index + 1,
          })
        : secondTeam.push({
            ...player,
            index: index + 1,
          });
    } else {
      firstTeam.length > secondTeam.length
        ? secondTeam.push({
            ...player,
            index: index + 1,
          })
        : firstTeam.push({
            ...player,
            index: index + 1,
          });
    }
  });

  return [firstTeam, secondTeam];
};

export const getNormalShuffles = (playersList) => {
  let firstTeam = [];
  let secondTeam = [];
  let targetDiff = 750;

  for (let i = 0; i < 100; i++) {
    const [first, second] = shufflePlayer(playersList);
    const diff = Math.abs(
      first.reduce((a, b) => a + b.mmr, 0) / first.length -
        second.reduce((a, b) => a + b.mmr, 0) / second.length
    );

    if (diff < targetDiff) {
      targetDiff = diff;
      firstTeam = first;
      secondTeam = second;
    }
  }

  return [firstTeam, secondTeam];
};
