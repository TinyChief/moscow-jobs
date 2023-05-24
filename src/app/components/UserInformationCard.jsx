import { Box, CardContent, Grid } from "@mui/material";
import { CommonCard } from "./CommonCard";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Formik } from "formik";
import { CommonTextField } from "./CommonTextField";
import { LoadingButton } from "@mui/lab";
import CustomDateFormat from "./DatePicker";
import PhoneNumberInput from "./PhoneNumberInput";
import CitizenInput from "./CitizenInput";

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
    birthday: userInfo.birthday,
    citizen: userInfo.citizen,
    universityName: userInfo.universityName,
    universityYear: userInfo.universityYear,
    jobExperience: userInfo.jobExperience,
    departments: userInfo.departments,
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
        >
          {({ values, handleChange, handleBlur }) => (
            <>
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
                <CommonTextField
                  name="email"
                  label="E-mail"
                  variant="standard"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  sx={{ mb: 1.5 }}
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
              <Grid item xs={12} md={5}>
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
function UserDataForm({ userData, onSubmit, children }) {
  return (
    <Box>
      <Formik onSubmit={onSubmit} initialValues={userData} enableReinitialize>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
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
              })}
              {/* <Component {...{ values, handleChange, handleBlur }} /> */}
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}
