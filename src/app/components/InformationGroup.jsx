import { Box, Grid } from "@mui/material";
import { H3 } from "./Typography";

export const InformationGroup = ({ title, children }) => {
  return (
    <Grid item xs={12}>
      <H3 sx={{ textDecoration: "underline" }} mb={1}>
        {title}
      </H3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // "> div": { marginBottom: "15px" },
          // "div:last-child": { marginBottom: 0 },
          "> div": {
            marginBottom: "15px",
          },
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};
