import { Man, Woman } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const GenderStats = ({ males, females }) => {
  const total = males + females;
  const malesPercent = ((males / total) * 100).toFixed(1);
  const femalesPercent = ((females / total) * 100).toFixed(1);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" alignItems="center" mb={2}>
        <Man fontSize="large" color="primary" />
        <Box ml={1}>
          <Typography variant="h3">{malesPercent}%</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Woman fontSize="large" color="secondary" />
        <Box ml={1}>
          <Typography variant="h3">{femalesPercent}%</Typography>
        </Box>
      </Box>
    </Box>
  );
};
