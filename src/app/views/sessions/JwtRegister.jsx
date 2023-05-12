import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, Stack, TextField } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Paragraph } from "../../components/Typography";
import useAuth from "@/app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  // background: '#1A2038',
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// inital login credentials
const initialValues = {
  email: "",
  password: "",
  username: "",
  remember: true,
};

const TextFieldsWrapper = styled(Stack)(() => ({
  "> div": {
    height: "60px",
    "margin-bottom": "5px",
    ":last-child": {
      "margin-bottom": 0
    }
  }
}))

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
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
    <JWTRegister>
      <Card className="card">
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
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="username"
                        label="Имя пользователя"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.username}
                        onChange={handleChange}
                        helperText={touched.username && errors.username}
                        error={Boolean(errors.username && touched.username)}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        type="email"
                        name="email"
                        label="Логин"
                        variant="outlined"
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

                    {/* <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        Нажимая кнопку, соглашаюсь с условиями обработки данных
                      </Paragraph>
                    </FlexBox> */}

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

                    <Paragraph>
                      Уже есть аккаунт?
                      <NavLink
                        to="/session/signin"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Войти
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
