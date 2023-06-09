import * as React from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Stack,
  ButtonBase,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import {
  AccountCircleOutlined,
  Brightness4,
  Brightness7,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { ColorModeContext } from "../theme/ProjectTheme";
import { Small, Span } from "./Typography";
import useAuth from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import LetterAvatar from "./LetterAvatar";
import LogoutDialog from "./LogoutDialog";

export default function AccountMenu() {
  const colorMode = React.useContext(ColorModeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();
  const { user } = useUser();
  const [dialog, setDialog] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    logout();
  };

  // React.useEffect(() => {
  //   setDialog(false);
  // }, [open]);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <ButtonBase
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {/* <IconButton size="small" sx={{ ml: 2 }}> */}
          {/* <Avatar >
            {getUserInitials(user.name, user.surname)}
          </Avatar> */}
          <LetterAvatar
            sx={{ width: 32, height: 32, marginRight: "10px" }}
            name={user.name}
            surname={user.surname}
          />
          {/* </IconButton> */}
          <Stack textAlign={"left"} marginRight={"10px"}>
            <Span fontWeight={"bold"} ellipsis="true" maxWidth={"100px"}>
              {user.name}
            </Span>
            <Small color="text.secondary">{user.roleName}</Small>
          </Stack>
          <KeyboardArrowDown
            sx={{
              transform: open ? "rotate(90deg)" : "none",
              transition: "transform 0.5s ease",
            }}
          />
        </ButtonBase>
        <LogoutDialog
          handleClose={() => setDialog(false)}
          open={dialog}
          handleConfirm={handleLogout}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <AccountCircleOutlined fontSize="small" />
          </ListItemIcon>
           Профиль
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => colorMode.toggleColorMode()}>
          <ListItemIcon>
            {colorMode.currentMode === "dark" ? (
              <Brightness7 />
            ) : (
              <Brightness4 />
            )}
          </ListItemIcon>
          {colorMode.currentMode === "dark" ? "Светлая тема" : "Тёмная тема"}
        </MenuItem>
        <MenuItem onClick={() => setDialog(true)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
