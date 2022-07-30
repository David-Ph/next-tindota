import Head from "../Head";
import MainNavigation from "../MainNavigation/MainNavigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function MainLayout(props) {
  return (
    <Container maxWidth={"xl"}>
      <Head />
      <MainNavigation />
      <Box component={"main"}>{props.children}</Box>
    </Container>
  );
}

export default MainLayout;
