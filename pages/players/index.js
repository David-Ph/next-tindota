import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";
import Player from "../../models/player";
import { connectMongo } from "../../middleware/db";
import styles from "./index.module.css";
import AddNewPlayerModal from "../../components/Players/AddNewPlayerModal";
import PlayersTable from "../../components/Players/PlayersTable";
import UpdateByMatchId from "../../components/Players/UpdateByMatchId";
import ResetByMatchId from "../../components/Players/ResetPlayersByMatchId";
import BulkUpdatePlayersModal from "../../components/Players/BulkUpdatePlayersModal";

export default function index({ players }) {
  const { status } = useSession();
  // Add New Player Modal State
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Bulk Update Modal State
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const handleBulkUpdateModalOpen = () => setBulkUpdateOpen(true);
  const handleBulkUpdateModalClose = () => setBulkUpdateOpen(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <Box className={styles.root}>
      <SectionContainer mt={2} mb={2}>
        <Typography component="h2" variant="h5">
          Players
        </Typography>
        <Box className={styles.addContainer} mt={2} mb={2}>
          <Button onClick={handleOpen} variant="outlined" size="medium">
            Add New Player
          </Button>
          <AddNewPlayerModal open={open} handleClose={handleClose} />
        </Box>
        <Box className={styles.updateContainer} mt={2} mb={2}>
          <Button
            onClick={handleBulkUpdateModalOpen}
            variant="outlined"
            size="medium"
          >
            Bulk Update Players
          </Button>
          <BulkUpdatePlayersModal
            open={bulkUpdateOpen}
            handleClose={handleBulkUpdateModalClose}
            players={players}
          />
        </Box>
        <Box className={styles.updateContainer} mt={2} mb={2}>
          <UpdateByMatchId />
        </Box>
        <Box className={styles.updateContainer} mt={2} mb={2}>
          <ResetByMatchId />
        </Box>

        <Box mt={2} mb={2}>
          <PlayersTable players={players} />
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
