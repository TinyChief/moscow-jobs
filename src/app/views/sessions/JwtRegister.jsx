import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, Stack, TextField } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Paragraph } from "../../components/Typography";
import useAuth from "../../hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginRegisterLayout from "../../layout/LoginRegisterLayout";
import { CommonTextField } from "../../components/CommonTextField";
import { TextFieldsWrapper } from "../../components/TextFieldsWrapper";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

// inital login credentials
const initialValues = {
  surname: "",
  name: "",
  secondname: "",
  email: "",
  password: "",
  username: "",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  surname: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  name: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  password: Yup.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .required("Поле обязательно к заполнению!"),
  email: Yup.string()
    .email("Укажите валидный адрес эл. почты")
    .required("Поле обязательно к заполнению!"),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values) => {
    setLoading(true);

    try {
      register(values.email, values.username, values.password);
      navigate("/");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <LoginRegisterLayout>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <ContentBox>
            <img
              width="100%"
              alt="Register"
              src="/assets/images/illustrations/posting_photo.svg"
            />
          </ContentBox>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Box p={4} height="100%">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextFieldsWrapper>
                    <CommonTextField
                      name="surname"
                      label="Фамилия"
                      onBlur={handleBlur}
                      value={values.surname}
                      onChange={handleChange}
                      helperText={touched.surname && errors.surname}
                      error={Boolean(errors.surname && touched.surname)}
                    />
                    <CommonTextField
                      name="name"
                      label="Имя"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                      error={Boolean(errors.name && touched.name)}
                    />
                    <CommonTextField
                      name="secondname"
                      label="Отчество"
                      onBlur={handleBlur}
                      value={values.secondame}
                      onChange={handleChange}
                      helperText={touched.secondname && errors.secondname}
                      error={Boolean(errors.secondname && touched.secondname)}
                    />
                    <CommonTextField
                      name="email"
                      label="E-mail"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Пароль"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                    />
                  </TextFieldsWrapper>

                  <LoadingButton
                    type="submit"
                    loading={loading}
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2, mt: 2 }}
                  >
                    Зарегистрироваться
                  </LoadingButton>
                  <Paragraph
                    fontSize={13}
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Нажимая кнопку, соглашаюсь
                    <NavLink
                      to="/404"
                      style={{
                        color: theme.palette.primary.main,
                        marginLeft: 5,
                      }}
                    >
                      с условиями обработки данных
                    </NavLink>
                  </Paragraph>
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </LoginRegisterLayout>
  );
};

export default JwtRegister;
