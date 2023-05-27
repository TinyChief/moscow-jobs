import { Box, styled, useTheme } from "@mui/material";
import { themeShadows } from "@/app/theme/themeColors";
import { convertHexToRGB } from "@/app/utils/utils";
import { sidenavCompactWidth, sideNavWidth } from "@/app/utils/constant";
import useSettings from "../hooks/useSettings";
import Brand from "../components/Brand";
import Scrollbar from "react-perfect-scrollbar";
import VerticalNav from "../components/VerticalNav/VerticalNav";
import { curatorNavigations, internNavigations } from "../navigations";
import useUser from "../hooks/useUser";
import React, { useEffect, useState } from "react";
import { ROLES } from "../utils/pack";
import { ColorModeContext } from "../theme/ProjectTheme";

const LayoutSidenav = ({ onNavigation }) => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const { settings } = useSettings();
  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode } = leftSidebar;
  const [actualNavigation, setActualNavigation] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    switch (user.role) {
      case ROLES.CANDIDATE:
        setActualNavigation(internNavigations);
        break;
      case ROLES.CURATOR:
        setActualNavigation(curatorNavigations);
        break;
      default:
      case ROLES.INTERN:
        setActualNavigation(internNavigations);
    }
  }, [user]);

  const getSidenavWidth = () => {
    switch (mode) {
      case "compact":
        return sidenavCompactWidth;

      default:
        return sideNavWidth;
    }
  };

  const primaryRGB = convertHexToRGB(theme.palette.background.default);

  return (
    <SidebarNavRoot width={getSidenavWidth()}>
      <SidebarBg bg={primaryRGB} isDarkMode={colorMode.currentMode === 'dark'} />
      <NavListBox>
        <Brand></Brand>
        <StyledScrollBar options={{ suppressScrollX: true }}>
          <VerticalNav items={actualNavigation} onNavigation={onNavigation} />
        </StyledScrollBar>
      </NavListBox>
    </SidebarNavRoot>
  );
};

const SidebarBg = styled(Box)(({ isDarkMode, theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",

  ...(isDarkMode
    ? {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: `url(/assets/images/patern.png)`,
        ":after": {
          background: "url(/assets/images/dot.png)",
          opacity: "0.6",
          content: "''",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }
    : {
        background: `linear-gradient(143deg, rgba(255,255,255,1) 0%, rgba(${convertHexToRGB(
          theme.palette.primary.main
        )}) 74%, rgba(${convertHexToRGB(theme.palette.secondary.main)}) 102%)`,
      }),
}));

const SidebarNavRoot = styled(Box)(({ theme, width, bg, image }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: width,
  boxShadow: themeShadows[8],

  zIndex: 111,
  overflow: "hidden",
  color: theme.palette.text.primary,
  transition: "all 250ms ease-in-out",
  "&:hover": {
    width: sideNavWidth,
    "& .sidenavHoverShow": { display: "block" },
    "& .compactNavItem": {
      width: "100%",
      maxWidth: "100%",
      "& .nav-bullet": { display: "block" },
      "& .nav-bullet-text": { display: "none" },
    },
  },
}));

const NavListBox = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  zIndex: 2,
});

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

export default LayoutSidenav;
