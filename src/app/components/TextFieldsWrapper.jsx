import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const TextFieldsWrapper = styled(Stack)(() => ({
  "> div": {
    height: "60px",
    "margin-bottom": "5px",
    ":last-child": {
      "margin-bottom": 0,
    },
  },
}));
