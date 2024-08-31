import React from 'react';
import {Typography} from '../../config/typography';
import {StyleSheet, Text} from 'react-native';
import {BaseColor} from '../../config/theme';

export default function Index(props) {
  const {
    //props style
    header,
    heading,
    heading2,
    title,
    title1,
    title2,
    title3,
    title4,
    small,
    headline,
    body1,
    body2,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    // props font
    // thin,
    // ultraLight,
    // light,
    regular,
    medium,
    // semibold,
    bold,
    // heavy,
    // black,
    //custom color
    whiteColor,
    blackColor,
    appPrimary,
    appLight,
    secondaryColor,
    whiteBackground,
    error,
    textinput,
    textGreyDark,
    //extra
    numberOfLines,
    textAlign,
    appPrimaryLight,
    netural,
    //custom
    style,
    //children
    children,
    iserror,
  } = props;

  // const { colors } = useTheme();
  // const font = useFont();

  let textStyle = StyleSheet.flatten([
    header && Typography.header,
    title && Typography.title,
    title1 && Typography.title1,
    title2 && Typography.title2,
    title3 && Typography.title3,
    title4 && Typography.title4,
    heading && Typography.heading,
    heading2 && Typography.heading2,
    small && Typography.small,
    headline && Typography.headline,
    body1 && Typography.body1,
    body2 && Typography.body2,
    subhead && Typography.subhead,
    footnote && Typography.footnote,
    caption1 && Typography.caption1,
    caption2 && Typography.caption2,
    overline && Typography.overline,

    //custom for font
    // thin && {fontWeight: FontWeight.thin},
    // ultraLight && {fontWeight: FontWeight.ultraLight},
    // light && {fontWeight: FontWeight.light},
    // regular && {fontWeight: FontWeight.regular},
    // medium && {fontWeight: FontWeight.medium},
    // semibold && {fontWeight: FontWeight.semibold},
    // bold && {fontWeight: FontWeight.bold},
    // heavy && {fontWeight: FontWeight.heavy},
    // black && {fontWeight: FontWeight.black},
    // default color
    {color: BaseColor.blackColor},
    //custom for color
    whiteColor && {color: BaseColor.whiteColor},
    blackColor && {color: BaseColor.blackColor},
    appPrimary && {color: BaseColor.appPrimary},
    appLight && {color: BaseColor.appLight},
    whiteBackground && {color: BaseColor.whiteBackground},
    secondaryColor && {color: BaseColor.secondaryColor},
    error && {color: BaseColor.error},
    textinput && {color: BaseColor.textinput},
    textGreyDark && {color: BaseColor.textGreyDark},
    appPrimaryLight && {color: BaseColor.appPrimaryLight},
    netural && {color:BaseColor.netural},
    //Lato Fonts
    // thin && {fontFamily: 'DMSans-Regular'},
    // light && {fontFamily: 'DMSans-Regular'},
    // regular && {fontFamily: 'DMSans-Regular'},
    // bold && {fontFamily: 'DMSans-Bold'},
    // black && {fontFamily: 'DMSans-BoldItalic'},
    // ultraLight && {fontFamily: 'DMSans-Italic'},
    // medium && {fontFamily: 'DMSans-Medium'},
    // heavy && {fontFamily: 'DMSans-Bold'},
    // semibold && {fontFamily: 'DMSans-MediumItalic'},
    bold && {fontFamily: 'DMSans-Bold'},
    medium && {fontFamily: 'DMSans-Medium'},
    regular && {fontFamily: 'DMSans-Regular'},

    {
      textAlign,
    },
    style && style,
  ]);

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
