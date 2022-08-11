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
import TeamTable from "../components/Balancers/TeamTable";
import { NORMAL_BALANCER, TRIPLE_HIGH, ONE_HIGH } from "../util/constants";

export default function index({ players }) {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <Box className={styles.root}>
      <SectionContainer mt={2} mb={2}>
        <Grid container spacing={2} mb={4}>
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
        <Box mt={4}>
          <TeamTable
            title="Normal Balancer"
            type={NORMAL_BALANCER}
            description="Use this whenever there is no player whose MMR is overwhelmingly higher than the rest"
          ></TeamTable>
        </Box>
        <Box mt={2}>
          <TeamTable
            title="3 High MMR"
            type={TRIPLE_HIGH}
            description="Use this when there are 3 high players with at least 2000 MMR higher than the 4th highest"
          ></TeamTable>
        </Box>
        <Box mt={2}>
          <TeamTable
            title="1 High MMR"
            type={ONE_HIGH}
            description="Use this when there is 1 player with at least 2000 MMR higher than the 2nd highest"
          ></TeamTable>
        </Box>
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
