import { CardContent, Grid } from "@mui/material";
import useError from "../hooks/useError";
import { useSnackbar } from "../contexts/snackbarContext";
import { apiService } from "../services/useApiService";
import { CommonCard } from "../components/CommonCard";
import { CommonDataForm } from "../components/CommonDataForm";
import { InformationGroup } from "../components/InformationGroup";
import { CommonTextField } from "../components/CommonTextField";
import { departmentApplicationValidationSchema } from "../utils/validations";
import { useLocation } from "react-router-dom";
import { H2 } from "../components/Typography";

const DepartmentApplicationCreateView = () => {
  const { showSnackbar } = useSnackbar();
  const { setError } = useError();
  const location = useLocation();

  const initialApplication = (location.state && location.state.application) || {
    name: "",
    description: "",
    test: "",
  };

  const handleSubmit = async (newApplication) => {
    try {
      if (newApplication.id) {
        const { data } = await apiService.editDepartmentApplication(
          newApplication
        );
      } else {
        const { data } = await apiService.createDepartmentApplication(
          newApplication
        );
      }
      showSnackbar(
        `Заявка "${newApplication.name}" сохранена. Она будет опубликована после проверки куратором.`
      );
    } catch (error) {
      if (error.status === 404) {
        setError(
          new Error("Сперва необходимо заполнить информацию об организации!")
        );
      } else {
        setError(error);
      }
    }
  };

  return (
    <>
      <H2 marginBottom={2}>
        {initialApplication.id ? "Редактирование заявки" : "Создание заявки"}
      </H2>
      <Grid container>
        <Grid xs={12} item>
          <CommonCard>
            <CardContent>
              <CommonDataForm
                initialData={initialApplication}
                onSubmit={handleSubmit}
                validationSchema={departmentApplicationValidationSchema}
                resetButtonText={"Отчистить"}
              >
                {({ values, handleChange, handleBlur, touched, errors }) => (
                  <>
                    <InformationGroup>
                      <CommonTextField
                        name="name"
                        label="Название"
                        variant="standard"
                        onBlur={handleBlur}
                        value={values.name}
                        onChange={handleChange}
                        helperText={touched.name && errors.name}
                        error={Boolean(errors.name && touched.name)}
                      />
                      <CommonTextField
                        name="description"
                        label="Описание"
                        variant="standard"
                        multiline
                        rows={12}
                        onBlur={handleBlur}
                        value={values.description}
                        onChange={handleChange}
                        helperText={touched.description && errors.description}
                        error={Boolean(
                          errors.description && touched.description
                        )}
                      />
                      <CommonTextField
                        name="test"
                        label="Тестовое задание"
                        variant="standard"
                        multiline
                        rows={12}
                        onBlur={handleBlur}
                        value={values.test}
                        onChange={handleChange}
                        helperText={touched.test && errors.test}
                        error={Boolean(errors.test && touched.test)}
                      />
                    </InformationGroup>
                  </>
                )}
              </CommonDataForm>
            </CardContent>
          </CommonCard>
        </Grid>
      </Grid>
    </>
  );
};

export default DepartmentApplicationCreateView;
