import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';

import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'


import Loading from './src/components/Loading'
//import SignUp from './src/components/SignUp'
import Login from './src/components/Login'
import Feed from './src/screens/Feed';
import Favorites from './src/screens/Favorites';
import UserProfile from './src/screens/UserProfile';
import Todos from './src/components/Todos';
import CreateAD from './src/components/CreateAD/CreateAD';
import MyCreatedAds from './src/screens/SubScreens/MyCreatedAds';
import DetailsScreen from './src/screens/SubScreens/DetailsScreen';
import UserInfo from './src/components/userRegistration/UserInfo';
import SignUp1 from './src/components/userRegistration/SignUp1';

const SignedOut = createStackNavigator({
  SignUp: SignUp1,
  Login: Login,
  UserInfo: UserInfo
});


const FeedScreen = createStackNavigator({
    Feed:
    {
      screen: Feed
    },
    CreateAD: {
      screen: CreateAD,
      navigationOptions:{
         tabBarVisible: false
      }
    },
    DetailsScreen: {screen: DetailsScreen}

});



const FavoritesScreen = createStackNavigator({
    Favorites: Favorites
});

const ProfileScreen = createStackNavigator({
    Profile: { screen: UserProfile, navigationOptions: {header: null}
  },
  MyCreatedAds: {screen: MyCreatedAds, navigationOptions: {title: 'Mine Opprettede Annonser', tabBarVisible: false}}
});


let Tabs = createBottomTabNavigator({
  Feed: {
    screen: FeedScreen
  },
  Favorites: {
    screen: FavoritesScreen
  },
  Profile: {
    screen: ProfileScreen
  },
});

// const SignedIn = createBottomTabNavigator({
//   Feed: Feed,
//   Favorites: Favorites,
//   Todos: Todos,
//   Profile: UserProfile,
//
//
// });

  export default createAppContainer (createSwitchNavigator ({
      Loading: Loading,
      ScreenView: Tabs,
      screenViewOut: SignedOut
    },
    {
      initialRouteName: 'Loading'
    }
));
