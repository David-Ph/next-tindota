import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    players: [],
    avgMmr: 0,
  },
  reducers: {
    seedPlayers(state, action) {
      state.players = action.payload;
    },
    addNewPlayer(state, action) {
      state.players.push(action.payload);
      state.avgMmr = parseInt(
        state.players.reduce((a, b) => a + b.mmr, 0) / state.players.length,
        10
      );
      state.players.sort((player, nextPlayer) => nextPlayer.mmr - player.mmr);
    },
    removePlayer(state, action) {
      const name = action.payload;
      state.avgMmr = parseInt(
        state.players.reduce((a, b) => a + b.mmr, 0) / state.players.length,
        10
      );
      state.players = state.players.filter((player) => player.name !== name);
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice;
