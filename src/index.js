import React, { useEffect } from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { store, persistor } from './Redux/index';
import { PersistGate } from 'redux-persist/integration/react';
export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Routes />
      {/* </PersistGate> */}
    </Provider>
  );
}
