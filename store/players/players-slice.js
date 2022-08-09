import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    players: [],
  },
  reducers: {
    seedPlayers(state, action) {
      state.players = action.payload;
    },
    addNewPlayer(state, action) {
      state.players.push(action.payload);
      state.players.sort((player, nextPlayer) => nextPlayer.mmr - player.mmr);
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice;
