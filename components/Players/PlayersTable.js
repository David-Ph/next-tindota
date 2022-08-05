import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import EditPlayerModal from "./EditPlayerModal";

function PlayersTable({ players }) {
  const [editModal, setEditModal] = useState({ show: false, data: null });
  const handleOpen = (data) => setEditModal({ show: true, data: data });
  const handleClose = () => setEditModal({ ...editModal, show: false });

  const onEdit = (event) => {
    const row = event.target.parentElement.parentElement;

    const playerData = {
      accountId: row.querySelector(".accountId").textContent,
      name: row.querySelector(".name").textContent,
      calibrationGames: row.querySelector(".calibrationGames").textContent,
      calibrationWins: row.querySelector(".calibrationWins").textContent,
      calibrationLoses: row.querySelector(".calibrationLoses").textContent,
      calibrationMmr: row.querySelector(".calibrationMmr").textContent,
      realMmr: row.querySelector(".realMmr").textContent,
      totalGames: row.querySelector(".totalGames").textContent,
      totalWins: row.querySelector(".totalWins").textContent,
      totalLoses: row.querySelector(".totalLoses").textContent,
      inhouseMmr: row.querySelector(".inhouseMmr").textContent,
    };

    handleOpen(playerData);
  };

  return (
    <TableContainer component={Paper}>
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
              <TableCell component="th" scope="row" className={"accountId"}>
                {row.accountId}
              </TableCell>
              <TableCell className={"name"}>{row.name}</TableCell>
              <TableCell className={"calibrationGames"}>
                {row.calibrationGames}
              </TableCell>
              <TableCell className={"calibrationWins"}>
                {row.calibrationWins}
              </TableCell>
              <TableCell className={"calibrationLoses"}>
                {row.calibrationLoses}
              </TableCell>
              <TableCell className={"calibrationMmr"}>
                {row.calibrationMmr}
              </TableCell>
              <TableCell className={"realMmr"}>{row.realMmr}</TableCell>

              <TableCell className={"totalGames"}>{row.totalGames}</TableCell>
              <TableCell className={"totalWins"}>{row.totalWins}</TableCell>
              <TableCell className={"totalLoses"}>{row.totalLoses}</TableCell>
              <TableCell>
                {`${parseInt(
                  (row.totalWins / (row.totalGames ? row.totalGames : 1)) * 100,
                  10
                )}`}
                %
              </TableCell>
              <TableCell className={"inhouseMmr"}>{row.inhouseMmr}</TableCell>
              <TableCell>
                <Button onClick={onEdit} variant="text" size="small">
                  Edit
                </Button>
                <EditPlayerModal
                  open={editModal.show}
                  data={editModal.data}
                  handleClose={handleClose}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayersTable;
