import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ApplicationTypes, DirectionsNames } from "../utils/utils";
import { apiService } from "../services/useApiService";
import useError from "../hooks/useError";
import LetterAvatar from "../components/LetterAvatar";
import { Paragraph } from "../components/Typography";
import { unpackUser, unpackUserInfo } from "../utils/pack";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Loading from "../components/Loading";
import CandidateApplicationInfo from "../components/CandidateApplicationInfo";
import dayjs from "dayjs";

const APPLICATIONS_PER_PAGE = 10;

const yearsOld = (birthDate) => {
  return dayjs().diff(birthDate, "year");
};

const ApplicationItemShort = ({
  departments,
  user: { id, name, surname, secondname, email, phone },
  userInfo: { gender, birthday, citizen, educationLevel, city },
  onVerdict,
  onShowMore,
}) => {
  return (
    <Box
      component={Paper}
      sx={{
        width: "100%",
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item xs={12} md={6} marginBottom={{ xs: 1, md: 0 }}>
              <Box display={"flex"} alignItems={"center"} marginBottom={2}>
                <LetterAvatar
                  name={name}
                  surname={surname}
                  sx={{ marginRight: 2 }}
                />
                <Paragraph sx={{ fontSize: "16px" }}>
                  {surname} {name} {secondname}
                </Paragraph>
              </Box>
              <Box flexBasis={"100%"}>
                {(departments || "").split(",").map((dep) => {
                  return (
                    <Chip
                      variant="outlined"
                      size="small"
                      label={DirectionsNames[dep] || "..."}
                      key={dep}
                      sx={{
                        ":not(:last-child)": {
                          marginRight: 1,
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              display="flex"
              flexDirection={"column"}
            >
              <ApplicationContactInfo
                icon={gender === "MALE" ? "man" : "woman"}
                value={birthday ? yearsOld(birthday) + " лет" : ""}
              />
              <ApplicationContactInfo icon={"home"} value={city} />
              <ApplicationContactInfo icon={"school"} value={educationLevel} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              display="flex"
              flexDirection={"column"}
            >
              <ApplicationContactInfo icon="public" value={citizen} />
              <ApplicationContactInfo icon="alternate_email" value={email} />
              <ApplicationContactInfo icon="call" value={phone} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container direction={{ md: "column", xs: "row-reverse" }}>
            <Grid item xs={6} md={12} marginBottom={{ md: 1, xs: 0 }}>
              <Box display={"flex"} justifyContent={"end"}>
                <IconButton
                  aria-label="Отклонить"
                  color="error"
                  onClick={() => onVerdict("decline", id)}
                >
                  <Cancel />
                </IconButton>
                <IconButton
                  aria-label="Принять"
                  color="success"
                  onClick={() => onVerdict("accept", id)}
                >
                  <CheckCircle />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={6} md={12}>
              <Box display={"flex"} justifyContent={{ md: "end", xs: "start" }}>
                <Button
                  variant="contained"
                  size="small"
                  width="200px"
                  onClick={() => onShowMore(id)}
                >
                  Подробнее
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const ApplicationContactInfo = ({ icon, value }) => {
  return (
    <ListItemButton
      disableRipple
      sx={{ py: 0, minHeight: 32, paddingLeft: "8px" }}
    >
      <ListItemIcon sx={{ color: grey[600] }}>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText
        primary={value}
        primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
      />
    </ListItemButton>
  );
};

const ApplicationItemLong = ({
  open,
  handleClose,
  user,
  userInfo,
  onAccept,
  onDecline,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          width: "600px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {user ? (
          <>
            <DialogTitle id="alert-dialog-title">Анкета кандидата</DialogTitle>
            <DialogContent sx={{ flex: "1" }}>
              <CandidateApplicationInfo
                user={user || {}}
                userInfo={userInfo || {}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onDecline} variant="contained" color="error">
                Отклонить
              </Button>
              <Button
                onClick={onAccept}
                variant="contained"
                color="success"
                autoFocus
              >
                Принять
              </Button>
            </DialogActions>
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </Dialog>
  );
};

const ApplicationsView = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeType, setActiveType] = useState(ApplicationTypes.RECOMMENDED);
  const [applications, setApplications] = useState([]);
  const { setError } = useError();
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [userData, setUserData] = useState({});
  const [hasMore, setHasMore] = useState(true);

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  const handleSetActiveType = (newActiveType) => {
    setActiveType(newActiveType);
    setPage(1);
  };

  const handleShowMore = async (id) => {
    try {
      setShowMore(true);
      const { data: user } = await apiService.getUserById(id);
      const { data: userInfo } = await apiService.getUserInfoById(id);
      setUserData({
        user: unpackUser(user),
        userInfo: unpackUserInfo(userInfo),
      });
    } catch (error) {
      setError(error);
      setShowMore(false);
    }
  };

  async function handleAcceptOnDeclineApplication(acceptOrDecline, id) {
    try {
      let data;
      if (acceptOrDecline === "accept") {
        data = (await apiService.acceptApplication(id)).data;
      } else {
        data = (await apiService.declineApplication(id)).data;
      }
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application.user.id !== id)
      );
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  async function handleDialogAccept() {
    setShowMore(false);
    handleAcceptOnDeclineApplication("accept", userData.user.id);
    setUserData({});
  }

  async function handleDialogDecline() {
    setShowMore(false);
    handleAcceptOnDeclineApplication("decline", userData.user.id);
    setUserData({});
  }

  useEffect(() => {
    async function uploadApplications(type, page) {
      try {
        const { data } = await apiService.getCandidateApplications(
          type,
          page - 1,
          APPLICATIONS_PER_PAGE
        );
        if (data.length < APPLICATIONS_PER_PAGE) setHasMore(false);
        setApplications((prevApplications) => [...prevApplications, ...data]);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    uploadApplications(activeType, page);
  }, [page]);

  return (
    <>
      <Box component={"h1"} textAlign={"center"}>
        Заявки от кандидатов
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          fullWidth
          sx={{ marginBottom: 4 }}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
        >
          <Button
            color="success"
            onClick={() => handleSetActiveType(ApplicationTypes.RECOMMENDED)}
            sx={{
              fontWeight: activeType === ApplicationTypes.RECOMMENDED && "bold",
            }}
          >
            Рекомендованные
          </Button>
          <Button
            color="error"
            onClick={() =>
              handleSetActiveType(ApplicationTypes.NOT_RECOMMENDED)
            }
            sx={{
              fontWeight:
                activeType === ApplicationTypes.NOT_RECOMMENDED && "bold",
            }}
          >
            Нерекомендованные
          </Button>
          <Button
            color="info"
            onClick={() => handleSetActiveType(ApplicationTypes.ALL)}
            sx={{
              fontWeight: activeType === ApplicationTypes.ALL && "bold",
            }}
          >
            Все
          </Button>
        </ButtonGroup>
        <Stack width={"100%"} spacing={2} justifyContent={"center"}>
          <Box sx={{ minHeight: "60vh", "> div": { mb: 2 } }}>
            {applications.map((application, i) => {
              return (
                <ApplicationItemShort
                  key={i}
                  user={unpackUser(application.user)}
                  userInfo={unpackUserInfo(application.info || {})}
                  departments={application.departments}
                  status={application.status}
                  onVerdict={handleAcceptOnDeclineApplication}
                  onShowMore={handleShowMore}
                />
              );
            })}
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              disabled={!hasMore}
              variant="outlined"
              onClick={handleLoadMore}
            >
              Загрузить ещё...
            </Button>
          </Box>
        </Stack>
      </Box>
      <ApplicationItemLong
        open={showMore}
        handleClose={() => setShowMore(false)}
        onAccept={() => handleDialogAccept()}
        onDecline={() => handleDialogDecline()}
        user={userData.user}
        userInfo={userData.userInfo}
      />
    </>
  );
};

export default ApplicationsView;
