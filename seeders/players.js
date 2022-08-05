import { players } from "./data.js";
import Player from "../models/player.js";

export const addPlayers = async function () {
  players.forEach((player) => {
    Player.create(player);
  });

  console.log("Players has been seeded.");
}

export const removePlayers = async function () {
  Player.remove();
  console.log("Players has been removed.");
}
