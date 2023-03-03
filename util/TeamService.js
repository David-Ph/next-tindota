import { getRandomInt } from "./CommonService";
import _ from "lodash";

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
      first.reduce((a, b) => a + b?.mmr, 0) / first.length -
        second.reduce((a, b) => a + b?.mmr, 0) / second.length
    );

    if (diff < targetDiff) {
      targetDiff = diff;
      firstTeam = first;
      secondTeam = second;
    }
  }

  return [firstTeam, secondTeam];
};

export const getGaryShuffles = (playersList) => {
  const firstTeam = [];
  const secondTeam = [];

  playersList.forEach((player, index) => {
    if (
      index === 0 ||
      index === 3 ||
      index === 4 ||
      index === 7 ||
      index === 9
    ) {
      firstTeam.push({
        ...player,
        index: index + 1,
      });
    } else {
      secondTeam.push({
        ...player,
        index: index + 1,
      });
    }
  });

  return [firstTeam, secondTeam];
};

export const getTripleHighShuffles = (playersList) => {
  const firstTeam = [];
  const secondTeam = [];

  playersList.forEach((player, index) => {
    if (
      index === 0 ||
      index === 3 ||
      index === 5 ||
      index === 6 ||
      index === 9
    ) {
      firstTeam.push({
        ...player,
        index: index + 1,
      });
    } else {
      secondTeam.push({
        ...player,
        index: index + 1,
      });
    }
  });

  return [firstTeam, secondTeam];
};

export const getOneHighShuffles = (playersList) => {
  const firstTeam = [];
  const secondTeam = [];

  playersList.forEach((player, index) => {
    // Possible Algorithms:
    // 1, 4, 5, 9, 10
    // 1, 4, 7, 8, 10
    // 1, 2, 7, 9, 10
    // 1, 3, 7, 8, 10
    // Current Algorithm: 1, 4, 7, 8, 10
    if (
      index === 0 ||
      index === 3 ||
      index === 6 ||
      index === 7 ||
      index === 9
    ) {
      firstTeam.push({
        ...player,
        index: index + 1,
      });
    } else {
      secondTeam.push({
        ...player,
        index: index + 1,
      });
    }
  });

  return [firstTeam, secondTeam];
};

export const getOneLowShuffles = (playersList) => {
  const firstTeam = [];
  const secondTeam = [];

  playersList.forEach((player, index) => {
    // Possible Algorithms:
    // 1, 4, 5, 9, 10
    // 1, 4, 7, 8, 10
    // 1, 2, 7, 9, 10
    // 1, 3, 7, 8, 10
    // Current Algorithm: 1, 4, 7, 8, 10
    if (
      index === 0 ||
      index === 3 ||
      index === 6 ||
      index === 7 ||
      index === 9
    ) {
      firstTeam.push({
        ...player,
        index: index + 1,
      });
    } else {
      secondTeam.push({
        ...player,
        index: index + 1,
      });
    }
  });

  return [firstTeam, secondTeam];
};

function splitRandomTeam(data) {
  const arr = [...data];
  let firstTeam = [];
  let secondTeam = [];

  while (firstTeam.length < 5 && secondTeam.length < 5) {
    const getTeam = getRandomInt(1, 2);
    if (getTeam === 1) {
      firstTeam.push(arr.shift());
    } else {
      secondTeam.push(arr.shift());
    }
  }

  if (firstTeam.length < 5) {
    firstTeam = firstTeam.concat(arr);
  } else {
    secondTeam = secondTeam.concat(arr);
  }

  return [firstTeam, secondTeam];
}

export const sortTeamShuffle = (playersList) => {
  const sortedPlayers = [...playersList];

  let [firstTeam, secondTeam] = splitRandomTeam(sortedPlayers);

  firstTeam = firstTeam.map((player) => {
    const index = _.findIndex(sortedPlayers, ["name", player?.name]);
    return {
      ...player,
      index: index + 1,
    };
  });

  secondTeam = secondTeam.map((player) => {
    const index = _.findIndex(sortedPlayers, ["name", player?.name]);
    return {
      ...player,
      index: index + 1,
    };
  });

  return [firstTeam, secondTeam];
};

export const getClosestMmrShuffle = (playersList) => {
  let firstTeam = [];
  let secondTeam = [];
  let targetDiff = 750;

  for (let i = 0; i < 150; i++) {
    const [first, second] = sortTeamShuffle(playersList);
    const diff = Math.abs(
      first.reduce((a, b) => a + b?.mmr, 0) / first.length -
        second.reduce((a, b) => a + b?.mmr, 0) / second.length
    );
    console.log(targetDiff);
    if (diff < targetDiff) {
      targetDiff = diff;
      firstTeam = first;
      secondTeam = second;
    }
  }

  return [firstTeam, secondTeam];
};
