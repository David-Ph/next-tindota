import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./MainNavigation.module.css";
import NavigationItem from "../../NavigationItem/NavigationItem";
import { useSession, signOut } from "next-auth/react";

function MainNavigation() {
  const { data: isLoggedIn } = useSession();

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
            <NavigationItem href="/">Balancer</NavigationItem>
          </li>
          <li>
            <NavigationItem href="/players">Players</NavigationItem>
          </li>
          {isLoggedIn ? (
            <li>
              <NavigationItem onClick={() => signOut()}>Log out</NavigationItem>
            </li>
          ) : (
            <li>
              <NavigationItem href="/login">Login</NavigationItem>
            </li>
          )}
        </ul>
      </Box>
    </Box>
  );
}

export default MainNavigation;
