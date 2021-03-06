/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { useResetRecoilState, useRecoilValue } from 'recoil'
import { isAuthenticatedState, userState } from '../recoil/auth'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MyListTabScreen from '../screens/MyListTabScreen';
import AuthScreen from '../screens/AuthScreen';
import { useRootStore } from '../store';
import RegisterScreen from '../screens/RegisterScreen';
import ReservationModalScreen from '../screens/ReservationModalScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [rootState] = useRootStore()

  return (
    <Stack.Navigator>
      {!rootState.user ? (
        <>
          <Stack.Screen
            name='Auth'
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Root'
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='NotFound'
            component={NotFoundScreen}
            options={{ title: 'Oops!' }}
          />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name='Modal' component={ModalScreen} />
            <Stack.Screen name='Reservation' component={ReservationModalScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [rootState, setRootState] = useRootStore()

  const onLogoutHandler = () => {
    setRootState({
      ...rootState,
      user: undefined,
    })
  }

  return (
    <BottomTab.Navigator
      initialRouteName='ParkingMap'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='ParkingMap'
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'ParkingMap'>) => ({
          title: 'Parking',
          tabBarIcon: ({ color }) => <TabBarIcon name='car' color={color} />,
          headerRight: () => (
            <Pressable
              onPress={onLogoutHandler}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name='arrow-circle-o-up'
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='MyParking'
        component={MyListTabScreen}
        options={{
          title: 'My Parking spots',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
