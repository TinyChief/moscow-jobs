import {
  Avatar,
  Box,
  Button,
  Grid,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { H2, H3, Paragraph } from "../components/Typography";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { apiService } from "../services/useApiService";
import {
  ROLES,
  unpackDepartmentApplication,
  unpackOrganization,
} from "../utils/pack";
import useError from "../hooks/useError";
import { blue, grey } from "@mui/material/colors";
import { useUser } from "../hooks/useUser";
import { useSnackbar } from "../contexts/snackbarContext";
import CommonDepartmentApplication from "../components/CommonDepartmentApplication";

const initialApplication = {
  id: 3,
  name: "Проверочный тест",
  description: `Override or extend the styles applied to the component.
See CSS API below for more details. 
Component	elementType.`,
  organization_id: 1,
  test: {}, // Нужно подумать как будет устроен тест
  status: "WAITING",
};

const initialOrganization = {
  id: 1,
  name: "Google plc",
  description: "asdasdqwd",
  address: "м. Курска",
  email: "write@us.ru",
  phone: "+7 (495) 343-34-34",
};

const DepartmentApplication = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [organization, setOrganization] = useState(null);
  const { setError } = useError();
  const { user } = useUser();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const uploadApplication = async (id) => {
    try {
      const { data } = await apiService.getDepartmentApplicationById(id);
      const application = unpackDepartmentApplication(data);
      setApplication(application);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleVerdict = async (verdict) => {
    try {
      let data;
      if (verdict === "accept") {
        data = await apiService.acceptDepartmentApplication(applicationId);
      } else {
        data = await apiService.declineDepartmentApplication(applicationId);
      }

      showSnackbar(`Заявка "${application.name}" от ${organization.name} ${verdict === 'accept' ? 'одобрена' : 'отклонена'}`);
      navigate('/departments/applications')
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    uploadApplication(applicationId);
  }, []);

  useEffect(() => {
    async function getOrg() {
      const { data: organization } = await apiService.getOrganizationById(
        application.organizationId
      );
      setOrganization(unpackOrganization(organization));
    }

    getOrg();
  }, [application]);

  if (!(application && organization)) return <Loading />;

  return (
    <CommonDepartmentApplication {...{ application, organization }}>
      {user.role === ROLES.INTERN ? (
        <Button variant="contained" color="info">
          Подать заявку
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            color="error"
            sx={{ marginRight: 2 }}
            onClick={() => handleVerdict("decline")}
          >
            Отклонить
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleVerdict("accept")}
          >
            Принять
          </Button>
        </>
      )}
    </CommonDepartmentApplication>
  );
};

export default DepartmentApplication;
