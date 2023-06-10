import {
  AssignmentOutlined,
  CancelOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const OrganizationRequestsStats = ({ total, accepted, declined }) => {
  return (
    <Box
      height={"100%"}
      display="flex"
      flexWrap={"wrap"}
      alignItems="center"
      justifyContent={"space-around"}
    >
      <Box
        display="flex"
        alignItems="center"
        mr={{ xs: 0, sm: 4 }}
        mb={{ xs: 2, sm: 0 }}
      >
        <AssignmentOutlined fontSize="large" color="primary" />
        <Box ml={{ xs: 1, sm: 3 }}>
          <Typography variant="h3">{total}</Typography>
          <Typography variant="subtitle1">Всего заявок</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
        <CheckCircleOutline fontSize="large" color="success" />
        <Box ml={{ xs: 1, sm: 3 }}>
          <Typography variant="h3">{accepted}</Typography>
          <Typography variant="subtitle1">Принятых</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
        <CancelOutlined fontSize="large" color="error" />
        <Box ml={{ xs: 1, sm: 3 }}>
          <Typography variant="h3">{declined}</Typography>
          <Typography variant="subtitle1">Отклоненных</Typography>
        </Box>
      </Box>
    </Box>
  );
};
