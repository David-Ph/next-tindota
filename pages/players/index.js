import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";
import Player from "../../models/player";
import { connectMongo } from "../../middleware/db";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function index({ players }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Add Player Ref
  const newFormRef = useRef();
  const newNameRef = useRef();
  const newAccountIdRef = useRef();
  const newRealMmrRef = useRef();

  const onAddNewPlayer = async (event) => {
    event.preventDefault();

    const name = newNameRef.current.value;
    const accountId = newAccountIdRef.current.value;
    const realMmr = newRealMmrRef.current.value;

    const playerData = {
      name,
      accountId,
      realMmr,
    };

    await fetch("/api/players/create", {
      method: "POST",
      body: JSON.stringify(playerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    newFormRef.current.reset();
    router.push("/players");
  };

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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modalContainer">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Player
              </Typography>
              <Divider />
              <Box
                className={styles.inputContainer}
                component="form"
                noValidate
                ref={newFormRef}
                autoComplete="off"
                onSubmit={onAddNewPlayer}
                id="modal-modal-description"
              >
                <TextField
                  name="name"
                  fullWidth
                  label="Player Name"
                  variant="outlined"
                  margin="normal"
                  inputRef={newNameRef}
                />
                <TextField
                  fullWidth
                  name="accountId"
                  label="Player Account Id"
                  variant="outlined"
                  margin="normal"
                  inputRef={newAccountIdRef}
                />
                <TextField
                  fullWidth
                  name="realMmr"
                  label="Player MMR"
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputRef={newRealMmrRef}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <Button
                  sx={{ marginTop: "0.5rem" }}
                  type="submit"
                  color="info"
                  variant="contained"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Modal>
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
  const players = await Player.find().sort({
    name: 1,
  });

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
