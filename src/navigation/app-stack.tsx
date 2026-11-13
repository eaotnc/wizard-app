import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InsuranceApplicationScreen from '../screens/insurance-application/InsuranceApplicationScreen';
import {ScreenNames} from './screen-names';

export type RootStackParamList = {
  [ScreenNames.InsuranceApplication]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.InsuranceApplication}
        component={InsuranceApplicationScreen}
      />
    </Stack.Navigator>
  );
}
