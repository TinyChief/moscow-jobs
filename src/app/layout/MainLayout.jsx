import { Box, Container, styled, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { sidenavCompactWidth, sideNavWidth } from "@/app/utils/constant";
import LayoutFooter from "./LayoutFooter";
import LayoutSidenav from "./LayoutSidenav";
import Topbar from "./LayoutTopbar";
import useSettings from "../hooks/useSettings";
import { useEffect, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import NavigationScroll from "./NavigationScroll";

const Layout1Root = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default,
}));

const LayoutContainer = styled(Box)(({ width, open }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: width,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  marginRight: open ? 50 : 0,
}));

const SideNavOverlay = styled("div")(() => ({
  zIndex: 100,
  width: "100vw",
  height: "100%",
  position: "fixed",
  background: "rgba(0, 0, 0, 0.44)",
}));

const StyledScrollBar = styled(PerfectScrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  ".ps__rail-y": { opacity: 0.3 },
  ".ps__rail-y:hover > .ps__thumb-y, .ps__rail-y:focus > .ps__thumb-y, .ps__rail-y.ps--clicking .ps__thumb-y":
    {
      backgroundColor: "#999",
      width: "10px",
    },
  ".ps__rail-x:hover, .ps__rail-y:hover, .ps__rail-x:focus, .ps__rail-y:focus, .ps__rail-x.ps--clicking, .ps__rail-y.ps--clicking":
    {
      backgroundColor: "transparent !important",
    },
}));

const ContentBox = styled(Container)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const MainLayout = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutSettings } = settings;
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layoutSettings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case "full":
        return sideNavWidth;

      case "compact":
        return sidenavCompactWidth;

      case "mobile":
      default:
        return "0px";
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const ref = useRef({ isMdScreen, settings });

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layoutSettings.leftSidebar.mode;
    if (settings.layoutSettings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layoutSettings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  const layoutClasses = `theme-${theme.palette.type}`;

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layoutSettings: { leftSidebar: { ...sidebarSettings } } });
  };

  const closeSidebar = () => {
    if (isLgScreen) updateSidebarMode({ mode: "close" });
  };

  let perfectScrollBar = null

  return (
    <Layout1Root className={layoutClasses}>
      {showSidenav && sidenavMode !== "close" && (
        <LayoutSidenav onNavigation={closeSidebar} />
      )}

      {showSidenav && sidenavMode !== "close" && isLgScreen && (
        <SideNavOverlay onClick={closeSidebar} />
      )}
      <LayoutContainer width={sidenavWidth}>
        <Topbar fixed={true} className="elevation-z8" />

        <StyledScrollBar
          ref={(ref) => {
            perfectScrollBar = ref;
          }}
        >
          <ContentBox>
            <Box flexGrow={1} position="relative" mb={8}>
              <NavigationScroll onNavigation={() => perfectScrollBar.updateScroll()}>
                <Outlet />
              </NavigationScroll>
            </Box>
          </ContentBox>
        </StyledScrollBar>

        <LayoutFooter />
      </LayoutContainer>
    </Layout1Root>
  );
};

export default MainLayout;
