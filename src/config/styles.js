import {StyleSheet} from 'react-native';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 18,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth:1
  },
  safeAreaView: {
    flex: 1,
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
