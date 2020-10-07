import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RodizioEmAndamento, Historico} from './';

const Tab = createMaterialTopTabNavigator();

const Home = () => (
  <Tab.Navigator initialRouteName="RodizioEmAndamento">
    <Tab.Screen
      name="RodizioEmAndamento"
      component={RodizioEmAndamento}
      options={{title: 'Rodízio'}}
    />
    <Tab.Screen
      name="Historico"
      component={Historico}
      options={{title: 'Histórico'}}
    />
  </Tab.Navigator>
);

export default Home;
