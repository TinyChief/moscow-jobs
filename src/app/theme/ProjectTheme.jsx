import { ThemeProvider, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import {components} from './components'
import { themeColors } from './themeColors';

const CURRENT_THEME = 'slateDark1'

const whiteBlue = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  // ...themeColors[CURRENT_THEME],

  typography: {
    fontSize: 14,
    body1: { fontSize: '14px' },
  },

  status: { danger: red[500] },
  components: { ...components },
})

const ProjectTheme = ({ children }) => {
  let activeTheme = whiteBlue

  return (
    <ThemeProvider theme={activeTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ProjectTheme;
