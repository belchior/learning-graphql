import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#42a5f5',
    },
  },
  shape: {
    borderRadius: '3px',
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '2rem',
        fontWeight: 400,
        lineHeight: '3rem'
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: '2rem'
      },
    },
  }
});
