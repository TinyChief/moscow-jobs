import {
  Icon,
  IconButton,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  AppBar,
  Badge,
  Divider,
  Typography,
  Hidden,
} from "@mui/material";
import { StarOutline, WebAsset } from "@mui/icons-material";

import useSettings from "../hooks/useSettings";
import AccountMenu from "../components/AccountMenu.jsx";
import { useLocation, useMatch, useMatches } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTES } from "../utils/constant";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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

const TopBarItemsDivider = () => {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ margin: "0px 10px" }}
    ></Divider>
  );
};

const LayoutTopbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const { pathname } = location;
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    let newPageTitle = "";
    switch (pathname) {
      case ROUTES.PROFILE:
        newPageTitle = "Профиль и настройка";
        break;
      case ROUTES.APPLICATION:
        newPageTitle = "Заявка на стажировку";
        break;
      case ROUTES.CANDIDATES_APPLICATIONS:
        newPageTitle = "Заявки кандидатов";
        break;
      case ROUTES.DEPARTMENTS_APPLICATIONS:
        newPageTitle = "Заявки на стажеров";
        break;
      case ROUTES.CURATOR_MENTORS:
        newPageTitle = "Наставники";
        break;
      case ROUTES.CURATOR_STATISTICS:
        newPageTitle = "Статистика";
        break;
      case ROUTES.DEPARTMENT:
        newPageTitle = "Моя организация";
        break;
      case ROUTES.DEPARTMENT_APPLICATION_CREATE:
        newPageTitle = "Создание заявки";
        break;
      case ROUTES.DEPARTMENT_APPLICATION_EDIT:
        newPageTitle = "Редактирование заявки";
        break;
      case ROUTES.DEPARTMENT_APPLICATIONS:
        newPageTitle = "Заявки на стажеров";
        break;

      case ROUTES.DEPARTMENT_APPLICATIONS_RESPONSES:
        newPageTitle = "Отклики стажеров";
        break;
      case ROUTES.INTERN_JOBS:
        newPageTitle = "Список стажировок";
        break;

      case ROUTES.INTERN_JOBS_APPLICATIONS:
        newPageTitle = "Отклики";
        break;
      case ROUTES.INTERN_MENTOR:
        newPageTitle = "Наставник";
        break;
      case ROUTES.MENTOR_MY_INTERN:
        newPageTitle = "Мой стажер";
        break;
      case ROUTES.MENTOR_MY_INTERN_SCHEDULE:
        newPageTitle = "Расписание стажера";
        break;

      default:
        break;
    }

    if (!newPageTitle) {
      if (
        new RegExp(ROUTES.INTERNS_JOBS_ID.replace(":jobId", "\\d+")).test(
          pathname
        )
      ) {
        newPageTitle = "Стажировка";
      } else if (
        new RegExp(
          ROUTES.CURATOR_DEPARTMENTS_APPLICATIONS_ID.replace(
            ":applicationId",
            "\\d+"
          )
        ).test(pathname)
      ) {
        newPageTitle = "Заявка на стажера";
      } else if (
        new RegExp(
          ROUTES.DEPARTMENT_APPLICATIONS_ID.replace(":applicationId", "\\d+")
        ).test(pathname)
      ) {
        newPageTitle = "Заявка на стажера";
      }
    }

    setPageTitle(newPageTitle);
  }, [pathname]);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layoutSettings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layoutSettings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layoutSettings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layoutSettings.leftSidebar.mode === "close" ? "full" : "close";
    }
    updateSidebarMode({ mode });
  };

  return (
    <AppBar component={"header"} position="static" sx={{ zIndex: 96 }}>
      <TopbarContainer>
        <Box display="flex" alignItems={"center"}>
          {isLgScreen && (
            <StyledIconButton
              sx={{ marginRight: 3 }}
              onClick={handleSidebarToggle}
            >
              <Icon>menu</Icon>
            </StyledIconButton>
          )}

          <Hidden smDown>
            <Typography variant="h6">{pageTitle}</Typography>
          </Hidden>
        </Box>

        <Box display="flex" alignItems="center">
          <Hidden smDown>
            <StyledIconButton>
              <Badge color="secondary" badgeContent={0} showZero>
                <StarOutline />
              </Badge>
            </StyledIconButton>
            <TopBarItemsDivider />
            <StyledIconButton>
              <Badge color="secondary" badgeContent={0} showZero>
                <WebAsset />
              </Badge>
            </StyledIconButton>
            <TopBarItemsDivider />
          </Hidden>
          <AccountMenu />
        </Box>
      </TopbarContainer>
    </AppBar>
  );
};

export default LayoutTopbar;
