import { Grid, Stack } from "@mui/material";
import { UserCard } from "../components/UserCard";
import { HelpCard } from "../components/HelpCard";
import { ProgressCard } from "../components/ProgressCard";
import { UserInformationCard } from "../components/UserInformationCard";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import useError from "../hooks/useError";
import { useSnackbar } from "../contexts/snackbarContext";
import { roleNames } from "../utils/pack";

const ProfileView = () => {
  const { user, userInfo, getInfo, updateUserData, updateUserInfo } = useUser();
  const { showSnackbar } = useSnackbar();
  const { setError } = useError();
  const [progressActiveStep, setProgressActiveStep] = useState(0);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    switch (user.role) {
      case roleNames.CANDIDATE:
        setProgressActiveStep(0)
        break
      default:
        setProgressActiveStep(1)
    }

  }, [user]);

  const onUserInformationChange = async (type, values) => {
    try {
      switch (type) {
        case "user":
          await updateUserData(values);
          break;
        case "userInfo":
          await updateUserInfo(values);
          break;
        default:
          throw new Error("invalid type: " + type);
      }
      showSnackbar("Настройки успешно сохранены.");
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid md={4} xs={12} item>
          <Stack spacing={2}>
            <UserCard
              name={user.name}
              surname={user.surname}
              title={user.role}
              email={user.email}
            ></UserCard>
            <HelpCard />
          </Stack>
        </Grid>
        <Grid md={8} xs={12} item>
          <Stack spacing={2}>
            <ProgressCard activeStep={progressActiveStep} />
            <UserInformationCard
              user={{ ...(user || {}) }}
              userInfo={{ ...(userInfo || {}) }}
              onChange={onUserInformationChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileView;
