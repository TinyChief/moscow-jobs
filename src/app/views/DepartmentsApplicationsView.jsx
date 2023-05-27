import { Box, Button, Grid, Pagination, Paper } from "@mui/material";
import { H3, Paragraph } from "../components/Typography";
import { useEffect, useState } from "react";
import { apiService } from "../services/useApiService";
import useError from "../hooks/useError";
import { useNavigate } from "react-router-dom";

const DepartmentApplicationItem = ({ name, description, id }) => {
  const navigate = useNavigate();
  const handleViewApplication = () => {
    navigate("/departments/applications/" + id);
  };
  return (
    <Box
      component={Paper}
      sx={{
        padding: 3,
      }}
    >
      <Box mb={2}>
        <H3>{name}</H3>
      </Box>
      <Box mb={2} height={"150px"}>
        <Paragraph
          sx={{
            "whiteSpace": "pre-wrap",
            display: "-webkit-box",
            "WebkitLineClamp": "7" /* Максимальное количество строк */,
            "WebkitBoxOrient": "vertical",
            overflow: "hidden",
            "textOverflow": "ellipsis",
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

const initialApplications = [
  {
    id: 1,
    name: "Проверочный тест",
    description: `Override or extend the styles applied to the component.
See CSS API below for more details. 
Component	elementType.`,
    organization_id: 1,
    test: {}, // Нужно подумать как будет устроен тест
    status: "WAITING",
  },
  {
    id: 2,
    name: "Проверочный тест",
    description: `Override or extend the styles applied to the component.
See CSS API below for more details. 
Component	elementType.`,
    organization_id: 1,
    test: {}, // Нужно подумать как будет устроен тест
    status: "WAITING",
  },
  {
    id: 3,
    name: "Проверочный тест",
    description: `Override or extend the styles applied to the component.
See CSS API below for more details. 
Component	elementType.`,
    organization_id: 1,
    test: {}, // Нужно подумать как будет устроен тест
    status: "WAITING",
  },
  {
    id: 4,
    name: "Проверочный тест",
    description: `Override or extend the styles applied to the component.
See CSS API below for more details. 
Component	elementType.`,
    organization_id: 1,
    test: {}, // Нужно подумать как будет устроен тест
    status: "WAITING",
  },
];

function DepartmentsApplicationsView() {
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const { setError } = useError();

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const uploadApplications = async (page) => {
    try {
      const { data } = await apiService.getDepartmentsApplications(page - 1);
      // setApplications(data);
      setApplications(initialApplications);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    // setApplications(initialApplications.map(unpackDepartmentApplication));
    uploadApplications(page);
  }, [page]);

  return (
    <>
      <Box component={"h1"} textAlign={"center"}>
        Заявки на стажёров
      </Box>
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
      <Box display={"flex"} justifyContent={"center"}>
        <Pagination count={10} page={page} onChange={handlePagination} />
      </Box>
    </>
  );
}

export default DepartmentsApplicationsView;
