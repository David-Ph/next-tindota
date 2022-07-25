import { Schema, model, models } from "mongoose";

const matchSchema = new Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Match = models.Match || model("Match", matchSchema);

export default Match;
