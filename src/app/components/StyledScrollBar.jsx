import { styled } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

export const StyledScrollBar = styled(PerfectScrollbar)(() => ({
//   paddingLeft: "1rem",
//   paddingRight: "1rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  ".ps__rail-y": { opacity: 0.3 },
  ".ps__rail-y:hover > .ps__thumb-y, .ps__rail-y:focus > .ps__thumb-y, .ps__rail-y.ps--clicking .ps__thumb-y":
    {
      backgroundColor: "#999",
      width: "10px",
    },
  ".ps__rail-x:hover, .ps__rail-y:hover, .ps__rail-x:focus, .ps__rail-y:focus, .ps__rail-x.ps--clicking, .ps__rail-y.ps--clicking":
    {
      backgroundColor: "transparent !important",
    },
}));
