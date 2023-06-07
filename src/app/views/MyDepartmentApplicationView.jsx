import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { apiService } from "../services/useApiService";
import { unpackDepartmentApplication, unpackOrganization } from "../utils/pack";
import useError from "../hooks/useError";
import CommonDepartmentApplication from "../components/CommonDepartmentApplication";
import { ApplicationStatuses } from "../utils/utils";
import ApplicationDeleteDialog from "../components/ApplicationDeleteDialog";

const MyDepartmentApplication = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [organization, setOrganization] = useState(null);
  const { setError } = useError();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false)

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

  const handleEditApplication = () => {
    navigate("/staff/department/application/edit", { state: { application } });
  };

  const handleDeleteApplication = async () => {
    try {
      const { data } = await apiService.deleteDepartmentApplication(
        application.id
      );
      navigate(-1);
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

    if (application && application.organizationId) {
      getOrg();
    }
  }, [application]);

  if (!(application && organization)) return <Loading />;

  return (
    <CommonDepartmentApplication {...{ application, organization }}>
      <>
        {application.status === ApplicationStatuses.WAITING && (
          <Box flex="1">
            <Button
              variant="contained"
              color="error"
              onClick={() => setDialog(true)}
            >
              Удалить
            </Button>
            <ApplicationDeleteDialog
              handleClose={() => setDialog(false)}
              open={dialog}
              handleConfirm={handleDeleteApplication}
              name={application.name}
            />
          </Box>
        )}

        <Box>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ marginRight: 2 }}
          >
            Назад
          </Button>
          {application.status === ApplicationStatuses.WAITING && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditApplication}
              >
                Редактировать
              </Button>
            </>
          )}
        </Box>
      </>
    </CommonDepartmentApplication>
  );
};

export default MyDepartmentApplication;
