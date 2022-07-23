import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./index.module.css";

function MainNavigation() {
  return (
    <Box component={"header"} className={styles.header}>
      <Box className={styles.logoContainer}>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width="64"
          height="64"
        />
        <Typography ml={1} variant={"h3"} component={"h3"}>
          Tindota
        </Typography>
      </Box>
      <Box component={"nav"}>
        <ul>
          <li>
            <Link href="/">Balancer</Link>
          </li>
          <li>
            <Link href="/players">Players</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default MainNavigation;
