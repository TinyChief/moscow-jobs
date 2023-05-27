import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const TextFieldsWrapper = styled(Stack)(() => ({
  "> div": {
    height: "60px",
    "marginBottom": "5px",
    ":last-child": {
      "marginBottom": 0,
    },
  },
}));
