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
};

export default createTheme({
  palette: palette,
  components: components,
});
