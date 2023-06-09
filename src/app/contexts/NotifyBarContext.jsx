import React, { useState, useEffect } from "react";
import { Box, Icon, IconButton, Typography } from "@mui/material";
import { useUser } from "../hooks/useUser";
import { KeyboardArrowDown } from "@mui/icons-material";
import { STAGES } from "../utils/constant";
import { ApplicationStatuses } from "../utils/utils";

export const NotifyBarProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { status } = useUser();
  console.log(status)

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    window.localStorage.setItem("lastSeenStatus", status.stage);
    setMessage("");
  };

  useEffect(() => {
    console.log(status);
    if (status) {
      const lastSeenStatus = window.localStorage.getItem("lastSeenStatus");
      if (lastSeenStatus === status.stage) return;

      setMessage(getNotifyText(status));
    }
  }, [status]);

  if (!status) return children({});

  return (
    <>
      <Box
        sx={(theme) => ({
          position: "absolute",
          left: "0",
          top: "0",
          minHeight: "48px",
          transition: "0.3s",
          overflow: "hidden",
          backgroundImage: "linear-gradient(90deg,  #1e3c72,#2a5298)",
          color: theme.palette.primary.dark,
          width: "100%",
          display: message ? "flex" : "none",
          alignItems: "center",
          px: 2,
          py: 1,
          zIndex: 95,
        })}
      >
        <Box flex={1} marginRight={2}>
          <Typography
            variant="body1"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: expanded ? "inherit" : "ellipsis",
              color: "white",
              WebkitLineClamp: expanded ? "none" : 1,
            }}
          >
            {getNotifyText(status)}
          </Typography>
        </Box>
        <Box display={"flex"} alignSelf={"flex-start"}>
          <IconButton size="small" onClick={handleToggleExpand}>
            <KeyboardArrowDown
              sx={{
                transform: expanded ? "rotate(90deg)" : "none",
                transition: "transform 0.5s ease",
                color: "#fff",
              }}
            />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ color: "#fff" }}
          >
            <Icon>cancel</Icon>
          </IconButton>
        </Box>
      </Box>
      {children({ open: !!message })}
    </>
  );
};

/**
 * @typedef UserState
 * @property {keyof STAGES} stage
 * @property {string} requestStatus
 * @property {string} schoolStatus
 * @property {string} testStatus
 * @property {string} caseStatus
 * @property {string} choiceStatus
 * @property {string} workStatus
 */

/**
 * @param {UserState} status
 */
function getNotifyText(status) {
  if (!status || !status.stage) return "";

  if (status.stage === STAGES.REQUEST) {
    if (status.requestStatus === "") {
      return "Первым делом заполни информацию о себе в профиле, после чего переходи к подаче заявки.";
    } else if (status.requestStatus === ApplicationStatuses.WAITING) {
      return "Мы получили вашу заявку на стажировку. Как только мы её рассмотрим, вы увидите обновленный статус.";
    } else if (status.requestStatus === ApplicationStatuses.ACCEPTED) {
      return 'Поздравляем, ваша заявка прошла проверку и теперь вам доступен следующий этап отбора - "Карьерная школа".';
    } else if (status.requestStatus === ApplicationStatuses.DECLINED) {
      return "К сожалению, мы вынуждены отклонить Вашу заявку на стажировку, так как Ваше образование не соответствует формальным требованиям.";
    }
  } else if (status.stage === STAGES.SCHOOL) {
    if (status.schoolStatus === "0") {
      return 'Тебе доступны вебинары и ресурсы на портале "Карьерная школа". Там ты найдешь много полезной информации о структуре Правительства Москвы, а также о будущих этапах стажировки.';
    } else {
      return `Видим, что ты уже освоился на портале "Карьерная школа". Твой прогресс прохождения трека - ${status.schoolStatus} %.`;
    }
  } else if (status.stage === STAGES.TEST) {
    if (status.testStatus === "WAITING") {
      return "Следующий этап отбора на стажировку это тестирование. Его нужно пройти до 10 апреля. В среднем прохождение теста занимает 1 час, рассчитай своё время так, чтобы тебя не отвлекали во время тестирования. У тебя будет только ОДНА попытка. Успехов, у тебя всё получится!";
    } else if (status.testStatus === "PASS") {
      return 'Ты успешно справился с тестированием, поздравляем! С этого дня ты становишься стажёром, а следующим значительным событием станет "Кейс чемпионат". Скоро мы расскажем о нём подробнее. Будь на связи!';
    } else if (status.testStatus === "FAIL") {
      return "Сожалеем, но набранных тобою баллов не хватает, чтобы мы пригласили тебя на следующий этап стажировки. Не отчаивайся, мы будем держать связь с тобой, а также сообщим о новом наборе в будущем году.";
    }
  } else if (status.stage === STAGES.CASE) {
    if (status.caseStatus === "WAITING") {
      return "Кейс чемпионат пройдет 20 апреля в Центрe Карьеры Правительства Москвы. Программу мероприятия ты найдешь в соответствующем разделе на портале.";
    } else if (status.caseStatus === "PASS") {
      return "Твой труд был высоко оценен жюри конкурса. Поздравляем тебя с успешным прохождением Кейс чемпионата и желаем успехов в выборе места стажировки.";
    } else if (status.caseStatus === "FAIL") {
      return 'Сожалеем, что у тебя не получилось проявить себя в должной мере на конкурсе. Не расстраивайся, в любом случае впереди тебя ждёт "Марафон работодателей".';
    }
  }
}
