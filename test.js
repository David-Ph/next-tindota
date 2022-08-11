var arr = [
  {
    name: "YobaFromStarWars",
    mmr: 4850,
  },
  {
    name: "aeryj",
    mmr: 4450,
  },
  {
    name: "Wei / Indian Mummy",
    mmr: 4050,
  },
  {
    name: "Axeldota",
    mmr: 4000,
  },
  {
    name: "swithdas",
    mmr: 3250,
  },
  {
    name: "Quinty",
    mmr: 3140,
  },
  {
    name: "SlowDuck",
    mmr: 2200,
  },
  {
    name: "Aeron Zero",
    mmr: 1960,
  },
  {
    name: "Banana Bureau",
    mmr: 1800,
  },
  {
    name: "QuanTim/Silicon",
    mmr: -800,
  },
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function splitRandomTeam(data) {
  const arr = [...data];
  let firstTeam = [];
  let secondTeam = [];

  for (let i = 0; i < 100; i++) {
    if (firstTeam.length >= 5 || secondTeam.length >= 5) {
      console.log(`First Team Length is ${firstTeam.length}`);
      console.log(`Second Team Length is ${secondTeam.length}`);

      break;
    }

    const getTeam = getRandomInt(1, 2);

    if (getTeam === 1) {
      firstTeam.push({
        ...arr.shift(),
        index: i + 1,
      });
    } else {
      secondTeam.push({
        ...arr.shift(),
        index: i + 1,
      });
    }
  }

  if (firstTeam.length < 5) {
    firstTeam = firstTeam.concat(arr);
  } else {
    secondTeam = secondTeam.concat(arr);
  }

  return [firstTeam, secondTeam];
}

console.log(splitRandomTeam(arr));
