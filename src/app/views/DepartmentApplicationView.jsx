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
import { blue, grey } from "@mui/material/colors";
import { useUser } from "../hooks/useUser";
import { useSnackbar } from "../contexts/snackbarContext";

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

const OrganizationInfoItem = ({ icon, value }) => {
  return (
    <ListItemButton
      disableRipple
      sx={{ py: 0, minHeight: 32, paddingLeft: "8px", width: "300px" }}
    >
      <ListItemIcon sx={{ color: grey[600] }}>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText
        primary={value}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: "medium",
          textOverflow: "ellipsis",
          noWrap: true
        }}
      />
    </ListItemButton>
  );
};

const DepartmentApplication = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [organization, setOrganization] = useState(/** @type {[]} */ null);
  const { setError } = useError();
  const { user } = useUser();
  const { showSnackbar } = useSnackbar();

  const uploadApplication = async (id) => {
    try {
      const { data } = await apiService.getDepartmentApplicationById(id);
      const application = unpackDepartmentApplication(data);
      setApplication(application);
      const { data: organization } = await apiService.getOrganizationById(
        application.organizationId
      );
      setOrganization(unpackOrganization(organization));
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

      console.log(data);
      showSnackbar(`Заявка ${application.name} от`);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    // uploadApplication(applicationId);
    setApplication(initialApplication);
    setOrganization(initialOrganization);
  }, []);

  if (!application) return <Loading />;

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        minHeight={"80vh"}
        sx={{
          "> *:not(:last-child)": {
            marginBottom: 3,
          },
        }}
      >
        <Box>
          <Grid container spacing={3}>
            <Grid item>
              <Avatar
                sx={{ width: "120px", height: "120px", bgcolor: blue[300] }}
              />
            </Grid>
            <Grid item>
              <Box display={"inline"} width={"300px"}>
                <OrganizationInfoItem
                  icon={"corporate_fare"}
                  value={organization.name}
                />
                <OrganizationInfoItem
                  icon={"description"}
                  value={organization.description}
                />
                <OrganizationInfoItem
                  icon={"location_on"}
                  value={organization.address}
                />
                <OrganizationInfoItem
                  icon={"mail"}
                  value={organization.email}
                />
                <OrganizationInfoItem
                  icon={"call"}
                  value={organization.phone}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <H2
          sx={{
            margin: "0 auto",
          }}
        >
          {application.name}
        </H2>

        <Paragraph
          sx={{
            flex: "1",
            width: "100%",
            whiteSpace: "pre-wrap",
          }}
        >
          {application.description}
        </Paragraph>
        <Box
          display={"flex"}
          width="100%"
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
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
        </Box>
      </Box>
    </>
  );
};

export default DepartmentApplication;
