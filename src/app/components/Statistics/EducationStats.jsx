import { Box, Typography } from "@mui/material";

export const EducationStats = ({ education }) => {
  return (
    <Box
      height={"100%"}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="space-around"
    >
      {education.map((edu, idx) => {
        return (
          <Box
            key={idx}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mr={2}
            mb={2}
          >
            <Typography variant="h3">{edu.value}</Typography>
            <Typography variant="subtitle1">{edu.name}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};
