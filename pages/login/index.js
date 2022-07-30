import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styles from "./index.module.css";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";
import { getCsrfToken } from "next-auth/react";

export default function index({ csrfToken }) {
  return (
    <Box className={styles.root}>
      <SectionContainer mt={2}>
        <Typography align="center" component="h2" variant="h5">
          Sign In
        </Typography>
        <Box
          className={styles.inputContainer}
          component="form"
          noValidate
          autoComplete="off"
          action="/api/auth/callback/credentials"
          method="post"
          mt={2}
          mb={2}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <TextField
            name="username"
            fullWidth
            label="Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            name="password"
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

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
