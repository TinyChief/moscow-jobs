import React, { createContext, useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Icon,
  IconButton,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useUser } from "../hooks/useUser";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

export const NotifyBarProvider = ({ children, component, render }) => {
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { user } = useUser();
  const theme = useTheme();

  const notifyBarTheme = createTheme(theme, {
    mode: "dark",
    palette: { primary: { main: "#fff", light: "#fff", dark: "#fff" } },
  });

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    window.localStorage.setItem("lastSeenStatus", user.status.name);
    setMessage("");
  };

  useEffect(() => {
    if (user && user.status) {
      const lastSeedStatus = window.localStorage.getItem("lastSeenStatus");
      if (lastSeedStatus === user.status.name) return;

      setMessage(getNotifyText(user.status));
    }
  }, [user]);

  if (!(user && user.status)) return React.cloneElement(children);

  return (
    <>
      <ThemeProvider theme={notifyBarTheme}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            left: "0",
            top: "0",
            minHeight: "48px",
            transition: "0.3s",
            overflow: "hidden",
            backgroundImage: "linear-gradient(90deg,  #1e3c72,#2a5298)",
            color: theme.palette.primary.dark,
            width: "100%",
            display: message ? "flex" : "none",
            alignItems: "center",
            px: 2,
            py: 1,
            zIndex: 95,
          })}
        >
          <Box flex={1} marginRight={2}>
            <Typography
              variant="body1"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: expanded ? "inherit" : "ellipsis",
                WebkitLineClamp: expanded ? "none" : 1,
              }}
            >
              {getNotifyText(user.status)}
            </Typography>
          </Box>
          <Box display={"flex"} alignSelf={"flex-start"}>
            <IconButton size="small" onClick={handleToggleExpand}>
              <KeyboardArrowDown
                sx={{
                  transform: expanded ? "rotate(90deg)" : "none",
                  transition: "transform 0.5s ease",
                  color: "#fff",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ color: "#fff" }}
            >
              <Icon>cancel</Icon>
            </IconButton>
          </Box>
        </Box>
      </ThemeProvider>
      {children({open: !!message})}
      {/* <Box sx={{ paddingTop: message ? "48px" : "0" }}>{children}</Box> */}
    </>
  );
};

/**
 *
 * @param {Object} status
 * @param {string} status.name
 */
function getNotifyText(status) {
  switch (status.name) {
    case "no-request":
      return "Первым делом заполни информацию о себе в профиле, после чего переходи к подаче заявки.";
  }
}
