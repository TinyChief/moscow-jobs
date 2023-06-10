import { Favorite, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const ExperienceStats = ({ workExperience, volunteerExperience }) => {
  return (
    <Box
      display="flex"
      height={"100%"}
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent={"space-around"}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={{ xs: 2, sm: 0 }}
        mr={{ xs: 0, sm: 2 }}
      >
        <Work fontSize="large" color="primary" />
        <Box ml={1}>
          <Typography variant="h3">{workExperience}%</Typography>
          <Typography variant="subtitle1">Опыт работы</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Favorite fontSize="large" />
        <Box ml={1}>
          <Typography variant="h3">{volunteerExperience}%</Typography>
          <Typography variant="subtitle1">Опыт волонтёрства</Typography>
        </Box>
      </Box>
    </Box>
  );
};
