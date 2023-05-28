import { Chip } from "@mui/material";
import { ApplicationStatuses, getApplicationStatusName } from "../utils/utils";

function ApplicationStatusChip({ status }) {
  return (
    <Chip
      variant="outlined"
      label={getApplicationStatusName(status)}
      color={
        status === ApplicationStatuses.ACCEPTED
          ? "success"
          : status === ApplicationStatuses.DECLINED
          ? "error"
          : "default"
      }
    ></Chip>
  );
}

export default ApplicationStatusChip;
