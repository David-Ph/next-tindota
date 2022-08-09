import { configureStore } from "@reduxjs/toolkit";

import playerSlice from "./players/players-slice";

const store = configureStore({
  reducer: {
    players: playerSlice.reducer,
  },
});

export default store;
