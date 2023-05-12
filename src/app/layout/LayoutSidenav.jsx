import { Box, Hidden, Switch, styled, useTheme } from "@mui/material";
import { themeShadows } from "@/app/theme/themeColors";
import { convertHexToRGB } from "@/app/utils/utils";
import { sidenavCompactWidth, sideNavWidth } from "@/app/utils/constant";
import Sidenav from "./Sidenav";
import useSettings from "../hooks/useSettings";
import Brand from "../components/Brand";
import Scrollbar from "react-perfect-scrollbar";
import VerticalNav from "../components/VerticalNav/VerticalNav";
import { navigations } from "@/app/navigations";

const LayoutSidenav = ({ onNavigation }) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

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
    <SidebarNavRoot image={bgImgURL} bg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Brand></Brand>
        <Sidenav />
        <StyledScrollBar options={{ suppressScrollX: true }}>
          <VerticalNav items={navigations} onNavigation={onNavigation} />
        </StyledScrollBar>
      </NavListBox>
    </SidebarNavRoot>
  );
};

const SidebarNavRoot = styled(Box)(({ theme, width, bg, image }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "cover",
  zIndex: 111,
  overflow: "hidden",
  color: theme.palette.text.primary,
  transition: "all 250ms ease-in-out",
  backgroundImage: `linear-gradient(to bottom, rgba(${bg}, 0.96), rgba(${bg}, 0.96)), url(${image})`,
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
});

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

export default LayoutSidenav;
