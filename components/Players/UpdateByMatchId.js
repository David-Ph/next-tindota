import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { callApi } from "../../util/CommonService";

function UpdateByMatchId() {
  const router = useRouter();
  const formRef = useRef();
  const [error, setError] = useState({ show: false, message: "" });
  const [info, setInfo] = useState({ show: false, message: "" });
  const [matchId, setMatchId] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      matchId: matchId,
    };

    const response = await callApi(
      `/api/players/updateByMatchId`,
      "PUT",
      JSON.stringify(body)
    );

    const resBody = await response.json();

    if (!response.ok) {
      setError({ show: true, message: resBody.message });
    } else {
      const updatedPlayersList = resBody.updatedPlayers;
      const failedPlayersList = resBody.failedToUpdate;
      const playersStr = updatedPlayersList.join(", ");
      const failedPlayerStr = failedPlayersList.join(", ");

      let message = `Ok! Updated a total of ${updatedPlayersList.length} players: ${playersStr}.`;

      if (failedPlayersList.length > 0) {
        message += ` Failed to update ${failedPlayersList.length} players: ${failedPlayerStr}`;
      }

      setInfo({
        show: true,
        message: message,
      });
    }

    formRef.current.reset();
    router.push("/players");
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", alignItems: "center" }}
      noValidate
      ref={formRef}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        name="matchId"
        label="Match ID"
        variant="outlined"
        size="small"
        margin="normal"
        value={matchId}
        sx={{ marginTop: "0.5rem" }}
        onChange={(e) => setMatchId(e.target.value)}
      />
      <Button
        sx={{ marginLeft: "0.5rem", marginRight: "1em" }}
        type="submit"
        color="info"
        variant="contained"
      >
        Update MMR By Match ID
      </Button>
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
    </Box>
  );
}

export default UpdateByMatchId;
