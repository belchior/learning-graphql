import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
  palette: {
    action: {
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgb(85, 85, 85)',
    primary: {
      main: '#42a5f5',
    },
    text: {
      primary: 'rgb(255, 255, 255)',
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
