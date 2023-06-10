import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
  HelpOutline,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const RequestsByOrganizationsStats = ({ requests }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="stretch">
      {requests.map((req, idx) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={idx === requests.length - 1 ? "0" : 2}
            borderBottom={idx === requests.length - 1 ? "none" : 1}
            key={req.name}
          >
            <Typography
              variant="subtitle1"
              flexBasis={"300px"}
              textAlign={"left"}
            >
              {req.name}
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box mx={1}>
                <CheckCircleOutlineOutlined color="success" />
                <Typography variant="h3">{req.total}</Typography>
              </Box>
              <Box mx={1}>
                <CancelOutlined color="error" />
                <Typography variant="h3">{req.declined}</Typography>
              </Box>
              <Box mx={1}>
                <HelpOutline color="info" />
                <Typography variant="h3">{req.waiting}</Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
