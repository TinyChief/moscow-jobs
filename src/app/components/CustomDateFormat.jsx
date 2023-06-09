import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function CustomDateFormat({ ...props }) {
  const [value, setValue] = React.useState(props.value ? dayjs(props.value) : undefined);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    props.onChange({ target: { value: newValue ? newValue.format("YYYY-MM-DD") : null, name: 'birthday' } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DateField
        name="birthday"
        label="Дата рождения"
        variant="standard"
        value={value}
        onChange={handleDateChange}
        format="DD.MM.YYYY"
        helperText={props.helperText}
        error={props.error}
      />
    </LocalizationProvider>
  );
}
