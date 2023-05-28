import { Box, styled } from "@mui/material";
import Logo from "./Logo";
import useSettings from "@/app/hooks/useSettings";
import { Span } from "./Typography";

const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 29px",
  zIndex: 100,
}));

const StyledSpan = styled(Span)(() => ({
  fontSize: 18,
  marginLeft: ".5rem",
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <Logo />
        <StyledSpan
          className="sidenavHoverShow"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {/* {`Стажировки\nв Правительстве Москвы`} */}
          {` Портал \n «Стажировки»`}
        </StyledSpan>
      </Box>

      <Box
        className="sidenavHoverShow"
        sx={{ display: mode === "compact" ? "none" : "block" }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
