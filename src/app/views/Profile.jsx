import {
  Grid,
  Stack,
} from "@mui/material";
import { UserCard } from "../components/UserCard";
import { HelpCard } from "../components/HelpCard";
import { ProgressCard } from "../components/ProgressCard";
import { UserInformationCard } from "../components/UserInformationCard";
import { useEffect } from "react";
import useUser from "../hooks/useUser";
import useError from "../hooks/useError";

const ProfileView = () => {
  const { user, userInfo, getInfo, updateUserData, updateUserInfo } = useUser();
  const { setError } = useError();

  useEffect(() => {
    (async () => {
      getInfo();
    })();
  }, []);

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
              name={`${user.surname} ${user.name}`}
              title={user.role}
              email={user.email}
            ></UserCard>
            <HelpCard />
          </Stack>
        </Grid>
        <Grid md={8} xs={12} item>
          <Stack spacing={2}>
            <ProgressCard />
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
