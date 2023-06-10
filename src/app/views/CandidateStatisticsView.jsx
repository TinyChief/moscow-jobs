import { Box, Grid, Paper } from "@mui/material";
import { DirectionsNicks } from "../utils/utils";
import { EducationStats } from "../components/Statistics/EducationStats";
import { ExperienceStats } from "../components/Statistics/ExperienceStats";
import { LivingStatus } from "../components/Statistics/LivingStats";
import { InternshipStats } from "../components/Statistics/InternshipStats";
import { GenderStats } from "../components/Statistics/GenderStats";
import { EmploymentStats } from "../components/Statistics/EmploymentStats";
import { InternshipDirectionsStats } from "../components/Statistics/InternshipDirectionStats";
import { AgeStats } from "../components/Statistics/AgeStats";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { apiService } from "../services/useApiService";
import Loading from "../components/Loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

const CandidateStatiscView = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    async function uploadStatistics() {
      try {
        const { data } = await apiService.getCandidatesStatistics();

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    }

    uploadStatistics();
  }, []);

  if (!stats) return <Loading />;

  return (
    <Box>
      <Grid container spacing={2} direction={"row"} alignItems={"stretch"}>
        <Grid item md={8} xs={12}>
          <Item>
            <InternshipStats
              {...{
                waiting: 200,
                declined: 32,
                total: stats.requests.total,
                recommended: stats.requests.recommended,
              }}
            />
          </Item>
        </Grid>
        <Grid item md={4} xs={12}>
          <Item>
            <GenderStats
              {...{ males: stats.gender.male, females: stats.gender.female }}
            />
          </Item>
        </Grid>
        <Grid item md={4} xs={12}>
          <Item>
            <AgeStats {...stats.age} />
          </Item>
        </Grid>
        <Grid item md={8} xs={12}>
          <Item>
            <InternshipDirectionsStats
              directions={stats.directions}
            />
          </Item>
        </Grid>
        <Grid item md={6} xs={12}>
          <Item>
            <EducationStats
              education={stats.education}
            />
          </Item>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container height={"100%"}>
            <Grid item mb={2} xs={12}>
              <Item>
                <LivingStatus {...stats.city} />
              </Item>
            </Grid>
            <Grid item mb={2} xs={12}>
              <Item>
                <EmploymentStats {...stats.schedule} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <ExperienceStats
                  {...stats.jobExperience}
                />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateStatiscView;
