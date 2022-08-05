import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function UpdateByMatchId() {
  const router = useRouter();
  const formRef = useRef();
  const [matchId, setMatchId] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      matchId: matchId,
    };

    await fetch(`/api/players/updateByMatchId`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
        sx={{ marginLeft: "0.5rem" }}
        type="submit"
        color="info"
        variant="contained"
      >
        Update MMR By Match ID
      </Button>
    </Box>
  );
}

export default UpdateByMatchId;
