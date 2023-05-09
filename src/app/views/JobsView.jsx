import { Container, Stack } from "@mui/material";
import JobListItem from "../components/JobListItem";
import styled from "@emotion/styled";
import ScrollBar from "react-perfect-scrollbar";
import { useLoaderData } from "react-router-dom";

const StyledScrollBar = styled(ScrollBar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

const JobsView = () => {
  /**
   * @type {Array<{id: number}>}
   */
  const jobs = useLoaderData();
  return (
    <>
      <h1>Jobs</h1>
      <Stack spacing={2}>
        {jobs.map((job, i) => (
          <JobListItem key={i} data={job} />
        ))}
      </Stack>
    </>
  );
};

export default JobsView;
