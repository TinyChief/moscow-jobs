import { Box, Button, Divider, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { apiService } from "../services/useApiService";
import {
  ROLES,
  unpackDepartmentApplication,
  unpackOrganization,
} from "../utils/pack";
import useError from "../hooks/useError";
import { useUser } from "../hooks/useUser";
import { useSnackbar } from "../contexts/snackbarContext";
import CommonDepartmentApplication from "../components/CommonDepartmentApplication";
import { CommonDataForm } from "../components/CommonDataForm";

const initialApplication = {
  id: 3,
  name: "Проверочный тест",
  description: `Override or extend the styles applied to the component.
See CSS API below for more details. 
Component	elementType.`,
  organization_id: 1,
  test: "", // Нужно подумать как будет устроен тест
  status: "ACCEPTED",
};

const initialOrganization = {
  id: 1,
  name: "Google plc",
  description: "asdasdqwd",
  address: "м. Курска",
  email: "write@us.ru",
  phone: "+7 (495) 343-34-34",
};

const InternJobApplicationView = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(initialApplication);
  const [jobOrganization, setJobOrganization] = useState(initialOrganization);
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

  // useEffect(() => {
  //   uploadJob(jobId);
  // }, []);

  // useEffect(() => {
  //   async function getOrg() {
  //     const { data: organization } = await apiService.getOrganizationById(
  //       job.organizationId
  //     );
  //     setJobOrganization(unpackOrganization(organization));
  //   }

  //   getOrg();
  // }, [job]);

  if (!(job && jobOrganization)) return <Loading />;

  return (
    <CommonDepartmentApplication
      application={job}
      organization={jobOrganization}
    >
      <Box flex={1} display={"flex"} flexDirection={"column"}>
        <Divider sx={{ marginBottom: 3 }} />
        <TestTextField value={test} setValue={setTest}/>
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
      error={(!focused && error)}
      helperText={!focused && error ? "Поле обязательно для заполнения" : ""}
      multiline
      rows={10}
      sx={{ marginBottom: 3 }}
    />
  );
}

export default InternJobApplicationView;
