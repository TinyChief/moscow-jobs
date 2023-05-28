import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { H2, H3, Paragraph, Span } from "../components/Typography";
import {
  CurrencyRuble,
  Devices,
  Groups2,
  Language,
  LibraryBooks,
  LocationCity,
  PersonSearch,
} from "@mui/icons-material";
import { useState } from "react";
import { InternshipDirectionCard } from "../components/InternshipDirectionCard";
import { LoadingButton } from "@mui/lab";
import { useApplication } from "../contexts/ApplicationContext";
import useError from "../hooks/useError";
import { useSnackbar } from "../contexts/snackbarContext";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { HackLink } from "../layout/LayoutFooter";
import { useUser } from "../hooks/useUser";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // Импортируем локаль для русского языка
import CandidateApplicationInfo from "../components/CandidateApplicationInfo";
import { DirectionsNicks } from "../utils/utils";

dayjs.locale("ru"); // Устанавливаем локаль для русского языка

const internshipDirections = [
  {
    name: "IT-город",
    icon: Devices,
    nick: DirectionsNicks["IT"],
    id: 1,
  },
  {
    name: "Медийный город",
    icon: Language,
    nick: DirectionsNicks["МГ"],
    id: 2,
  },
  {
    name: "Социальный город",
    icon: Groups2,
    nick: DirectionsNicks["СГ"],
    id: 3,
  },
  {
    name: "Комфортная городская среда",
    icon: LocationCity,
    nick: DirectionsNicks["КГС"],
    id: 4,
  },
  {
    name: "Правовое пространство",
    icon: LibraryBooks,
    nick: DirectionsNicks["ПП"],
    id: 5,
  },
  {
    name: "Городская экономика",
    icon: CurrencyRuble,
    nick: DirectionsNicks["ГЭ"],
    id: 6,
  },
  {
    name: "HR-город",
    icon: PersonSearch,
    nick: DirectionsNicks["HR"],
    id: 7,
  },
];

const ApplicationItem = ({ children, title, description }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginY: "1rem",
        width: "100%",
      }}
    >
      <Box mb={1}>
        <H2 mb={1}>{title}</H2>
        <Span
          sx={{
            fontSize: "14px",
            color: grey[500],
            fontWeight: "bold",
          }}
        >
          {description}
        </Span>
      </Box>

      {children}
    </Box>
  );
};

