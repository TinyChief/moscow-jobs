import { H2, H4 } from "../components/Typography";
import { grey } from "@mui/material/colors";
import { CenteredBox } from "../components/CenteredBox";

function WorkInProgressView({ pageName }) {
  return (
    <CenteredBox>
      <H2>{pageName}</H2>
      <H4 color={grey[600]}>Страница находится в разработке...</H4>
    </CenteredBox>
  );
}

export default WorkInProgressView;
