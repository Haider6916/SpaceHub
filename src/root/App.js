
import React  from 'react';
import Navigator from '../navigation/navigator';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from '../redux/store';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
  <Navigator />
    </Provider>

  );
};

export default App;





