import {
  AssignmentOutlined,
  CheckCircleOutline,
  CheckCircleOutlineOutlined,
  LocationCity,
  People,
  Star,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const PeopleStats = ({ total }) => {
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
        <People fontSize="large" color="primary" />
        <Box ml={{ xs: 1, sm: 3 }}>
          <Typography variant="h3">{total}</Typography>
          <Typography variant="subtitle1">Всего людей</Typography>
        </Box>
      </Box>
    </Box>
  );
};
