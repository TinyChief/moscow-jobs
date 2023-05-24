import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "dayjs/locale/ru";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function CustomDateFormat({ ...props }) {
  const [value, setValue] = React.useState(props.value ? dayjs(props.value) : '');

  const handleDateChange = (newValue) => {
    setValue(newValue);
    console.log(newValue.format("YYYY-MM-DD"));
    props.onChange({ target: { value: newValue.format("YYYY-MM-DD"), name: 'birthday' } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DateField
        fullWidth
        name="birthday"
        label="День рождения"
        variant="standard"
        value={value}
        onChange={handleDateChange}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}
