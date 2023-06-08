import {
  Box,
  CardContent,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
} from "@mui/material";
import { H2, Span } from "./Typography";
import { CommonCard } from "./CommonCard";
import {
  Info,
  NextWeek,
  Rule,
  School,
  SupervisorAccount,
  TextSnippetOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { StyledScrollBar } from "./StyledScrollBar";
import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { STAGES } from "../utils/constant";
import { apiService } from "../services/useApiService";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/constant";
import { DirectionsNames, getApplicationStatusName } from "../utils/utils";
import { tryCatch } from "ramda";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <TextSnippetOutlined />,
    2: <School />,
    3: <Rule />,
    4: <NextWeek />,
    5: <SupervisorAccount />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Заявка на стажировку",
  "Карьерная школа",
  "Тестирование",
  "Кейс-чемпионат",
  "Тестовое задание и собеседование с работодателями",
];

export const ProgressCard = () => {
  const { status } = useUser();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (status) {
      let actualStep = 0;
      switch (status.stage) {
        case STAGES.REQUEST:
          actualStep = 0;
          break;
        case STAGES.SCHOOL:
          actualStep = 1;
          break;
        case STAGES.TEST:
          actualStep = 2;
          break;
        case STAGES.CASE:
          actualStep = 3;
          break;
        case STAGES.CHOICE:
          actualStep = 4;
          break;
        default:
          actualStep = 0;
      }

      setActiveStep(actualStep);
    }
  }, [status]);
  return (
    <CommonCard>
      <CardContent>
        <Box textAlign={"left"} mb={2}>
          <H2 mb={1}>Этапы отбора на стажировку</H2>
          <Span>
            Здесь отображается наиболее важная информация о процессе прохождения
            стажировки
          </Span>
        </Box>
        <StyledScrollBar>
          <Stepper
            sx={{
              minWidth: "500px",
            }}
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            // orientation="vertical"
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StyledScrollBar>
        <Box display={"flex"} marginTop={2}>
          <Info sx={{ fontSize: "30px", marginRight: 2 }} color="secondary" />
          <Box textAlign={"left"}>
            <StepGuide stage={status.stage} />
          </Box>
        </Box>
      </CardContent>
    </CommonCard>
  );
};

const StepGuide = ({ stage }) => {
  const [guide, setGuide] = useState("Нет статуса");

  const getRequestInfo = async () => {
    try {
      const { data } = await apiService.getMyApplication();

      setGuide(
        <>
          Статус заявки: {getApplicationStatusName(data.status)}
          <br />
          Выбранные направления:{" "}
          {data.departments.split(",").map((dep) => DirectionsNames[dep])}
          <br />
          Режим работы: {data.schedule} часов в неделю
        </>
      );
    } catch (error) {
      if (error.status === 404) {
        setGuide(
          <>
            Успей подать заявку на стажировку в Правительстве Москвы до 10
            апреля 2024 года. Для этого заполни информацию о себе и отправь
            заявку{" "}
            <Box
              to={ROUTES.APPLICATION}
              sx={(theme) => ({
                color: theme.palette.secondary.main,
                fontWeight: "bold",
              })}
              component={NavLink}
            >
              на странице
            </Box>
            .
          </>
        );
      } else {
        console.error("get application status error", error);
      }
    }
  };

  const getSchoolInfo = async () => {
    try {
      const { data } = await apiService.getMySchoolStatus();

      setGuide(
        <>
          {
            'Тебе доступны вебинары и образовательные ресурсы на портале "Карьерная школа". Переходи по ссылке: '
          }
          <Box
            component={"a"}
            href={data.url}
            sx={(theme) => ({
              color: theme.palette.secondary.main,
              fontWeight: "bold",
            })}
          >
            {data.url}
          </Box>
          .
          {data.progress !== 0 &&
            ` Твой прогресс прохождения трека: ${data.progress} %`}
        </>
      );
    } catch (error) {
      console.error("get school status error", error);
    }
  };

  const getTestInfo = async () => {
    try {
      const { data } = await apiService.getMyTestStatus();
      console.log(data);

      if (data.status === "WAITING") {
        setGuide(
          <>
            Тестирование проверит твои знания по русскому языку, анализу
            информации и компьютерной грамотности. На прохождение тестирования
            даётся 10 дней. В среднем выполнение занимает 1 час, постарайся
            найти свободное время и не отвлекаться во время тестирования. Если
            готов, переходи по ссылке:{" "}
            <Box
              component={"a"}
              href={data.url}
              sx={(theme) => ({
                color: theme.palette.secondary.main,
                fontWeight: "bold",
              })}
            >
              {data.url}
            </Box>
            .
          </>
        );
      } else if (data.status === "FAIL") {
        setGuide(
          <>
            Сожалеем, но набранных тобою баллов не хватает, чтобы мы пригласили
            тебя на следующий этап стажировки. Не отчаивайся, мы будем держать
            связь с тобой, а также сообщим о новом наборе в будущем году.
          </>
        );
      }
    } catch (error) {
      console.error("get test status error", error);
    }
  };

  const getCaseInfo = async () => {
    try {
      const { data } = await apiService.getMyCaseStatus();
      console.log(data);

      if (data.status === "WAITING") {
        setGuide(
          <>
            Тебе предстоит решить реальные задачи от организаций Правительства
            Москвы, презентуя решения перед членами жюри. В этом году чемпионат
            носит название {`"${data.name}"`}, он пройдет 25 апреля в Центре
            Карьеры Правительства Москвы.
          </>
        );
      } else if (data.status === "FAIL") {
        setGuide(
          <>
            Сожалеем, что у тебя не получилось проявить себя в должной мере на
            конкурсе. Не расстраивайся, в любом случае впереди тебя ждёт
            {'"Марафон работодателей"'}.
          </>
        );
      } else if (data.status === "PASS") {
        setGuide(
          <>
            Твой труд был высоко оценен жюри конкурса. Поздравляем тебя с
            успешным прохождением Кейс чемпионата и желаем успехов в выборе
            места стажировки.
          </>
        );
      }
    } catch (error) {
      console.error("get test status error", error);
    }
  };

  useEffect(() => {
    switch (stage) {
      case STAGES.REQUEST:
        getRequestInfo();
        break;
      case STAGES.SCHOOL:
        getSchoolInfo();
        break;
      case STAGES.TEST:
        getTestInfo();
        break;
      case STAGES.CASE:
        getCaseInfo();
        break;
    }
  }, [stage]);

  return <Typography whiteSpace={"pre-wrap"}>{guide}</Typography>;
};
