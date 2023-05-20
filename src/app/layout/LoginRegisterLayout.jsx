import { useTheme } from "@emotion/react";
import { Card, Grid } from "@mui/material";
import { Box, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const JWTRegister = styled(JustifyBox)(() => ({
  // background: '#1A2038',
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

const NavigationItem = ({ title, to, ...props }) => {
  const theme = useTheme();
  return (
    <Grid
      item
      sm={6}
      xs={12}
      {...props}
      sx={{
        "& .active .navigation-btn": {
          backgroundColor: theme.palette.primary.main,
        },
        ":not(:last-child)": {
          borderRight: "1px solid",
          [theme.breakpoints.down("sm")]: {
            borderRight: "none",
          },
        },
      }}
    >
      <NavLink to={to}>
        <Box
          className="navigation-btn"
          width={"100%"}
          padding={2}
          textAlign={"center"}
        >
          {title}
        </Box>
      </NavLink>
    </Grid>
  );
};

const LoginRegisterLayout = ({ children }) => {
  return (
    <JWTRegister>
      <Card className="card" sx={{ flexDirection: "column" }}>
        <Grid container borderBottom={"1px solid"}>
          <NavigationItem to={"/session/signin"} title={"Авторизация"} />
          <NavigationItem to={"/session/signup"} title={"Регистрация"} />
        </Grid>
        {children}
      </Card>
    </JWTRegister>
  );
};

export default LoginRegisterLayout;
