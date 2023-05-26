import {
  AppBar,
  Button,
  ThemeProvider,
  Toolbar,
  styled,
  useTheme,
} from "@mui/material";
import { topBarHeight } from "@/app/utils/constant";
import { Paragraph, Span } from "@/app/components/Typography";

const AppFooter = styled(Toolbar)(() => ({
  display: "flex",
  alignItems: "center",
  minHeight: topBarHeight,
  "@media (max-width: 499px)": {
    display: "table",
    width: "100%",
    minHeight: "auto",
    padding: "1rem 0",
    "& .container": {
      flexDirection: "column !important",
      "& a": { margin: "0 0 16px !important" },
    },
  },
}));

const FooterContent = styled("div")(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "0px 1rem",
  maxWidth: "1170px",
  margin: "0 auto",
}));

export const HackLink = styled("a")(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: "bold",
}));

const LayoutFooter = () => {
  return (
    <AppBar
      component={"footer"}
      color="primary"
      position="static"
      sx={{ zIndex: 96 }}
    >
      <AppFooter>
        <FooterContent>
          <Span sx={{ m: "auto" }}></Span>
          <Paragraph sx={{ m: 0 }}>
            Техно-прорыв для хакатона{" "}
            <HackLink href="https://leaders2023.innoagency.ru/">
              ЛЦТ 2023
            </HackLink>
          </Paragraph>
        </FooterContent>
      </AppFooter>
    </AppBar>
  );
};

export default LayoutFooter;
