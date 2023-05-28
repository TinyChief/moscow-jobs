import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { apiService } from "../services/useApiService";
import { unpackDepartmentApplication, unpackOrganization } from "../utils/pack";
import useError from "../hooks/useError";
import { useSnackbar } from "../contexts/snackbarContext";
import CommonDepartmentApplication from "../components/CommonDepartmentApplication";
import { ApplicationStatuses } from "../utils/utils";

const MyDepartmentApplication = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [organization, setOrganization] = useState(null);
  const { setError } = useError();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
    navigate("/department/application/create", { state: { application } });
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
        <Button
          variant="contained"
          color="inherit"
          onClick={() => console.log("back")}
          sx={{ marginRight: 2 }}
        >
          Назад
        </Button>
        {application.status === ApplicationStatuses.WAITING && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditApplication}
          >
            Редактировать
          </Button>
        )}
      </>
    </CommonDepartmentApplication>
  );
};

export default MyDepartmentApplication;
