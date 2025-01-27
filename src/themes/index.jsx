import { createTheme } from '@mui/material/styles';

export function theme(customization) {
  // Define colors directly here
  const colors = {
    primary: '#3f51b5',
    primaryLight: '#7986cb',
    primaryDark: '#303f9f',
    secondary: '#f50057',
    secondaryLight: '#ff4081',
    secondaryDark: '#c51162',
    error: '#f44336',
    errorLight: '#e57373',
    errorDark: '#d32f2f',
    warning: '#ff9800',
    warningLight: '#ffb74d',
    warningDark: '#f57c00',
    info: '#2196f3',
    infoLight: '#64b5f6',
    infoDark: '#1976d2',
    success: '#4caf50',
    successLight: '#81c784',
    successDark: '#388e3c',
    grey300: '#e0e0e0',
    grey400: '#bdbdbd',
    bg100: '#f5f5f5',
    paper: '#ffffff',
    background: '#fafafa',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textDark: '#000000',
    textHint: '#9e9e9e',
    paperDark: '#121212',
    menuHover: '#f5f5f5',
  };

  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1266,
        xl: 1440,
      },
    },
    direction: 'ltr',
    palette: {
      mode: 'light',
      common: {
        black: colors.paperDark,
      },
      primary: {
        light: colors.primaryLight,
        main: colors.primary,
        dark: colors.primaryDark,
      },
      secondary: {
        light: colors.secondaryLight,
        main: colors.secondary,
        dark: colors.secondaryDark,
      },
      error: {
        light: colors.errorLight,
        main: colors.error,
        dark: colors.errorDark,
      },
      warning: {
        light: colors.warningLight,
        main: colors.warning,
        dark: colors.warningDark,
      },
      info: {
        light: colors.infoLight,
        main: colors.info,
        dark: colors.infoDark,
      },
      success: {
        light: colors.successLight,
        main: colors.success,
        dark: colors.successDark,
      },
      grey: {
        300: colors.grey300,
        400: colors.grey400,
      },
      bg: {
        100: colors.bg100,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
        dark: colors.textDark,
        hint: colors.textHint,
      },
      background: {
        paper: colors.paper,
        default: colors.background,
      },
    },
    typography: {
      fontFamily: `'Poppins', sans-serif`,
      h6: { fontWeight: 600, color: colors.textSecondary, fontSize: '0.875rem' },
      h5: { fontWeight: 600, color: colors.textSecondary, fontSize: '1.125rem' },
      h4: { fontWeight: 500, color: colors.textSecondary, fontSize: '1.25rem' },
      h3: { fontWeight: 600, color: colors.textDark, fontSize: '1.5rem' },
      h2: { fontWeight: 600, color: colors.textDark, fontSize: '2rem' },
      h1: { fontWeight: 600, color: colors.textDark, fontSize: '2.2rem' },
      subtitle1: {
        fontWeight: 500,
        color: colors.textSecondary,
        fontSize: '0.875rem',
        lineHeight: '1.643em',
      },
      subtitle2: { fontWeight: 400, fontSize: '0.8125rem' },
      caption: { fontWeight: 500, color: colors.textHint, fontSize: '0.68rem' },
      body1: { fontWeight: 400, fontSize: '0.875rem', lineHeight: '1.643em' },
      body2: { fontWeight: 400, lineHeight: '1.643em', letterSpacing: '0em' },
      menuCaption: {
        fontSize: '0.6875rem',
        fontWeight: 600,
        color: colors.primary,
        padding: '5px 15px 5px',
        textTransform: 'uppercase',
        marginTop: '10px',
      },
      subMenuCaption: {
        fontSize: '0.6875rem',
        fontWeight: 400,
        color: colors.textPrimary,
        textTransform: 'capitalize',
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: { overflow: 'hidden' },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: { fontSize: '1.3rem' },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: colors.textPrimary,
            '&.Mui-selected': {
              color: colors.primary,
              backgroundColor: colors.menuHover,
              '& .MuiListItemIcon-root': { color: colors.primary },
            },
            '&:hover': {
              backgroundColor: colors.menuHover,
              color: colors.primary,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow: '0 4px 6px -2px rgb(0 0 0 / 12%), 0 2px 2px -1px rgb(0 0 0 / 5%)',
          },
          rounded: { borderRadius: '10px' },
        },
      },
    },
  });
}

export default theme;
