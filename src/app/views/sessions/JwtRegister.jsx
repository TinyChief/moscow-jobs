import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, Stack, TextField } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Paragraph } from "../../components/Typography";
import useAuth from "../../hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginRegisterLayout from "../../layout/LoginRegisterLayout";
import { CommonTextField } from "../../components/CommonTextField";
import { TextFieldsWrapper } from "../../components/TextFieldsWrapper";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import useError from "../../hooks/useError";
import { useSnackbar } from "../../contexts/snackbarContext";
import { userDataValidationSchema } from "../../utils/validations";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

// inital login credentials
const initialValues = {
  surname: "Иванов",
  name: "Иван",
  secondname: "Иванович",
  email: "hello@world.ru",
  password: "examplepw",
  phone: "+79252502525",
};


const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setError } = useError();
  const { showSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      await register(values);
      showSnackbar(
        "Пользователь успешно зарегистрирован, войдите на платформу по указанным E-mail и паролю.",
        "success"
      );
      navigate("/session/signin");
      setLoading(false);
    } catch (e) {
      setError(e);
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
              validationSchema={userDataValidationSchema}
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
                      value={values.secondname}
                      onChange={handleChange}
                      helperText={touched.secondname && errors.secondname}
                      error={Boolean(errors.secondname && touched.secondname)}
                    />
                    <PhoneNumberInput
                      variant="outlined"
                      size="small"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(errors.phone && touched.phone)}
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
