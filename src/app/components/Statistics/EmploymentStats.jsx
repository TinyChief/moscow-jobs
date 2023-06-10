import {
  LocationCity,
  ScheduleOutlined,
  SchemaOutlined,
  Star,
  WatchLater,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const EmploymentStats = ({ partTime, fullTime }) => {
  return (
    <Box
      height={"100%"}
      display="flex"
      justifyContent={"space-around"}
      flexDirection={{ xs: "column", sm: "row" }}
      flexWrap={"wrap"}
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        mb={{ xs: 2, sm: 0 }}
        mr={{ xs: 0, sm: 2 }}
      >
        <ScheduleOutlined fontSize="large" />
        <Box ml={1}>
          <Typography variant="h3">{partTime} %</Typography>
          <Typography variant="subtitle1">20 часов</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <WatchLater fontSize="large" color="info" />
        <Box ml={1}>
          <Typography variant="h3">{fullTime} %</Typography>
          <Typography variant="subtitle1">40 часов</Typography>
        </Box>
      </Box>
    </Box>
  );
};
