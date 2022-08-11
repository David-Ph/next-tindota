import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    players: [],
    avgMmr: 0,
    currentPlayers: [],
  },
  reducers: {
    seedPlayers(state, action) {
      state.players = action.payload;
    },
    setPlayersReady(state, action) {
      state.currentPlayers = state.players;
    },
    clearPlayerListing(state, action) {
      state.players = [];
    },
    clearPlayersReady(state, action) {
      state.currentPlayers = [];
    },
    addNewPlayer(state, action) {
      state.players.push(action.payload);
      state.avgMmr = parseInt(
        state.players.reduce((a, b) => a + b.mmr, 0) / state.players.length ||
          0,
        10
      );
      state.players.sort((player, nextPlayer) => nextPlayer.mmr - player.mmr);
    },
    removePlayer(state, action) {
      const name = action.payload;
      state.players = state.players.filter((player) => player.name !== name);
      state.avgMmr = parseInt(
        state.players.reduce((a, b) => a + b.mmr, 0) / state.players.length ||
          0,
        10
      );
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice;
