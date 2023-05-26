import { Avatar, Box, CardContent, Divider, Typography } from "@mui/material";
import { H3, Paragraph, Span } from "./Typography";
import { CommonCard } from "./CommonCard";
import { grey } from "@mui/material/colors";
import LetterAvatar from "./LetterAvatar";

export const UserCard = ({ name, email, title, surname }) => {
  return (
    <CommonCard>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "240px",
        }}
      >
        <LetterAvatar
          sx={{
            width: "100px",
            height: "100px",
            marginX: "auto",
            fontSize: 40
          }}
          name={name}
          surname={surname}
        />
        <H3
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          {name} {surname}
        </H3>
        <Span
          sx={{
            fontSize: "14px",
            color: grey[500],
            fontWeight: "bold",
          }}
        >
          {email}
        </Span>
      </CardContent>
      <Divider light />
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "rgba(199 199 199 / 50%)",
        }}
      >
        <Paragraph sx={{ textTransform: "uppercase", fontSize: "12px" }}>
          {title}
        </Paragraph>
      </Box>
    </CommonCard>
  );
};
