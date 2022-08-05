import { addPlayers, removePlayers } from "./players.js";

async function add() {
  await Promise.all([addPlayers()]);
}

async function remove() {
  await Promise.all([removePlayers()]);
}

if (process.argv[2] === "add") {
  add().then(() => {
    console.log("Seeders success");
    process.exit(0);
  });
} else if (process.argv[2] === "remove") {
  remove().then(() => {
    console.log("Delete data success");
    process.exit(0);
  });
}
