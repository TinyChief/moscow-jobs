import { Stack } from "@mui/material";
import JobListItem from "../components/JobListItem";
import { useLoaderData } from "react-router-dom";

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
