import { Box } from "@mui/material";
import { Span } from "../components/Typography";
import { useApplication } from "../contexts/ApplicationContext";
import styled from "@emotion/styled";

const StatusRow = styled(Box)(() => ({
  display: "flex",
  "> :first-child": {
    flexGrow: 1,
  },
  "> span": {
    fontSize: 18,
  },
}));

export default function ApplicationStatus() {
  const { score, status } = useApplication();
  // const { score, status } = { status: "WAITING", score: 30 };

  const getNameStatus = (status) => {
    return {
      WAITING: "В обработке",
      ACCEPTED: "Принята",
      DECLINED: "Отклонена",
    }[status];
  };

  return (
    <>
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: 600,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <StatusRow mb={2}>
          <Span>Статус заявки: </Span>
          <Span
            sx={(theme) => ({
              color:
                status === "ACCEPTED"
                  ? theme.palette.success.light
                  : status === "DECLINED"
                  ? theme.palette.error.light
                  : "inherit",
            })}
          >
            {getNameStatus(status)}
          </Span>
        </StatusRow>
        <StatusRow>
          <Span>Результат тестирования: </Span>
          <Span> {score} / 100</Span>
        </StatusRow>
      </Box>
    </>
  );
}
