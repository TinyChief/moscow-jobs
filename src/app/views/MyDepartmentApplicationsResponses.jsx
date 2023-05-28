import {
  Box,
  Button,
  ButtonGroup,
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
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "../utils/utils";
import { apiService } from "../services/useApiService";
import useError from "../hooks/useError";
import LetterAvatar from "../components/LetterAvatar";
import { Paragraph, Small } from "../components/Typography";
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
            <Grid
              item
              xs={12}
              md={6}
              marginBottom={{ xs: 1, md: 0 }}
              display={"flex"}
              alignItems={"center"}
            >
              <LetterAvatar
                name={name}
                surname={surname}
                sx={{ marginRight: 2 }}
              />
              <Paragraph>
                {surname} {name} {secondname}
              </Paragraph>
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

const MyDepartmentApplicationsResponses = () => {

  return (
    <>
      <Box component={"h2"} textAlign={"center"}>
        Отклики от стажёров на наши заявки
      </Box>
      <Box component={"h4"} textAlign={"center"}>
        Модуль находится в разработке...
      </Box>
    </>
  );
};

export default MyDepartmentApplicationsResponses;
