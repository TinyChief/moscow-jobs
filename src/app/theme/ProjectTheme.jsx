import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { components } from "./components";
import { useDarkMode } from "usehooks-ts";

export const ColorModeContext = React.createContext({
  currentMode: null,
  toggleColorMode: () => {},
});

const ProjectTheme = ({ children }) => {
  const { isDarkMode, disable, enable } = useDarkMode();
  const [mode, setMode] = React.useState(isDarkMode ? "dark" : "light");

  const colorMode = React.useMemo(
    () => ({
      // currentMode: mode,
      toggleColorMode: () => {
        if (isDarkMode) {
          disable();
        } else {
          enable();
        }
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const lightPalette = {
    primary: {
      main: "#ffbe55",
      light: "#ffca7c",
      dark: "#ef6c00",
    },
    secondary: {
      main: "#663398",
    },
  };

  const darkPalette = {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark" ? darkPalette : lightPalette),
        },
        // ...themeColors[CURRENT_THEME],

        typography: {
          fontFamily: `"Nunito", "Roboto", "Helvetica", "Arial", sans-serif`,
          fontSize: 14,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          body1: { fontSize: "14px" },
        },

        status: { danger: red[500] },
        components: { ...components },
      }),
    [mode]
  );

  // useEffect(() => {
  //   enable();
  // });

  return (
    <ColorModeContext.Provider
      value={{ currentMode: mode, toggleColorMode: colorMode.toggleColorMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ProjectTheme;
