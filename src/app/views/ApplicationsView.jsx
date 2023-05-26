import { Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "../utils/utils";


const ApplicationsView = ({ isIntern }) => {
  const [activeType, setActiveType] = useState(ApplicationTypes.RECOMMENDED);

  async function uploadApplications (type, page) {


  }

  useEffect(() => {
    console.log('type chandeg to', activeType)
  }, [activeType]);

  return (
    <>
      <Box component={"h1"} textAlign={"center"}>
        {isIntern ? "Заявки от стажёров" : "Заявки от кандидатов"}
      </Box>
      <p>{activeType}</p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          fullWidth
        >
          <Button
            color="success"
            onClick={() => setActiveType(ApplicationTypes.RECOMMENDED)}
            sx={{
              fontWeight: activeType === ApplicationTypes.RECOMMENDED && "bold",
            }}
          >
            Рекомендованные
          </Button>
          <Button
            color="error"
            onClick={() => setActiveType(ApplicationTypes.NOT_RECOMMENDED)}
            sx={{
              fontWeight: activeType === ApplicationTypes.NOT_RECOMMENDED && "bold",
            }}
          >
            Нерекомендованные
          </Button>
          <Button
            color="info"
            onClick={() => setActiveType(ApplicationTypes.ALL)}
            sx={{
              fontWeight: activeType === ApplicationTypes.ALL && "bold",
            }}
          >
            Все
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default ApplicationsView;
