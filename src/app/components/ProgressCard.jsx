import {
  Box,
  CardContent,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  stepConnectorClasses,
} from "@mui/material";
import { H2, Span } from "./Typography";
import { CommonCard } from "./CommonCard";
import {
  NextWeek,
  Rule,
  School,
  SupervisorAccount,
  TextSnippetOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { StyledScrollBar } from "./StyledScrollBar";

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

export const ProgressCard = ({ activeStep }) => {
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
      </CardContent>
    </CommonCard>
  );
};
