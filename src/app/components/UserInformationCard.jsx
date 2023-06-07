import {
  Box,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Checkbox,
} from "@mui/material";
import { CommonCard } from "./CommonCard";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CommonTextField } from "./CommonTextField";
import CustomDateFormat from "./CustomDateFormat";
import PhoneNumberInput from "./PhoneNumberInput";
import CitizenInput from "./CitizenInput";
import {
  userDataValidationSchema,
  userInfoValidationSchema,
} from "../utils/validations";
import { pickAll } from "ramda";
import { CommonDataForm } from "./CommonDataForm";
import { InformationGroup } from "./InformationGroup";
import { isInternOrCandidate } from "../utils/utils";

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
    console.log(newValue);
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
      // "hasJobExperience",
      // "hasVolunteerExperience",
      "jobExperience",
      "jobStatus",
      "skills",
      "departments",
      "citizen",
    ],
    userInfo || {}
  );

  initialUserInfo.hasJobExperience =
    (userInfo && userInfo.hasJobExperience) || false;
  initialUserInfo.hasVolunteerExperience =
    (userInfo && userInfo.hasVolunteerExperience) || false;

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
          {isInternOrCandidate(user.role) && (
            <Tab label="Информация" {...a11yProps(1)} />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CommonDataForm
          initialData={initialUser}
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
        </CommonDataForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CommonDataForm
          initialData={initialUserInfo}
          onSubmit={(values) => handleFormSubmit("userInfo", values)}
          validationSchema={userInfoValidationSchema}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <>
              <InformationGroup title={"Основная информация"}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} item>
                    <CustomDateFormat
                      onBlur={handleBlur}
                      value={values.birthday}
                      onChange={handleChange}
                      helperText={touched.birthday && errors.birthday}
                      error={Boolean(errors.birthday && touched.birthday)}
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
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="FEMALE"
                          control={<Radio size="small" />}
                          label="Женский"
                        />
                        <FormControlLabel
                          value="MALE"
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
                  helperText={touched.citizen && errors.citizen}
                  error={Boolean(errors.citizen && touched.citizen)}
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
                {/* <CommonTextField
                  name="educationLevel"
                  label="Уровень образования"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.educationLevel}
                  onChange={handleChange}
                  helperText={touched.educationLevel && errors.educationLevel || "Например, высшее"}
                  error={Boolean(errors.educationLevel && touched.educationLevel)}
                /> */}
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 200 }}
                  error={Boolean(
                    errors.educationLevel && touched.educationLevel
                  )}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Уровень образования
                  </InputLabel>
                  <Select
                    name="educationLevel"
                    id="demo-simple-select-standard"
                    // defaultValue={1}
                    value={values.educationLevel || ""}
                    onChange={handleChange}
                    size="small"
                    variant="standard"
                  >
                    <MenuItem value="среднее профессиональное образование">
                      среднее профессиональное образование
                    </MenuItem>
                    <MenuItem value="высшее образование - бакалавриат">
                      высшее образование - бакалавриат
                    </MenuItem>
                    <MenuItem value="высшее образование - специалитет, магистратура">
                      высшее образование - специалитет, магистратура
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.educationLevel && errors.educationLevel}
                  </FormHelperText>
                </FormControl>
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
                      type="number"
                      value={values.universityYear || ""}
                      onChange={handleChange}
                      helperText={
                        "Если ты еще учишься, напиши предполагаемый год выпуска"
                      }
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
              <InformationGroup title="Опыт работы">
                <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                  Опыт работы (практик, стажировок) или проектной общественной
                  деятельности
                </FormLabel>
                <FormGroup sx={{ marginLeft: 1 }}>
                  <FormControlLabel
                    sx={{ marginBottom: 1 }}
                    control={
                      <Checkbox
                        checked={values.hasJobExperience}
                        onChange={handleChange}
                        name="hasJobExperience"
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Работал"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.hasVolunteerExperience}
                        onChange={handleChange}
                        name="hasVolunteerExperience"
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Занимался волонтерством, проектной общественной деятельностью"
                  />
                </FormGroup>
                {/* <FormControl variant="standard" sx={{ minWidth: 200 }}>
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
                </FormControl> */}
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
        </CommonDataForm>
      </TabPanel>
    </Box>
  );
}
