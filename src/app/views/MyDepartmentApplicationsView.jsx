import { Box, Button, Chip, Grid, Paper } from "@mui/material";
import { H3, Paragraph } from "../components/Typography";
import { useEffect, useState } from "react";
import { apiService } from "../services/useApiService";
import useError from "../hooks/useError";
import { useNavigate } from "react-router-dom";
import { unpackDepartmentApplication } from "../utils/pack";
import { ApplicationStatuses, getApplicationStatusName } from "../utils/utils";
import ApplicationStatusChip from "../components/ApplicationStatusChip";

function MyDepartmentApplicationsView() {
  const [applications, setApplications] = useState([]);
  const { setError } = useError();
  useEffect(() => {
    async function uploadApplications() {
      try {
        const { data } = await apiService.getMyDepartmentApplications();
        setApplications(data.map(unpackDepartmentApplication));
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    uploadApplications();
  }, []);

  return (
    <>
      <Box mb={3}>
        <Grid container spacing={2} sx={{ minHeight: "60vh" }}>
          {applications.map((data) => {
            return (
              <Grid item xs={12} md={6} key={data.id}>
                <DepartmentApplicationItem {...data} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

const DepartmentApplicationItem = ({ name, description, id, status }) => {
  const navigate = useNavigate();
  const handleViewApplication = () => {
    navigate("/department/applications/" + id);
  };
  return (
    <Box
      component={Paper}
      sx={{
        padding: 3,
      }}
    >
      <Box mb={2} display={"flex"} justifyContent={"space-between"}>
        <H3>{name}</H3>
        <ApplicationStatusChip status={status} />
      </Box>
      <Box mb={2} height={"150px"}>
        <Paragraph
          sx={{
            whiteSpace: "pre-wrap",
            display: "-webkit-box",
            WebkitLineClamp: "7" /* Максимальное количество строк */,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${description}`}
        </Paragraph>
      </Box>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <Button variant="contained" onClick={handleViewApplication}>
          Подробнее
        </Button>
      </Box>
    </Box>
  );
};

export default MyDepartmentApplicationsView;
