import {
  Box,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { CommonCard } from "./CommonCard";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Formik } from "formik";
import { CommonTextField } from "./CommonTextField";
import { LoadingButton } from "@mui/lab";
import CustomDateFormat from "./CustomDateFormat";
import PhoneNumberInput from "./PhoneNumberInput";
import CitizenInput from "./CitizenInput";
import { H3 } from "./Typography";
import { userDataValidationSchema } from "../utils/validations";

export const UserInformationCard = ({ ...props }) => {
  return (
    <CommonCard>
      <CardContent>
        <BasicTabs {...props} />
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

export default function BasicTabs({ user, userInfo, onChange }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialUser = {
    surname: user.surname,
    name: user.name,
    secondname: user.secondname,
    phone: user.phone,
    email: user.email,
  };

  const initialUserInfo = {
    birthday: userInfo.birthday || "",
    citizen: userInfo.citizen || "",
    universityName: userInfo.universityName || undefined,
    universityYear: userInfo.universityYear || undefined,
    jobExperience: userInfo.jobExperience || "",
    jobStatus: userInfo.jobStatus || "",
    skills: userInfo.skills || "",
    departments: userInfo.departments || "",
  };

  const handleFormSubmit = async (type, values) => {
    onChange(type, values);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Основная информация" {...a11yProps(0)} />
          <Tab label="Анкета" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserDataForm
          userData={initialUser}
          onSubmit={(values) => handleFormSubmit("user", values)}
          validationSchema={userDataValidationSchema.omit(["password"])}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <>
              <Grid item xs={12} md={4}>
                <CommonTextField
                  name="surname"
                  label="Фамилия"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.surname}
                  onChange={handleChange}
                  helperText={touched.surname && errors.surname}
                  error={Boolean(errors.surname && touched.surname)}
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
                  helperText={touched.name && errors.name}
                  error={Boolean(errors.name && touched.name)}
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
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <CommonTextField
                  name="email"
                  label="E-mail"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  error={Boolean(errors.email && touched.email)}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <PhoneNumberInput
                  onBlur={handleBlur}
                  value={values.phone}
                  onChange={handleChange}
                  helperText={touched.phone && errors.phone}
                  error={Boolean(errors.phone && touched.phone)}
                />
              </Grid>
            </>
          )}
        </UserDataForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserDataForm
          userData={initialUserInfo}
          onSubmit={(values) => handleFormSubmit("userInfo", values)}
        >
          {({ values, handleChange, handleBlur }) => (
            <>
              <Grid item xs={12}>
                <CustomDateFormat
                  onBlur={handleBlur}
                  value={values.birthday}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <CitizenInput
                  onBlur={handleBlur}
                  value={values.citizen}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <H3>Образование</H3>
                <CommonTextField
                  name="universityName"
                  label="Учебное заведение"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.universityName}
                  onChange={handleChange}
                  helperText={
                    "Полное наименование без аббрeвиатур и сокращений"
                  }
                />
                <CommonTextField
                  name="universityYear"
                  label="Курс"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.universityYear}
                  onChange={handleChange}
                  // helperText="Нынешний курс обучения или кол-во отученных курсов"
                />
              </Grid>
              <Grid item xs={12}>
                <H3>О себе</H3>
                <CommonTextField
                  name="skills"
                  label="Области экспертизы"
                  variant="standard"
                  multiline
                  minRows={3}
                  onBlur={handleBlur}
                  value={values.skills}
                  onChange={handleChange}
                  helperText="Перечислите через запятую soft и hard skills"
                />
                <CommonTextField
                  name="departments"
                  label="Ведомства"
                  variant="standard"
                  multiline
                  minRows={3}
                  onBlur={handleBlur}
                  value={values.departments}
                  onChange={handleChange}
                  helperText={
                    <>
                      {"Перечислите через запятую интересные вам "}
                      <Box
                        component={"a"}
                        href="https://www.mos.ru/pgu/ru/departments/"
                        target="_blank"
                        sx={{
                          color: "secondary.main",
                        }}
                      >
                        ведомства
                      </Box>
                    </>
                  }
                  // helperText={"Перечислите через запятую ведомства"}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <H3>Опыт работы</H3>
                <FormControl variant="standard" sx={{ minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Статус
                  </InputLabel>
                  <Select
                    name="jobStatus"
                    id="demo-simple-select-standard"
                    value={values.jobStatus}
                    onChange={handleChange}
                    size="small"
                    variant="standard"
                  >
                    <MenuItem value="1">Трудоустроен</MenuItem>
                    <MenuItem value="2">В поиске работы</MenuItem>
                  </Select>
                </FormControl>
                <CommonTextField
                  name="jobExperience"
                  label="Место работы"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.jobExperience}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  helperText="Укажите последние 3 (максимум) места работы, начиная с последнего."
                />
              </Grid>
            </>
          )}
        </UserDataForm>
      </TabPanel>
    </Box>
  );
}

/**
 *
 * @param {{onSubmit: import("formik").FormikConfig['onSubmit']}} param0
 * @returns
 */
function UserDataForm({ userData, onSubmit, validationSchema, children }) {
  return (
    <Box>
      <Formik
        onSubmit={onSubmit}
        initialValues={userData}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          touched,
          errors,
          dirty,
        }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container spacing={4} textAlign={"left"}>
              <Grid item xs={12} textAlign={"end"}>
                <LoadingButton
                  type="reset"
                  variant="outlined"
                  sx={{ marginRight: 2 }}
                  color="error"
                  disabled={!dirty}
                >
                  Отменить изменения
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={!dirty || isSubmitting}
                >
                  Сохранить
                </LoadingButton>
              </Grid>
              {React.createElement(children, {
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
              })}
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}