const MakeApplication = () => {
  const theme = useTheme();
  const { makeApplication } = useApplication();
  const [loading, setLoading] = useState(false);
  const { setError } = useError();
  const { showSnackbar } = useSnackbar();
  const { user, userInfo } = useUser();

  let hasInfo = false;
  if (userInfo !== null) hasInfo = true;

  const [selectedDirections, setSelectedDirections] = useState([]);
  const [busyness, setBusyness] = useState(40);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await makeApplication(
        selectedDirections
          .map((id) => {
            const direction = internshipDirections.find((el) => el.id === id);
            return direction.nick;
          })
          .join(","),
        busyness
      );
      showSnackbar("Заявка успешно подана!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setError(error);
      console.log("make application error", error);
      setLoading(false);
    }
  };

  const handleSelected = (directionId) => {
    if (selectedDirections.includes(directionId)) {
      setSelectedDirections((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== directionId)
      );
    } else if (selectedDirections.length < 3) {
      setSelectedDirections((prevSelectedIds) => [
        ...prevSelectedIds,
        directionId,
      ]);
    } else {
      // если количество выделенных пользователей равно 3, заменяем первый элемент массива
      const newSelectedDirections = selectedDirections
        .slice(1)
        .concat(directionId);
      setSelectedDirections(newSelectedDirections);
    }
  };
  return (
    <>
      <H2 mb={1}>Стажировка в Правительстве Москвы</H2>
      <Paragraph my={2}>
        Прямо сейчас ты делаешь свой первый шаг на пути к карьере в
        Правительстве Москвы — участвуешь в отборе на стажировку, которая
        пройдет во II-III квартале 2024 года. Стать стажерами Правительства
        Москвы могут студенты бакалавриата или специалитета, обучающиеся на
        последнем курсе, магистранты и выпускники вузов, получившие первое
        образование с 2016 по 2022 год.
      </Paragraph>
      <Paragraph my={2} sx={{ fontWeight: "bold" }}>
        Чтобы подать заявку, сперва нужно заполнить информацию о себе на
        <NavLink
          to={"/profile"}
          style={{
            color: theme.palette.primary.main,
            marginLeft: 5,
          }}
        >
          странице профиля
        </NavLink>
        . Заполненная там информация станет твоей анкетой при подаче заявки, а
        анкета — это начало нашего знакомства. Мы хотим узнать о твоём
        образовании, опыте работы, если он есть, увлечениях или внеучебной
        деятельности, о навыках, которые ты приобрел во время учебы. Обязательно
        заполни анкету полностью перед подачей заявки — мы не сможем увидеть
        изменения, внесенные после отклика.
      </Paragraph>

      <Paragraph my={2}>
        После того как укажешь всю необходимую информацию, возвращайся обратно
        на эту страницу, проверяй правильность введенных данных, выбирай
        предпочтительное направление стажировки, вариант занятости, и вот ты уже
        готов к подаче заявки.
        <br />
        <br />
        Желаем удачи!
      </Paragraph>
      <Divider></Divider>
      <ApplicationItem
        title={"Анкета"}
        description={
          "Проверь, чтобы вся информация была заполнена корректно,\n после подачи заявки, отредактировать эти поля не получится."
        }
      >
        {hasInfo ? (
          <CandidateApplicationInfo user={user} userInfo={userInfo} />
        ) : (
          <Paragraph my={2} sx={{ fontWeight: "bold" }}>
            Необходимо заполнить информацию о себе
            <NavLink
              to={"/profile"}
              style={{
                color: theme.palette.primary.main,
                marginLeft: 5,
              }}
            >
              на странице профиля.
            </NavLink>
          </Paragraph>
        )}

        <Divider></Divider>
      </ApplicationItem>
      <ApplicationItem
        title={"Давай определимся с направлениями стажировки"}
        description={"Выбери до трёх интересующих тебя направлений"}
      >
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: 800,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {internshipDirections.map(({ name, icon, id, nick }, i) => {
            return (
              <Box key={id} onClick={() => handleSelected(id)}>
                <InternshipDirectionCard
                  name={name}
                  icon={icon}
                  nick={nick}
                  isSelected={selectedDirections.includes(id)}
                />
              </Box>
            );
          })}
        </Box>
      </ApplicationItem>
      <ApplicationItem
        title={"Какой вариант занятости подходит тебе больше?"}
        description={
          "От выбора занятости будет зависеть объем работы и заработная плата."
        }
      >
        <FormControl sx={{ textAlign: "left" }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={busyness}
            onChange={(event) => setBusyness(event.target.value)}
          >
            <FormControlLabel
              value="40"
              control={<Radio />}
              label="Полная занятость, 40 часов в неделю"
            />
            <FormControlLabel
              value="20"
              control={<Radio />}
              label="Частичная занятость, 20 часов в неделю"
            />
          </RadioGroup>
        </FormControl>
      </ApplicationItem>
      <Paragraph my={2}>
        Нажимая кнопку «Подать заявку», ты соглашаешься на обработку
        персональных данных, указанных тобой в анкете (включая контактную
        информацию и фотографии), в рамках проекта «Карьерный портал
        Правительства Москвы» в соответствии с{" "}
        <HackLink sx={{ fontWeight: "400" }} href="#" target="_blank">
          {" "}
          текстом согласия
        </HackLink>
        .
      </Paragraph>
      <Box display={"flex"} justifyContent={"center"} maxWidth={"100%"}>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: 400 }}
          disabled={selectedDirections.length === 0 || !hasInfo}
        >
          Подать заявку
        </LoadingButton>
      </Box>
    </>
  );
};

export default MakeApplication;
