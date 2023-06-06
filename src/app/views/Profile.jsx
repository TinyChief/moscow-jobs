import { Grid, Stack } from "@mui/material";
import { UserCard } from "../components/UserCard";
import { HelpCard } from "../components/HelpCard";
import { ProgressCard } from "../components/ProgressCard";
import { UserInformationCard } from "../components/UserInformationCard";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import useError from "../hooks/useError";
import { useSnackbar } from "../contexts/snackbarContext";
import { isInternOrCandidate } from "../utils/utils";

const ProfileView = () => {
  const { user, userInfo, updateUserData, updateUserInfo } = useUser();
  const { showSnackbar } = useSnackbar();
  const { setError } = useError();
  const [progressActiveStep, setProgressActiveStep] = useState(0);

  useEffect(() => {
    if (
      user &&
      isInternOrCandidate(user.role) &&
      user.status &&
      user.status.name
    ) {
      let actualStep = 0
      switch (user.status.name) {
        case 'no-request':
          actualStep = 0
          break
        default:
          actualStep = 0
      }

      setProgressActiveStep(actualStep)
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
              title={user.roleName}
              email={user.email}
            ></UserCard>
            <HelpCard />
          </Stack>
        </Grid>
        <Grid md={8} xs={12} item>
          <Stack spacing={2}>
            {isInternOrCandidate(user.role) && (
              <ProgressCard activeStep={progressActiveStep} />
            )}
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
