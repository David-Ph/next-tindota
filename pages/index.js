import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/players/players-slice";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SectionContainer from "../components/UI/SectionContainer/SectionContainer";
import Player from "../models/player";
import { connectMongo } from "../middleware/db";
import styles from "./index.module.css";
import AddCustomPlayer from "../components/Balancers/AddCustomPlayer";
import AddPlayerFromList from "../components/Balancers/AddPlayerFromList";

export default function index({ players }) {
  const { status } = useSession();

  const dispatch = useDispatch();
  const playersListing = useSelector((state) => state.players.players);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <Box className={styles.root}>
      <SectionContainer mt={2} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box>
              <AddPlayerFromList players={players} />
              <AddCustomPlayer />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <p>xs=4</p>
          </Grid>
        </Grid>
      </SectionContainer>
    </Box>
  );
}

export async function getServerSideProps() {
  await connectMongo();
  const players = await Player.find()
    .collation({ locale: "en", strength: 1 })
    .sort({
      name: 1,
    });

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
