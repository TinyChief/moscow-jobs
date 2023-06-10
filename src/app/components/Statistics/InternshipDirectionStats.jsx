import { Box, Typography } from "@mui/material";
import { DirectionsNames } from "../../utils/utils";

export const InternshipDirectionsStats = ({ directions }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="stretch">
      {directions.map((direction, idx) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            borderBottom={idx === directions.length - 1 ? "none" : 1}
            key={direction.name}
          >
            <Typography variant="subtitle1">
              {DirectionsNames[direction.name]}
            </Typography>
            <Typography variant="h3">{direction.value}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};
