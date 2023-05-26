import { Avatar } from "@mui/material";
import { getUserInitials } from "../utils/utils";

export default function LetterAvatar({ name, surname, ...props }) {
  return <Avatar {...props}>{getUserInitials(name, surname)}</Avatar>;
}
