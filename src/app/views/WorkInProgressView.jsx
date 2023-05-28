import { Box } from "@mui/material";
import { H2, H4 } from "../components/Typography";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

const CenteredBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

function WorkInProgressView({ pageName }) {
  return (
    <CenteredBox>
      <H2>{pageName}</H2>
      <H4 color={grey[600]}>Страница находится в разработке...</H4>
    </CenteredBox>
  );
}

export default WorkInProgressView;
