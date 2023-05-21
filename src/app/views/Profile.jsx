import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { UserCard } from "../components/UserCard";
import { HelpCard } from "../components/HelpCard";
import { ProgressCard } from "../components/ProgressCard";
import { UserInformationCard } from "../components/UserInformationCard";

const ProfileView = () => {
  const { user } = useAuth();
  return (
    <>
      <Grid container spacing={2}>
        <Grid md={4} xs={12} item>
          <Stack spacing={2}>
            <UserCard
              name={user.name}
              title={"кандидат"}
              email={user.email}
            ></UserCard>
            <HelpCard />
          </Stack>
        </Grid>
        <Grid md={8} xs={12} item>
          <Stack spacing={2}>
            <ProgressCard />
            <UserInformationCard />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileView;
