import { Box, Button, CardContent } from "@mui/material";
import { CommonCard } from "./CommonCard";
import { ContactSupport } from "@mui/icons-material";
import { H2, Small } from "./Typography";
import { grey } from "@mui/material/colors";

export const HelpCard = () => {
  return (
    <CommonCard>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          minHeight: "240px",
        }}
      >
        <Box my={2}>
          <ContactSupport sx={{ fontSize: 60, color: grey[300] }} />
        </Box>
        <Box mb={8}>
          <H2>Нужна помощь?</H2>
          <Small>
            Пожалуйста, не стесняйтесь связаться с нами, если у вас есть
            какие-либо вопросы или замечания.
          </Small>
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{ textTransform: "uppercase" }}
        >
          Напишите нам
        </Button>
      </CardContent>
    </CommonCard>
  );
};
