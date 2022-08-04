import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";
import Player from "../../models/player";
import { connectMongo } from "../../middleware/db";
import styles from "./index.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddNewPlayerModal from "../../components/Players/AddNewPlayerModal";

export default function index({ players }) {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <Typography mt={8} variant={"h4"} align="center">
        Access Denied
      </Typography>
    );
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
        <Box className={styles.updateContainer} mt={2} mb={2}></Box>
        <Box mt={2} mb={2}>
          <TableContainer className={styles.playersTable} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Account ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Calib. Games</TableCell>
                  <TableCell>Calib. Wins</TableCell>
                  <TableCell>Calib. Loses</TableCell>
                  <TableCell>Calib. MMR</TableCell>
                  <TableCell>Real MMR</TableCell>

                  <TableCell>Total Games</TableCell>
                  <TableCell>Total Wins</TableCell>
                  <TableCell>Total Loses</TableCell>
                  <TableCell>Winrate</TableCell>
                  <TableCell>Inhouse MMR</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.accountId}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.calibrationGames}</TableCell>
                    <TableCell>{row.calibrationWins}</TableCell>
                    <TableCell>{row.calibrationLoses}</TableCell>
                    <TableCell>{row.calibrationMmr}</TableCell>
                    <TableCell>{row.realMmr}</TableCell>

                    <TableCell>{row.totalGames}</TableCell>
                    <TableCell>{row.totalWins}</TableCell>
                    <TableCell>{row.totalLoses}</TableCell>
                    <TableCell>
                      {`${parseInt(
                        (row.totalWins /
                          (row.totalGames ? row.totalGames : 1)) *
                          100,
                        10
                      )}`}
                      %
                    </TableCell>
                    <TableCell>{row.inhouseMmr}</TableCell>
                    <TableCell>
                      <Button variant="text" size="small">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
