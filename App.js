import React from 'react';
import { StyleSheet, Appearance} from 'react-native';
import { Provider as PaperProvider, useTheme,DarkTheme, DefaultTheme } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import CollectionScreen from './screens/CollectionScreen';
import SignupScreen from './screens/SignUpScreen';
import WishListScreen from './screens/WishListScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function TabNavi() {
  
  const theme = useTheme();
  
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerStyle: {backgroundColor: theme.colors.primary},
      tabBarStyle: {backgroundColor: theme.colors.primary},
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home';
        } else if (route.name === 'Collection') {
          iconName = focused ? 'th-list' : 'list';
        }
        else if (route.name === 'WishList'){
          iconName = 'star'
        }
        else if (route.name === 'Account') {
          iconName = focused ? 'user' : 'user';
        }
        
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'purple',
      tabBarInactiveTintColor: 'gray',
      
    })}>

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
      <Tab.Screen name="WishList" component={WishListScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

  let theme = DefaultTheme;
  const scheme = Appearance.getColorScheme();
  if (scheme === 'dark'){
    theme = DarkTheme
  }
  else{ 
    theme = DefaultTheme
  }
  console.log(Appearance.getColorScheme);

  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="TabNavi" component={TabNavi} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});