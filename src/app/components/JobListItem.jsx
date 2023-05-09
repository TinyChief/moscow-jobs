import {
  Box,
  CardContent,
  Typography,
  Button,
  CardActions,
  Card,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function JobListItem({ data }) {
	const navigate = useNavigate()
	const handleViewFullJob = () => {
		navigate(`/jobs/${data.id}`)
	}
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Box display={"flex"}>
            <Box mr={'20px'}
              width={"70px"}
              height={"70px"}
              sx={{
                background: "center / contain",
                backgroundImage: `url(${data.preview})`,
              }}
            ></Box>
            <Stack flex={1}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h5" gutterBottom>
                  {data.title}
                </Typography>
                <Typography variant="body2">{data.company}</Typography>
              </Stack>
              <Typography color="text.secondary" component="div" mb={3}>
                {data.description}
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"row-reverse"}
                alignItems={"center"}
              >
                <Button size="small" color="secondary" variant="contained" onClick={handleViewFullJob}>
                  Подробнее
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
}
