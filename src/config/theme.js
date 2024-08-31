/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  //app
  appPrimary: '#8D55A2',
  appLight: 'rgba(159, 157, 158, 1)',
  secondaryColor: 'rgba(125, 123, 124, 1)',
  whiteBackground: '#fff',
  error: 'rgba(203, 44, 23, 1)',
  textinput: 'rgba(245, 246, 244, 1)',
  textGreyDark: 'rgba(233, 234, 233, 1)',
  appPrimaryLight:'#EEE5F1',
  netural:'rgba(86, 85, 86, 1)',
};

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  return BaseColor;
};
