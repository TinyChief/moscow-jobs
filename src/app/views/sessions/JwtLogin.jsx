import { LoadingButton } from "@mui/lab";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/material";
import { Paragraph } from "@/app/components/Typography";
import useAuth from "@/app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginRegisterLayout from "../../layout/LoginRegisterLayout";
import { CommonTextField } from "../../components/CommonTextField";
import { TextFieldsWrapper } from "../../components/TextFieldsWrapper";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

// inital login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .required("Поле обязательно к заполнению!"),
  email: Yup.string()
    .email("Укажите валидный адрес эл. почты")
    .required("Поле обязательно к заполнению!"),
});

const JwtLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/jobs");
    } catch (e) {
      console.log("login error", e);
      setLoading(false);
    }
  };

  return (
    <LoginRegisterLayout>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
            <img
              src="/assets/images/illustrations/dreamer.svg"
              width="100%"
              alt=""
            />
          </JustifyBox>
        </Grid>

        <Grid item sm={6} xs={12}>
          <ContentBox>
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
                      type="email"
                      name="email"
                      label="E-mail или логин"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <CommonTextField
                      name="password"
                      type="password"
                      label="Пароль"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />
                  </TextFieldsWrapper>

                  <LoadingButton
                    type="submit"
                    loading={loading}
                    variant="contained"
                    fullWidth
                    sx={{ my: 2 }}
                  >
                    Войти
                  </LoadingButton>

                  <NavLink to="/session/forgot-password">
                    Забыли пароль?
                  </NavLink>

                  {/* <Paragraph>
                    Ещё нет аккаунта?
                    <NavLink
                      to="/session/signup"
                      style={{
                        color: theme.palette.primary.main,
                        marginLeft: 5,
                      }}
                    >
                      Зарегистрироваться
                    </NavLink>
                  </Paragraph> */}
                </form>
              )}
            </Formik>
          </ContentBox>
        </Grid>
      </Grid>
    </LoginRegisterLayout>
  );
};

export default JwtLogin;
