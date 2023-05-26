import * as Yup from "yup";
// form field validation schema
export const userDataValidationSchema = Yup.object().shape({
  surname: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  name: Yup.string()
    .min(2, "Минимальная длина 2 символа")
    .required("Поле обязательно к заполнению!"),
  secondname: Yup.string().min(2, "Минимальная длина 2 символа"),
  phone: Yup.string()
    .min(2, "Минимальная длина 2 символа")
	.matches(/^\+\d{11}$/, "Неверный формат номера.")
    .required("Поле обязательно к заполнению!"),
  password: Yup.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .required("Поле обязательно к заполнению!"),
  email: Yup.string()
    .email("Укажите валидный адрес эл. почты")
    .required("Поле обязательно к заполнению!"),
});
