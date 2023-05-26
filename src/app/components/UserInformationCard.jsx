import {
  Box,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
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
import { pickAll } from "ramda";

export const UserInformationCard = ({ ...props }) => {
  return (
    <CommonCard>
      <CardContent>
        <BasicTabs {...props} />
      </CardContent>
    </CommonCard>
  );
};

const InformationGroup = ({ title, children }) => {
  return (
    <Grid item xs={12}>
      <H3 sx={{ textDecoration: "underline" }} mb={1}>
        {title}
      </H3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // "> div": { marginBottom: "15px" },
          // "div:last-child": { marginBottom: 0 },
          "> div": {
            marginBottom: "15px",
          },
        }}
      >
        {children}
      </Box>
    </Grid>
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

  const initialUserInfo = pickAll(
    [
      "birthday",
      "gender",
      "city",
      "district",
      "universityName",
      "universityYear",
      "universityCity",
      "faculty",
      "speciality",
      "educationLevel",
      "photoUrl",
      "vkId",
      "telegramId",
      "jobExperience",
      "jobStatus",
      "skills",
      "departments",
      "citizen",
    ],
    userInfo || {}
  );

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
          <Tab label="Персональные данные" {...a11yProps(0)} />
          <Tab label="Информация" {...a11yProps(1)} />
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
              <InformationGroup title={"Основная информация"}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} item>
                    <CustomDateFormat
                      onBlur={handleBlur}
                      value={values.birthday}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <FormControl size="small">
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        sx={{
                          fontSize: 11,
                        }}
                      >
                        Пол
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={values.gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio size="small" />}
                          label="Женский"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio size="small" />}
                          label="Мужской"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <CitizenInput
                  onBlur={handleBlur}
                  value={values.citizen}
                  onChange={handleChange}
                />
                <Grid container spacing={3}>
                  <Grid xs={12} item>
                    <CommonTextField
                      name="city"
                      label="Город проживания"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.city}
                      onChange={handleChange}
                      sx={{}}
                    />
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <CommonTextField
                      name="district"
                      label="Район проживания"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.district}
                      onChange={handleChange}
                      helperText="Указать, если город проживания - Москва"
                    />
                  </Grid>
                </Grid>
                <CommonTextField
                  name="educationLevel"
                  label="Образование"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.educationLevel}
                  onChange={handleChange}
                  helperText="Например, высшее"
                />
              </InformationGroup>
              <InformationGroup title="Образование">
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
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} item>
                    <CommonTextField
                      name="universityCity"
                      label="Город"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.universityCity}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <CommonTextField
                      name="universityYear"
                      label="Год окончания"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.universityYear}
                      onChange={handleChange}
                      helperText="Если ты еще учишься, напиши предполагаемый год выпуска"
                    />
                  </Grid>
                </Grid>

                <CommonTextField
                  name="faculty"
                  label="Факультет"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.faculty}
                  onChange={handleChange}
                />
                <CommonTextField
                  name="speciality"
                  label="Специальность"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.speciality}
                  onChange={handleChange}
                />
              </InformationGroup>
              <InformationGroup title="Опыт работы (практик, стажировок) или проектной общественной деятельности">
                <FormControl variant="standard" sx={{ minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Статус
                  </InputLabel>
                  <Select
                    name="jobStatus"
                    id="demo-simple-select-standard"
                    // defaultValue={1}
                    value={values.jobStatus || ""}
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
              </InformationGroup>
              <InformationGroup title="Дополнительная информация">
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
                <Grid container spacing={3}>
                  <Grid xs={6} item>
                    <CommonTextField
                      name="vkId"
                      label="Профиль в соцсети «ВКонтакте»"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.vkId}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <CommonTextField
                      name="telegramId"
                      label="Профиль в Telegram"
                      variant="standard"
                      onBlur={handleBlur}
                      value={values.telegramId}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </InformationGroup>
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
                <Box mb={2}>
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
                </Box>

                <Divider />
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
