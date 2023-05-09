import { Box, Stack, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";

const FullJobView = () => {
  const job = useLoaderData();
  return (
    <>
      <Box mt={4} display={"flex"} justifyContent={"center"}>
        <Box
          margin={"0 auto"}
          flexGrow={0}
          component={"img"}
          src={job.preview}
        ></Box>
      </Box>

      <h1>{job.title}</h1>
      <Typography color="text.secondary">{`${job.description}`}</Typography>
    </>
  );
};

export default FullJobView;
