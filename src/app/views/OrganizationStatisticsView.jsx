import { Box, Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { apiService } from "../services/useApiService";
import Loading from "../components/Loading";
import { OrganizationRequestsStats } from "../components/Statistics/OrganizationRequestsStats";
import { OrganizationsStats } from "../components/Statistics/OrganizationsStats";
import { RequestsByOrganizationsStats } from "../components/Statistics/RequestsByOrganizations";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

const OrganizationStatisticsView = () => {
  const [stats, setStats] = useState(null);
  const [fullStats, setFullStats] = useState(null);
  useEffect(() => {
    async function uploadStatistics() {
      try {
        let data
        data = (await apiService.getOrganizationsStatistics()).data;

        setStats({
          total: data.total_requests_count,
          waiting: data.waiting_requests_count,
          accepted: data.accepted_requests_count,
          declined: data.declined_requests_count,
        });

        data = (await apiService.getOrganizationsFullStatistics()).data;

        setFullStats(
          data.map(
            ({
              id,
              name,
              total_requests_count,
              waiting_requests_count,
              accepted_requests_count,
              declined_requests_count,
            }) => ({
              id,
              name,
              total: total_requests_count,
              waiting: waiting_requests_count,
              accepted: accepted_requests_count,
              declined: declined_requests_count,
            })
          )
        );
      } catch (error) {
        console.log(error);
      }
    }

    uploadStatistics();
  }, []);

  if (!stats || !fullStats) return <Loading />;

  return (
    <Box>
      <Grid container spacing={2} direction={"row"} alignItems={"stretch"}>
        <Grid item md={3} xs={12}>
          <Item>
            <OrganizationsStats total={stats.total} />
          </Item>
        </Grid>
        <Grid item md={9} xs={12}>
          <Item>
            <OrganizationRequestsStats {...stats} />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <RequestsByOrganizationsStats
              requests={fullStats}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganizationStatisticsView;
