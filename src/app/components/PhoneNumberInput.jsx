import { Box, TextField } from "@mui/material";
import * as React from "react";
import { IMaskInput } from "react-imask";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="{+7} (000) 000-00-00"
      // unmask={true}
      inputRef={ref}
      onAccept={(value, mask) =>
        onChange({ target: { name: props.name, value: mask.unmaskedValue } })
      }
      onChange={() => ({})}
      // overwrite
    />
  );
});

/**
 *
 * @param {import("@mui/material").TextFieldProps} param0
 * @returns
 */
export default function PhoneNumberInput({ ...props }) {
  return (
    <TextField
      fullWidth
      variant="standard"
      label="Номер телефона"
      name="phone"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: TextMaskCustom,
      }}
      {...props}
    />
  );
}
