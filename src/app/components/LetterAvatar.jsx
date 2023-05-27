import { Avatar } from "@mui/material";
import { getUserInitials } from "../utils/utils";

/**
 * 
 * @param {{name: string, surname: string} & import("@mui/material").BoxProps} param0 
 * @returns 
 */
export default function LetterAvatar({ name, surname, ...props }) {
  return <Avatar {...props}>{getUserInitials(name, surname)}</Avatar>;
}
