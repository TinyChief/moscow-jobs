import {
  Icon,
  IconButton,
  Box,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { topBarHeight } from "@/app/utils/constant";
import useSettings from "../hooks/useSettings";
import AccountMenu from "../components/AccountMenu.jsx";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("header")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  transition: "all 0.3s ease",
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  // [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const LayoutTopbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layoutSettings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layoutSettings } = settings;
    let mode
    if (isMdScreen) {
      mode = layoutSettings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layoutSettings.leftSidebar.mode === 'close' ? 'full' : 'close';
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <IconBox>
            {isLgScreen && (
              <StyledIconButton onClick={handleSidebarToggle}>
                <Icon>menu</Icon>
              </StyledIconButton>
            )}

            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          <AccountMenu/>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default LayoutTopbar;
