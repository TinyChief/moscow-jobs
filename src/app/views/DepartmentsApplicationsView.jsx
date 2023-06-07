import { Box, Button, Grid, Paper } from "@mui/material";
import { H2, H3, Paragraph } from "../components/Typography";
import { useEffect, useState } from "react";
import { apiService } from "../services/useApiService";
import useError from "../hooks/useError";
import { useNavigate } from "react-router-dom";
import { ROLES, unpackDepartmentApplication } from "../utils/pack";
import { useUser } from "../hooks/useUser";

const APPLICATIONS_PER_PAGE = 10;

function DepartmentsApplicationsView() {
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { setError } = useError();
  const { user } = useUser();

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    async function uploadApplications(page) {
      try {
        const { data } = await apiService.getDepartmentsApplications(
          page - 1,
          APPLICATIONS_PER_PAGE
        );
        if (data.length < APPLICATIONS_PER_PAGE) setHasMore(false);
        setApplications((prevApplications) => [
          ...prevApplications,
          ...data.map(unpackDepartmentApplication),
        ]);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    uploadApplications(page);
  }, [page]);

  return (
    <>
      <Box mb={3}>
        {applications.length === 0 ? (
          <H2 textAlign={"center"}>
            Пока нет доступных для рассмотрения заявок на стажёров.
          </H2>
        ) : (
          <Grid container spacing={2} sx={{ minHeight: "60vh" }}>
            {applications.map((data) => {
              return (
                <Grid item xs={12} md={6} key={data.id}>
                  <DepartmentApplicationItem {...data} user={user} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
      {hasMore && (
        <Box display={"flex"} justifyContent={"center"}>
          <Button variant="outlined" onClick={handleLoadMore}>
            Загрузить ещё...
          </Button>
        </Box>
      )}
    </>
  );
}

const DepartmentApplicationItem = ({ name, description, id, user }) => {
  const navigate = useNavigate();
  const handleViewApplication = () => {
    if (user.role === ROLES.INTERN) {
      navigate("/intern/jobs/" + id);
    } else {
      navigate("/curator/departments/applications/" + id);
    }
  };
  return (
    <Box
      component={Paper}
      sx={{
        padding: 3,
      }}
    >
      <Box display={"flex"} flexWrap={"wrap"}>
        <Box flexBasis={"130px"} textAlign={"center"}>
          <Box
            sx={{
              width: "100px",
              height: "100px",
              marginX: "auto",
            }}
            component={"img"}
            src={getDepartmentPhotoUrl(id)}
          />
        </Box>
        <Box flex={1} flexBasis={"300px"}>
          <Box mb={2}>
            <H3>{name}</H3>
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
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <Button variant="contained" onClick={handleViewApplication}>
          Подробнее
        </Button>
      </Box>
    </Box>
  );
};

function getDepartmentPhotoUrl(id) {
  return "/assets/images/organizations/sport.svg";
}

export default DepartmentsApplicationsView;
