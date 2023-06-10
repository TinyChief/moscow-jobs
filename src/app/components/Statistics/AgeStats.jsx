import { LocationCity, Star } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";

export const AgeStats = ({
  under18,
  between18And25,
  between25And35,
  over35,
  average,
}) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent={"space-between"}>
      <Box display="flex" flexDirection={"column"} alignItems="center" mb={2}>
        <Typography variant="h3">{average}</Typography>
        <Box ml={1}>
          <Typography variant="subtitle1">Средний возраст</Typography>
        </Box>
      </Box>
      <Divider sx={{ width: "100%", marginBottom: 2 }} />
      {under18 && (
        <Box display="flex" flexDirection={"column"} alignItems="center" mb={2}>
          <Typography variant="h3">{under18}</Typography>
          <Box ml={1}>
            <Typography variant="subtitle1">До 18 лет</Typography>
          </Box>
        </Box>
      )}
      <Box display="flex" flexDirection={"column"} alignItems="center" mb={2}>
        <Typography variant="h3">{between18And25}</Typography>
        <Box ml={1}>
          <Typography variant="subtitle1">От 18 до 25 лет</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection={"column"} alignItems="center" mb={2}>
        <Typography variant="h3">{between25And35}</Typography>
        <Box ml={1}>
          <Typography variant="subtitle1">От 25 лет до 35 лет</Typography>
        </Box>
      </Box>
      {over35 && (
        <Box display="flex" flexDirection={"column"} alignItems="center">
          <Typography variant="h3">{over35}</Typography>
          <Box ml={1}>
            <Typography variant="subtitle1">От 35 лет</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
