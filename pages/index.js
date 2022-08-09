import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SectionContainer from "../components/UI/SectionContainer/SectionContainer";
import Player from "../models/player";
import { connectMongo } from "../middleware/db";
import styles from "./index.module.css";
import AddCustomPlayer from "../components/Balancers/AddCustomPlayer";
import AddPlayerFromList from "../components/Balancers/AddPlayerFromList";
import PlayersListTable from "../components/Balancers/PlayersListTable";

export default function index({ players }) {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <Box className={styles.root}>
      <SectionContainer mt={2} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box display="flex" gap={2} flexDirection="column">
              <AddPlayerFromList players={players} />
              <AddCustomPlayer />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <PlayersListTable />
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
