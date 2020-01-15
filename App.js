import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/BlogContext';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Blog'
    }
  }
);

const App = createAppContainer(navigator);

const theme ={
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#263238',
    accent: 'yellow',
  }
}

const Main = () => {
  return <Provider>
    <PaperProvider theme={theme}>
      <App/>
    </PaperProvider>
  </Provider>
}

export default Main;
