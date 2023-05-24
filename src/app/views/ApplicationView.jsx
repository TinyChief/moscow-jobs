import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CommonCard } from "../components/CommonCard";
import { green, grey } from "@mui/material/colors";
import { H2, Paragraph, Span } from "../components/Typography";
import {
  CheckCircleOutline,
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
import styled from "@emotion/styled";

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

const ApplicationView = () => {
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [busyness, setBusyness] = useState(null);

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
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={busyness}
            onChange={setBusyness}
          >
            <FormControlLabel
              value="40"
              control={<Radio />}
              label="Полная занятость, 40 часов в неделю"
            />
            <FormControlLabel
              value="40"
              control={<Radio />}
              label="Частичная занятость, 20 часов в неделю"
            />
          </RadioGroup>
        </FormControl>
      </ApplicationItem>
    </Box>
  );
};

export default ApplicationView;
