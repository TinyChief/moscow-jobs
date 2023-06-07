import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CommonTextField } from "./CommonTextField";
import FileDropZone from "./ApplicationTestCreateFileDropzone";
import { CenteredBox } from "./CenteredBox";
import { H2, H4 } from "./Typography";
import { grey } from "@mui/material/colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{ width: "100%", height: "100%", p: 3 }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ApplicationTestCreate({ ...props }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 300,
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Написать текст задания" {...a11yProps(0)} />
        <Tab label="Составить тест" {...a11yProps(1)} />
        <Tab label="Загрузить файл" {...a11yProps(2)} />
      </Tabs>
      <Box flex={1}>
        <TabPanel value={value} index={0}>
          <CommonTextField
            name="test"
            label="Тестовое задание"
            variant="outlined"
            multiline
            rows={12}
            {...props}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CenteredBox>
            <H2>Подключим конструктор теста</H2>
            <H4 color={grey[600]}>Но позже...</H4>
          </CenteredBox>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FileDropZone></FileDropZone>
        </TabPanel>
      </Box>
    </Box>
  );
}
