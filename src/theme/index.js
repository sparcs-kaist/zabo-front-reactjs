import theme from 'styled-theming';

export default {
  mode: 'light',
};
// define background colours for `mode` theme
export const backgroundColor = theme ('mode', {
  light: '#fafafa',
  dark: '#222',
});

// define text color for `mode` theme
export const textColor = theme ('mode', {
  light: '#000',
  dark: '#fff',
});

export const mainColor = theme ('mode', {
  light: '#1976d2',
  dark: '#12397d',
});
