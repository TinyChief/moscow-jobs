import { AssignmentOutlined, CancelOutlined, CheckCircleOutline, CheckCircleOutlineOutlined, HelpOutline, LocationCity, Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const InternshipStats = ({ total, waiting, declined }) => {
  // const recommendedPercent = ((recommended / total) * 100).toFixed(2);
  // // const notRecommendedPercent = ((notRecommended / total) * 100).toFixed(2);

  return (
    <Box
      height={"100%"}
      display="flex"
      // flexDirection={{ xs: "column", sm: "row" }}
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
        <CancelOutlined fontSize="large" color="error" />
        <Box ml={{ xs: 1, sm: 3 }}>
          <Typography variant="h3">{declined}</Typography>
          <Typography variant="subtitle1">Отклоненных</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
        <HelpOutline fontSize="large" color="info" />
        <Box ml={{ xs: 1, sm: 3 }}>
          <Typography variant="h3">{waiting}</Typography>
          <Typography variant="subtitle1">Ждут рассмотрения</Typography>
        </Box>
      </Box>
    </Box>
  );
};
