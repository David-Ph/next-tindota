import { Schema, model, models } from "mongoose";

const playerSchema = new Schema(
  {
    accountId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    realMmr: {
      type: Number,
      required: true,
      default: 0,
    },
    inhouseMmr: {
      type: Number,
      required: true,
      default: 0,
    },
    calibrationMmr: {
      type: Number,
      required: true,
      default: 0,
    },
    totalGames: {
      type: Number,
      required: true,
      default: 0,
    },
    totalWins: {
      type: Number,
      required: true,
      default: 0,
    },
    totalLoses: {
      type: Number,
      required: true,
      default: 0,
    },
    calibrationGames: {
      type: Number,
      required: true,
      default: 0,
    },
    calibrationWins: {
      type: Number,
      required: true,
      default: 0,
    },
    calibrationLoses: {
      type: Number,
      required: true,
      default: 0,
    },
    isCalibrated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // Enables timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Player = models?.Player || model("Player", playerSchema);

export default Player;
