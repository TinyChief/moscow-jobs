import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MenuItem, Select } from "@mui/material";
import { contries } from "../utils/countries";

const RF = "РФ";
export default function CitizenInput({ ...props }) {
  const [radioValue, setRadioValue] = React.useState(
    props.value === RF ? RF : "other"
  );

  const [citizenValue, setCitizenValue] = React.useState(props.value || "");

  const handleChangeRadio = (event) => {
    const selectedRadio = event.target.value;
    setRadioValue(selectedRadio);
    if (selectedRadio === RF) {
      setCitizenValue(RF);
      props.onChange({
        target: { value: RF, name: "citizen" },
      });
    }
  };

  const handleOtherCitizenSelect = (event) => {
    const selectedOtherCitizen = event.target.value;
    setCitizenValue(selectedOtherCitizen);
    props.onChange({
      target: { value: selectedOtherCitizen, name: "citizen" },
    });
  };

  return (
    <FormControl fullWidth>
      <FormLabel id="citizen-input">Гражданство</FormLabel>
      <RadioGroup
        aria-labelledby="citizen-input"
        name="citizen"
        onChange={handleChangeRadio}
        value={radioValue}
        sx={{ flexDirection: "row", "> *": { marginRight: 6 } }}
      >
        <FormControlLabel value="РФ" control={<Radio />} label="РФ" />
        <FormControlLabel value="other" control={<Radio />} label="Другое" />
        <Select
          disabled={radioValue !== "other"}
          value={citizenValue}
          style={{ marginTop: 0 }}
          variant="standard"
          onChange={handleOtherCitizenSelect}
          inputProps={{ "aria-label": "Выберете другое гражданство" }}
          sx={{ width: "200px" }}
        >
          {contries.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </RadioGroup>
    </FormControl>
  );
}
