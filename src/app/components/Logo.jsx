import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

const Logo = ({ className }) => {
  const theme = useTheme();

  return (
    <Box
      component={"img"}
      src={"/assets/images/logo-circle.jpg"}
      alt={"техно-прорыв"}
      sx={{
        width: "40px",
        height: "40px",
        borderRadius: "50%"
      }}
    >
      {/* <img src="/assets/images/proryv.jpg" alt="техно-прорыв" /> */}
    </Box>
  );
};

export default Logo;
