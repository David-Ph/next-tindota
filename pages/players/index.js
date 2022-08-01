import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";
import Player from "../../models/player";
import { connectMongo } from "../../middleware/db";
import styles from './index.module.css';

export default function index(props) {
  console.log(props);
  return (
    <Box className={styles.root}>
      <SectionContainer mt={2}>
        <Typography component="h2" variant="h5">
          Players
        </Typography>
      </SectionContainer>
    </Box>
  );
}

export async function getServerSideProps() {
  await connectMongo();
  const players = await Player.find();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
