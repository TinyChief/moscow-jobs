import { Box, Paper } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Paragraph } from "../components/Typography";
import {
  CheckCircleOutline,
} from "@mui/icons-material";

export const InternshipDirectionCard = ({ name, icon, description, isSelected }) => {
  return (
    <Box
      component={Paper}
      elevation={isSelected ? 0 : 1}
      sx={{
        width: 150,
        height: 150,
        margin: 2,
        flexBasis: "150px",
        cursor: "pointer",
        backgroundColor: isSelected ? "rgb(42 231 105 / 12%)" : "transparent",
        borderRadius: "10px",
        border: isSelected ? "2px solid #18bf78" : "2px solid transparent",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Box
          component={isSelected ? CheckCircleOutline : icon || "div"}
          sx={{
            color: isSelected ? green[300] : grey[500],
            height: 40,
            fontSize: 40,
            marginBottom: "12px",
            marginTop: "15px",
          }}
        ></Box>
        <Paragraph fontWeight="bold">{name}</Paragraph>
      </Box>
    </Box>
  );
};