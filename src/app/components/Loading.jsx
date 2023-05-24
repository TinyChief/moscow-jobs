import { CircularProgress, Box, styled } from '@mui/material';

const StyledLoading = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: 'auto',
    height: '25px'
  },
  '& .circleProgress': {
    position: 'absolute',
    left: -9,
    right: 0,
    top: 'calc(50% - 25px)'
  }
});

const Loading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src="/assets/images/mguu-logo.jpg" alt="mguu-logo" />
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default Loading;
