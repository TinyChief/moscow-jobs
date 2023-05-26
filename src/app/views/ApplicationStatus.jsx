import { Box } from "@mui/material";
import { H2, Paragraph, Span } from "../components/Typography";
import { useApplication } from "../contexts/ApplicationContext";
import styled from "@emotion/styled";
import { Paragliding } from "@mui/icons-material";

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
      <H2>Заявка на прохождение стажировки в Правительстве Москвы подана</H2>
      <Paragraph my={2}>
        Обычно процесс рассмотрения заявки занимает от одного до нескольких
        дней. Мы постараемся оперативно оценить твою кандидатуру на стажировку в
        Правительстве Москвы. Результат рассмотрения твоей заявки мы пришлём
        тебе на почту, а также он отобразится на этой странице. Вместе с
        результами мы пришлём тебе инструкцию о том, что нужно будет сделать
        дальше. Если у тебя остались вопросы, задавай их через форму обратной
        связи или пиши нам на почту.
      </Paragraph>
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
    </>
  );
}
