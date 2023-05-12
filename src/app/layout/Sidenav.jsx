import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { styled, useMediaQuery } from '@mui/material';
import VerticalNav from '../components/VerticalNav/VerticalNav';
import { navigations } from '@/app/navigations';
import { useTheme } from '@emotion/react';
import useSettings from '../hooks/useSettings';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative'
}));


const Sidenav = ({ children }) => {
  return (
    <Fragment>


    </Fragment>
  );
};

export default Sidenav;
