import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styles from "./index.module.css";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

export default function index() {
  const onLogin = (e) => {
    e.preventDefault();
    console.log("Hello");
  };
  return (
    <Box className={styles.root}>
      <SectionContainer mt={2}>
        <Typography align="center" component="h2" variant="h5">
          Sign In
        </Typography>
        <Box
          onSubmit={onLogin}
          className={styles.inputContainer}
          component="form"
          noValidate
          autoComplete="off"
          mt={2}
          mb={2}
        >
          <TextField fullWidth label="Email" variant="outlined" />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button type="submit" color="info" variant="contained">
            Sign In
          </Button>
        </Box>
      </SectionContainer>
    </Box>
  );
}
