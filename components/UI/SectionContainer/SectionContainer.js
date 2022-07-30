import Box from "@mui/material/Box";
import styles from "./SectionContainer.module.css";

function SectionContainer(props) {
  return (
    <Box
      sx={{ backgroundColor: "tindota.primaryBg" }}
      component={"div"}
      className={styles.root}
    >
      {props.children}
    </Box>
  );
}

export default SectionContainer;
