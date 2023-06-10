import {
  AssignmentOutlined,
  CancelOutlined,
  CheckCircleOutline,
  CorporateFare,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const OrganizationsStats = ({ total }) => {
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
        <CorporateFare fontSize="large"/>
        <Box ml={{ xs: 1, sm: 3 }}>
          <Typography variant="h3">{total}</Typography>
          <Typography variant="subtitle1">Всего организаций</Typography>
        </Box>
      </Box>
    </Box>
  );
};
