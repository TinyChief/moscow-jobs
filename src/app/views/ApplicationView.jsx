import { Box, Card, CardContent, Grid, Paper } from "@mui/material";
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

const InternshipDirectionCard = ({ name, icon, description, isSelected }) => {
  return (
    <Box
      component={Paper}
      elevation={isSelected ? 0 : 1}
      sx={{
        width: 150,
        height: 150,
        margin: 2,
        flexBasis: "150px",
        cursor: "pointer",
        backgroundColor: isSelected ? "rgb(42 231 105 / 12%)" : "transparent",
        borderRadius: "10px",
        border: isSelected ? "2px solid #18bf78" : "2px solid transparent",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Box
          component={isSelected ? CheckCircleOutline : icon || "div"}
          sx={{
            color: isSelected ? green[300] : grey[500],
            height: 40,
            fontSize: 40,
            marginBottom: "12px",
            marginTop: "15px",
          }}
        ></Box>
        <Paragraph fontWeight="bold">{name}</Paragraph>
      </Box>
    </Box>
  );
};

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

const ApplicationView = () => {
  const [selectedDirections, setSelectedDirections] = useState([]);

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
      const newSelectedDirections = selectedDirections.slice(1).concat(directionId);
      setSelectedDirections(newSelectedDirections);
    }
  };
  return (
    <>
      <h1>Подать заявку</h1>
      <Box textAlign={"center"} mb={2}>
        <H2 mb={1}>Начнём с выбора направления стажировки</H2>
        <Span
          sx={{
            fontSize: "14px",
            color: grey[500],
            fontWeight: "bold",
          }}
        >
          Выбери до трёх интересующих тебя направлений
        </Span>
      </Box>
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
    </>
  );
};

export default ApplicationView;
