import { Box, CardContent, Grid } from "@mui/material";
import { H2, Span } from "./Typography";
import { CommonCard } from "./CommonCard";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { CommonTextField } from "./CommonTextField";
import { DatePicker, LoadingButton } from "@mui/lab";
import CustomDateFormat from "./DatePicker";
import PhoneNumberInput from "./PhoneNumberInput";

export const UserInformationCard = () => {
  return (
    <CommonCard>
      <CardContent>
        <BasicTabs />
      </CardContent>
    </CommonCard>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const initialValues = {
    surname: "Юлдашбаев",
    name: "Вадим",
    secondname: "Русланович",
    birthday: "10-10-1997",
    phone: "+7 (960) 384-22-73",
  };

  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log("login error", e);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Персональные данные" {...a11yProps(0)} />
          <Tab label="Настройки" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            }) => (
              <form onSubmit={handleSubmit} onReset={handleReset}>
                <Grid container spacing={4}>
                  <Grid item xs={12} textAlign={"end"}>
                    <LoadingButton
                      type="reset"
                      variant="outlined"
                      sx={{ marginRight: 2 }}
                      color="error"
                    >
                      Отменить изменения
                    </LoadingButton>
                    <LoadingButton type="submit" variant="contained">
                      Сохранить
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CommonTextField
                      name="surname"
                      label="Фамилия"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.surname}
                      onChange={handleChange}
                      sx={{ mb: 1.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CommonTextField
                      name="name"
                      label="Имя"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      sx={{ mb: 1.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CommonTextField
                      name="secondname"
                      label="Отчество"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.secondname}
                      onChange={handleChange}
                      sx={{ mb: 1.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <CustomDateFormat
                      onBlur={handleBlur}
                      value={values.birthday}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <PhoneNumberInput
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      sx={{ mb: 1.5 }}
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}
