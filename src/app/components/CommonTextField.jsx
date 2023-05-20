import { TextField } from "@mui/material";

/**
 *
 * @param {import("@mui/material").TextFieldProps} param0
 * @returns {JSX.Element}
 */
export const CommonTextField = ({ ...props }) => {
  return (
    <TextField
      fullWidth
      size="small"
      type="text"
      variant="outlined"
      {...props}
    />
  );
};
