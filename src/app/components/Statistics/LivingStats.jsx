import { LocationCity, Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const LivingStatus = ({ moscow, other }) => {
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
        <Star fontSize="large" sx={{ color: "red" }} />
        <Box ml={1}>
          <Typography variant="h3">{moscow} %</Typography>
          <Typography variant="subtitle1">г. Москва</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <LocationCity fontSize="large" color="text.secondary" />
        <Box ml={1}>
          <Typography variant="h3">{other} %</Typography>
          <Typography variant="subtitle1">Другие города</Typography>
        </Box>
      </Box>
    </Box>
  );
};
