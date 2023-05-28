import { Box, Button, Divider, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { apiService } from "../services/useApiService";
import { unpackDepartmentApplication, unpackOrganization } from "../utils/pack";
import useError from "../hooks/useError";
import { useSnackbar } from "../contexts/snackbarContext";
import CommonDepartmentApplication from "../components/CommonDepartmentApplication";

const InternJobApplicationView = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [jobOrganization, setJobOrganization] = useState(null);
  const [test, setTest] = useState("");
  const { setError } = useError();
  const { showSnackbar } = useSnackbar();

  const uploadJob = async (id) => {
    try {
      const { data } = await apiService.getDepartmentApplicationById(id);
      const application = unpackDepartmentApplication(data);
      setJob(application);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await apiService.applyToJob(jobId);
      showSnackbar(
        `Заявка на вакансию ${job.name} успешно подана. Ожидайте обратной связи.`,
        "success"
      );
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    uploadJob(jobId);
  }, []);

  useEffect(() => {
    async function getOrg() {
      const { data: organization } = await apiService.getOrganizationById(
        job.organizationId
      );
      setJobOrganization(unpackOrganization(organization));
    }

    if (job) {
      getOrg();
    }
  }, [job]);

  if (!(job && jobOrganization)) return <Loading />;

  return (
    <CommonDepartmentApplication
      application={job}
      organization={jobOrganization}
      hideApplicationStatus={true}
    >
      <Box flex={1} display={"flex"} flexDirection={"column"}>
        <Divider sx={{ marginBottom: 3 }} />
        <TestTextField value={test} setValue={setTest} />
        <Button
          disabled
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Подать заявку (В разработке)
        </Button>
      </Box>
    </CommonDepartmentApplication>
  );
};

function TestTextField({ value, setValue }) {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (value.trim().length === 0) {
      setError(true);
    } else {
      setError(false);
      // отправить данные формы
    }
  }

  function handleFocus() {
    setFocused(true);
    setError(false);
  }

  function handleBlur() {
    setFocused(false);
    if (value.trim().length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }

  function handleChange(event) {
    setValue(event.target.value);
    setError(false);
  }

  return (
    <TextField
      id="outlined-controlled"
      label="Выполнение теста"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      error={!focused && error}
      helperText={!focused && error ? "Поле обязательно для заполнения" : ""}
      multiline
      rows={10}
      sx={{ marginBottom: 3 }}
    />
  );
}

export default InternJobApplicationView;
