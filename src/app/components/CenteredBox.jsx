import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const CenteredBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}));
