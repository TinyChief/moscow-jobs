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
import useUser from "../hooks/useUser";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // Импортируем локаль для русского языка
import { getGenderName, getJobStatusName } from "../utils/utils";

dayjs.locale("ru"); // Устанавливаем локаль для русского языка

const internshipDirections = [
  {
    name: "IT-город",
    icon: Devices,
    id: 1,
  },
  {
    name: "Медийный город",
    icon: Language,
    id: 2,
  },
  {
    name: "Социальный город",
    icon: Groups2,
    id: 3,
  },
  {
    name: "Комфортная городская среда",
    icon: LocationCity,
    id: 4,
  },
  {
    name: "Правовое пространство",
    icon: LibraryBooks,
    id: 5,
  },
  {
    name: "Городская экономика",
    icon: CurrencyRuble,
    id: 6,
  },
  {
    name: "HR-город",
    icon: PersonSearch,
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

const UserInfoItem = ({ title, value }) => {
  return (
    <Box display={"flex"} mb={1}>
      <Box component={"span"} textAlign={"end"} width={"48%"}>
        {title}:
      </Box>
      <Box component={"span"} textAlign={"start"} marginLeft={"20px"}>
        {value}
      </Box>
    </Box>
  );
};

const UserInfoSectionTitle = ({ title }) => {
  return (
    <Box component={"h3"} mb={2}>
      {title}
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
      await makeApplication(selectedDirections, busyness);
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
          <>
            <UserInfoSectionTitle title={"Основная информация"} />
            <UserInfoItem title={"Имя"} value={user.name} />
            <UserInfoItem title={"Фамилия"} value={user.surname} />
            <UserInfoItem title={"Отчество"} value={user.secondname} />
            <UserInfoItem
              title={"Пол"}
              value={userInfo.gender ? getGenderName(userInfo.gender) : ""}
            />
            <UserInfoItem title={"Город проживания"} value={userInfo.city} />
            <UserInfoItem
              title={"Район проживания"}
              value={userInfo.district}
            />
            <UserInfoItem
              title={"Дата рождения"}
              value={
                userInfo.birthday
                  ? dayjs(userInfo.birthday).format("DD MMMM YYYY [г.]")
                  : ""
              }
            />
            <UserInfoItem title={"Гражданство"} value={userInfo.citizen} />
            <UserInfoItem title={"Образование"} value={userInfo.level} />
            <UserInfoItem
              title={"Адрес электронной почты"}
              value={user.email}
            />
            <UserInfoItem title={"Мобильный телефон"} value={user.phone} />
            <UserInfoSectionTitle title={"Образование"} />
            <UserInfoItem
              title={"Учебное заведение"}
              value={userInfo.universityName}
            />
            <UserInfoItem title={"Город"} value={userInfo.universityCity} />
            <UserInfoItem title={"Факультет"} value={userInfo.faculty} />
            <UserInfoItem title={"Специальность"} value={userInfo.speciality} />
            <UserInfoItem
              title={"Год окончания"}
              value={userInfo.universityYear}
            />
            <UserInfoSectionTitle
              title={
                "Опыт работы (практик, стажировок) или проектной общественной деятельности"
              }
            />
            <UserInfoItem
              title={"Место работы"}
              value={userInfo.jobExperience}
            />
            <UserInfoItem
              title={"Статус"}
              value={
                userInfo.jobStatus ? getJobStatusName(userInfo.jobStatus) : ""
              }
            />
            <UserInfoSectionTitle title={"Дополнительная информация"} />
            <UserInfoItem title={"Откуда узнал(a) о стажировке"} value={""} />
            <UserInfoItem
              title={"Профиль в соцсети «ВКонтакте»"}
              value={userInfo.vkId}
            />
            <UserInfoItem
              title={"Профиль в Telegram"}
              value={userInfo.telegramId}
            />
          </>
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
          {internshipDirections.map(({ name, icon, id }, i) => {
            return (
              <Box key={id} onClick={() => handleSelected(id)}>
                <InternshipDirectionCard
                  name={name}
                  icon={icon}
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
          disabled={selectedDirections.length === 0}
        >
          Подать заявку
        </LoadingButton>
      </Box>
    </>
  );
};

export default MakeApplication;
