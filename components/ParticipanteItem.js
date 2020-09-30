import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// import { Container } from './styles';

const ParticipanteItem = ({item, index}) => {
  return (
    <View style={style.container}>
      <Text key={`${item}${index}`}>{item}</Text>
    </View>
  );
};

function corAleatoria() {
  const cores = ['#c2f0cf', '#c1f0f5', '#f5dcf7'];
  const indiceAleatorio = Math.floor(Math.random() * cores.length);
  return cores[indiceAleatorio];
}

const style = StyleSheet.create({
  container: {
    width: 330,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
});

export default ParticipanteItem;
