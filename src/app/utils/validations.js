import * as Yup from "yup";

const emailField = Yup.string()
  .email("Укажите валидный адрес эл. почты")
  .required("Поле обязательно к заполнению!");

const phoneField = Yup.string()
  .min(2, "Минимальная длина 2 символа")
  .matches(/^\+\d{11}$/, "Неверный формат номера.")
  .required("Поле обязательно к заполнению!");

export const userDataValidationSchema = Yup.object().shape({
  surname: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  name: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  secondname: Yup.string().min(2, "Минимальная длина 2 символа"),
  phone: phoneField,
  password: Yup.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .required("Поле обязательно к заполнению!"),
  email: emailField,
});

export const departmentValidationSchema = Yup.object().shape({
  email: emailField,
  phone: phoneField,
  name: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  description: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  address: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
});

export const departmentApplicationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(10, "Минимальная длина 10 символов")
    .required("Поле обязательно к заполнению!"),
  description: Yup.string()
    .min(10, "Минимальная длина 10 символов")
    .required("Поле обязательно к заполнению!"),
  test: Yup.string()
    .min(10, "Минимальная длина 10 символов")
    .required("Поле обязательно к заполнению!"),
});
