import Head from "../Head";
import MainNavigation from "../MainNavigation";
import Container from "@mui/material/Container";

function MainLayout(props) {
  return (
    <Container maxWidth={"xl"}>
      <Head />
      <MainNavigation />
      <main>{props.children}</main>
    </Container>
  );
}

export default MainLayout;
