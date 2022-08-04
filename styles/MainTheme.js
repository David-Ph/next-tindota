import { createTheme } from "@mui/material/styles";

const palette = {
  tindota: {
    primary: "#9f2812",
    secondary: "#ac2e15",
    tertiary: "#000301",
    titleText: "#e2dace",
    mainText: "#fff",
    primaryBg: "#1c242d",
    secondaryBg: "#28333d",
    tertiaryBg: "#2d3741",
  },
};

const components = {
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: palette.tindota.mainText,
          },
          "&:hover fieldset": {
            borderColor: palette.tindota.mainText,
          },
          "&.Mui-focused fieldset": {
            borderColor: palette.tindota.mainText,
          },
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        color: palette.tindota.mainText,
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: palette.tindota.mainText,
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        backgroundColor: palette.tindota.secondaryBg,
        "& 	.MuiTableCell-root": {
          color: palette.tindota.titleText,
        },
      },
    },
  },
  MuiModal: {
    styleOverrides: {
      root: {
        "& .modalContainer": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          backgroundColor: palette.tindota.secondaryBg,
          border: "2px solid #000",
          boxShadow: 24,
          padding: "1rem",
          p: 4,
        },
      },
    },
  },
};

export default createTheme({
  palette: palette,
  components: components,
});
