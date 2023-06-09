import { CardContent, Grid, Stack } from "@mui/material";
import { UserCard } from "../components/UserCard";
import useError from "../hooks/useError";
import { useSnackbar } from "../contexts/snackbarContext";
import { apiService } from "../services/useApiService";
import { useEffect, useState } from "react";
import { CommonCard } from "../components/CommonCard";
import { CommonDataForm } from "../components/CommonDataForm";
import { InformationGroup } from "../components/InformationGroup";
import { CommonTextField } from "../components/CommonTextField";
import PhoneNumberInput from "../components/PhoneNumberInput";
import { departmentValidationSchema } from "../utils/validations";
import { pickAll } from "ramda";
import Loading from "../components/Loading";

const DepartmentView = () => {
  const { showSnackbar } = useSnackbar();
  const { setError } = useError();
  const [isDepartmentCreated, setIsDepartmentCreated] = useState(null);
  const [department, setDepartment] = useState(null);

  const getDepartment = async () => {
    try {
      const { data } = await apiService.getMyDepartment();
      setDepartment(data);
      setIsDepartmentCreated(true);
    } catch (error) {
      console.log(error)
      if (error.status === 404) {
        setIsDepartmentCreated(false);
      } else {
        setError(error);
      }
    }
  };

  const handleSubmit = async (newDepartment) => {
    try {
      let data;
      if (isDepartmentCreated) {
        data = (await apiService.updateDepartment(newDepartment)).data;
      } else {
        data = (await apiService.createDepartment(newDepartment)).data;
        setIsDepartmentCreated(true);
      }
      setDepartment(data);
      showSnackbar(`Настройки для "${newDepartment.name}" сохранены.`);
    } catch (error) {
      setError(error);
    }
  };

  const initialDepartment = pickAll(
    ["name", "description", "address", "phone", "email"],
    department || {}
  );

  useEffect(() => {
    getDepartment();
  }, []);

  if (!department && isDepartmentCreated === null) return <Loading />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid md={4} xs={12} item>
          <Stack spacing={2}>
            {isDepartmentCreated && (
              <UserCard
                name={department.name}
                title={department.address}
                email={department.email}
                phone={department.phone}
                photoUrl={"/assets/images/organizations/sport.svg"}
              ></UserCard>
            )}
          </Stack>
        </Grid>
        <Grid md={8} xs={12} item>
          <Stack spacing={2}>
            <CommonCard>
              <CardContent>
                <CommonDataForm
                  initialData={initialDepartment}
                  onSubmit={(values) => handleSubmit(values)}
                  validationSchema={departmentValidationSchema}
                >
                  {({ values, handleChange, handleBlur, touched, errors }) => (
                    <>
                      <InformationGroup title={"Основная информация"}>
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
                          rows={5}
                          onBlur={handleBlur}
                          value={values.description}
                          onChange={handleChange}
                          helperText={touched.description && errors.description}
                          error={Boolean(errors.description && touched.description)}
                        />
                        <CommonTextField
                          name="address"
                          label="Адрес"
                          variant="standard"
                          onBlur={handleBlur}
                          value={values.address}
                          onChange={handleChange}
                          helperText={touched.address && errors.address}
                          error={Boolean(errors.address && touched.address)}
                        />
                      </InformationGroup>
                      <InformationGroup title={"Контактная информация"}>
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
                        <PhoneNumberInput
                          onBlur={handleBlur}
                          value={values.phone}
                          onChange={handleChange}
                          helperText={touched.phone && errors.phone}
                          error={Boolean(errors.phone && touched.phone)}
                        />
                      </InformationGroup>
                    </>
                  )}
                </CommonDataForm>
              </CardContent>
            </CommonCard>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DepartmentView;
