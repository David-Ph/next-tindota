import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { callApi } from "../../util/CommonService";

function AddNewPlayerModal({ open = false, handleClose = () => {} }) {
  const router = useRouter();
  // Add Player Ref
  const newFormRef = useRef();
  const newNameRef = useRef();
  const newAccountIdRef = useRef();
  const newRealMmrRef = useRef();
  const [error, setError] = useState({ show: false, message: "" });
  const [info, setInfo] = useState({ show: false, message: "" });

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

    const response = await callApi(
      "/api/players/create",
      "POST",
      JSON.stringify(playerData)
    );

    if (!response.ok) {
      setError({ show: true, message: "Something went wrong!" });
    } else {
      setInfo({ show: true, message: "Success!" });
    }

    newFormRef.current.reset();
    router.push("/players");
  };

  return (
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
          <Alert
            variant="outlined"
            severity="info"
            sx={{ display: info.show ? "flex" : "none" }}
            onClose={() => {
              setInfo({ ...info, show: false });
            }}
          >
            {info.message}
          </Alert>
          <Alert
            variant="outlined"
            severity="error"
            sx={{ display: error.show ? "flex" : "none" }}
            onClose={() => {
              setError({ ...error, show: false });
            }}
          >
            {error.message}
          </Alert>
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
  );
}

export default AddNewPlayerModal;
