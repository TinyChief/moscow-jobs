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
import {
  ApplicationStatuses,
  ApplicationTypes,
  getJobApplicationStatusName,
} from "../utils/utils";
import { apiService } from "../services/useApiService";
import useError from "../hooks/useError";
import LetterAvatar from "../components/LetterAvatar";
import { Paragraph } from "../components/Typography";
import {
  unpackJobApplication,
  unpackUser,
  unpackUserInfo,
} from "../utils/pack";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Loading from "../components/Loading";
import CandidateApplicationInfo from "../components/CandidateApplicationInfo";
import dayjs from "dayjs";

const yearsOld = (birthDate) => {
  return dayjs().diff(birthDate, "year");
};

const InternMyJobApplicationsView = () => {
  const [applications, setApplications] = useState([]);
  const { setError } = useError();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function uploadMyApplications() {
      try {
        const { data } = await apiService.getMyJobApplications();
        setApplications(data.map(unpackJobApplication));
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    uploadMyApplications();
  }, []);

  return (
    <>
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
        <Stack width={"100%"} spacing={2} justifyContent={"center"}>
          <Box sx={{ minHeight: "60vh", "> div": { mb: 2 } }}>
            {applications.map((application, i) => {
              return <ApplicationItemShort key={i} application={application} />;
            })}
          </Box>
        </Stack>
      </Box>
      {/* <ApplicationItemLong
        open={showMore}
        handleClose={() => setShowMore(false)}
        onAccept={() => handleDialogAccept()}
        onDecline={() => handleDialogDecline()}
        user={userData.user}
        userInfo={userData.userInfo}
      /> */}
    </>
  );
};

const ApplicationItemShort = ({ application }) => {
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
            <Grid
              item
              xs={12}
              md={6}
              marginBottom={{ xs: 1, md: 0 }}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box>
                <Chip
                  variant="outlined"
                  label={getJobApplicationStatusName(application.status)}
                  color={
                    application.status === ApplicationStatuses.ACCEPTED
                      ? "success"
                      : application.status === ApplicationStatuses.DECLINED
                      ? "error"
                      : "default"
                  }
                  sx={{marginBottom: 1}}
                ></Chip>
                <Box
                  sx={{
                    fontSize: 16,
                    span: {
                      fontSize: 18,
                      fontWeight: "bold",
                    },
                  }}
                >
                  <Box component={"span"}>{application.applicationName}</Box>
                  {"   в   "}
                  <Box component={"span"}>{application.organizationName}</Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container direction={{ md: "column", xs: "row-reverse" }}>
            <Grid item xs={6} md={12}>
              <Box display={"flex"} justifyContent={{ md: "end", xs: "start" }}>
                <Button
                  variant="contained"
                  size="small"
                  width="200px"
                  // onClick={() => onShowMore(id)}
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

export default InternMyJobApplicationsView;
