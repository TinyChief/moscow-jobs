import PropTypes from "prop-types";
import { Card } from "@mui/material";

export const CommonCard = ({ children }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "6px",
        textAlign: "center",
      }}
    >
      {children}
    </Card>
  );
};

CommonCard.propTypes = {
  children: PropTypes.node,
};
