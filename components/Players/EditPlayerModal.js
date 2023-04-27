import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import styles from "./EditPlayerModal.module.css";
import { callApi } from "../../util/CommonService";

function EditPlayerModal({
  open = false,
  data = null,
  handleClose = () => {},
}) {
  const router = useRouter();
  const newFormRef = useRef();
  const [name, setName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [realMmr, setRealMmr] = useState(0);
  const [calibrationGames, setCalibrationGames] = useState(0);
  const [calibrationWins, setCalibrationWins] = useState(0);
  const [calibrationLoses, setCalibrationLoses] = useState(0);
  const [calibrationMmr, setCalibrationMmr] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLoses, setTotalLoses] = useState(0);
  const [inhouseMmr, setInhouseMmr] = useState(0);

  useEffect(() => {
    if (!data) return;

    setName(data?.name);
    setAccountId(data?.accountId);
    setRealMmr(+data?.realMmr);

    setCalibrationGames(+data?.calibrationGames);
    setCalibrationWins(+data?.calibrationWins);
    setCalibrationLoses(+data?.calibrationLoses);
    setCalibrationMmr(+data?.calibrationMmr);

    setTotalGames(+data?.totalGames);
    setTotalWins(+data?.totalWins);
    setTotalLoses(+data?.totalLoses);
    setInhouseMmr(+data?.inhouseMmr);
  }, [data]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const playerData = {
      name,
      realMmr,
      calibrationGames,
      calibrationWins,
      calibrationLoses,
      calibrationMmr,
      totalGames,
      totalWins,
      totalLoses,
      inhouseMmr,
    };

    await callApi(
      `/api/players/${accountId}`,
      "PUT",
      JSON.stringify(playerData)
    );

    newFormRef.current.reset();
    router.push("/players");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title-edit"
      aria-describedby="modal-modal-description-edit"
      className={styles.editModal}
    >
      <Box className={`modalContainer ${styles.editModalContainer}`}>
        <Typography id="modal-modal-title-edit" variant="h6" component="h2">
          Edit Player
        </Typography>
        <Divider />
        <Box
          component="form"
          noValidate
          ref={newFormRef}
          autoComplete="off"
          onSubmit={onSubmit}
          id="modal-modal-description-edit"
        >
          <Box display="flex" gap={2}>
            <Box>
              <TextField
                fullWidth
                name="accountId"
                label="Player Account Id"
                variant="outlined"
                margin="normal"
                value={accountId}
              />
              <TextField
                name="name"
                fullWidth
                label="Player Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                name="realMmr"
                label="Real MMR"
                variant="outlined"
                margin="normal"
                type="number"
                value={realMmr}
                onChange={(e) => setRealMmr(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="calibrationGames"
                label="Calibration Games"
                variant="outlined"
                margin="normal"
                type="number"
                value={calibrationGames}
                onChange={(e) => setCalibrationGames(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                fullWidth
                name="calibrationWins"
                label="Calibration Wins"
                variant="outlined"
                margin="normal"
                type="number"
                value={calibrationWins}
                onChange={(e) => setCalibrationWins(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                fullWidth
                name="calibrationLoses"
                label="Calibration Loses"
                variant="outlined"
                margin="normal"
                type="number"
                value={calibrationLoses}
                onChange={(e) => setCalibrationLoses(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                fullWidth
                name="calibrationMmr"
                label="Calibration MMR"
                variant="outlined"
                margin="normal"
                type="number"
                value={calibrationMmr}
                onChange={(e) => setCalibrationMmr(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                name="totalGames"
                label="Total Games"
                variant="outlined"
                margin="normal"
                type="number"
                value={totalGames}
                onChange={(e) => setTotalGames(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />

              <TextField
                fullWidth
                name="totalWins"
                label="Total Wins"
                variant="outlined"
                margin="normal"
                type="number"
                value={totalWins}
                onChange={(e) => setTotalWins(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                fullWidth
                name="totalLoses"
                label="Total Loses"
                variant="outlined"
                margin="normal"
                type="number"
                value={totalLoses}
                onChange={(e) => setTotalLoses(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                fullWidth
                name="inhouseMmr"
                label="Inhouse MMR"
                variant="outlined"
                margin="normal"
                type="number"
                value={inhouseMmr}
                onChange={(e) => setInhouseMmr(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Box>
          </Box>

          <Button
            sx={{ marginTop: "0.5rem" }}
            type="submit"
            color="info"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditPlayerModal;
