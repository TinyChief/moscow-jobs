import { Box } from "@mui/material";
import { useApplication } from "../contexts/ApplicationContext";
import ApplicationStatus from "./ApplicationStatus";
import MakeApplication from "./MakeApplication";

export default function ApplicationView() {
  const { send } = useApplication();

  // return <ApplicationStatus />
  return (
    <Box
      sx={{
        margin: "0 auto",
        maxWidth: 800,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {send ? <ApplicationStatus /> : <MakeApplication />}
    </Box>
  );
}
