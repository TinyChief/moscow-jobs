import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { H2, Span } from "../components/Typography";
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
        marginBottom: "1rem",
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
  const { makeApplication } = useApplication();
  const [loading, setLoading] = useState(false);
  const { setError } = useError();
  const { showSnackbar } = useSnackbar();

  const [selectedDirections, setSelectedDirections] = useState([]);
  const [busyness, setBusyness] = useState(40);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await makeApplication(selectedDirections, busyness);
      showSnackbar("Заявка успешно подана!")
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
    <Box
      sx={{
        margin: "0 auto",
        maxWidth: 800,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ApplicationItem
        title={"Начнём с выбора направления стажировки"}
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
    </Box>
  );
};

export default MakeApplication;
