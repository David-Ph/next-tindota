import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

function PlayersTable({ players }) {
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
                  (row.totalWins / (row.totalGames ? row.totalGames : 1)) * 100,
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
  );
}

export default PlayersTable;
