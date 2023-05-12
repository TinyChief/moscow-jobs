import { Box, Container } from "@mui/material";
import {H3} from '../components/Typography'
import { NavLink } from "react-router-dom";

const Welcome = () => {
  return (
	<Container sx={{
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	}}>
		<NavLink to={'/jobs'}>
			<Box
				src="/assets/images/home-sweet-home-relaxed.gif"
				component={'img'}
				maxWidth={"100%"}
			/>
		</NavLink>
		<Box sx={{marginTop: '10px'}}>
			<H3> Клик на гифку, чтобы начать </H3>
		</Box>

	</Container>
  )
};

export default Welcome;
