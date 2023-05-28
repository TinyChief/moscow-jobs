import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid } from "@mui/material";
import { Formik } from "formik";
import React from "react";

/**
 *
 * @param {{onSubmit: import("formik").FormikConfig['onSubmit']}} param0
 * @returns
 */
export function CommonDataForm({
  initialData,
  onSubmit,
  validationSchema,
  resetButtonText,
  submitButtonText,
  children,
}) {
  return (
    <Box>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialData}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          touched,
          errors,
          dirty,
        }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container spacing={4} textAlign={"left"}>
              <Grid item xs={12} textAlign={"end"}>
                <Box mb={2}>
                  <LoadingButton
                    type="reset"
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                    color="error"
                    disabled={!dirty}
                  >
                    {resetButtonText || "Отменить изменения"}
                  </LoadingButton>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    disabled={!dirty || isSubmitting}
                  >
                    {submitButtonText || "Сохранить"}
                  </LoadingButton>
                </Box>

                <Divider />
              </Grid>
              {React.createElement(children, {
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
              })}
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}
