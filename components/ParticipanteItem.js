import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

import colors from '../colors.json';

// import { Container } from './styles';
const ParticipanteItem = ({
  item,
  index,
  subtrairQuantidade,
  somarQuantidade,
  removerParticipante,
}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.appBackground}
      style={style.containerTouchable}
      onLongPress={() => removerParticipante()}>
      <View style={{...style.container, borderColor: item.borderColor}}>
        <TouchableHighlight
          style={style.buttonChangeQuantidade}
          underlayColor={colors.cinzaClaro}
          onPress={() => subtrairQuantidade()}>
          <Text>-</Text>
        </TouchableHighlight>
        <Text key={`${item}${index}`}>
          {item.nome} ({item.quantidade})
        </Text>
        <TouchableHighlight
          style={style.buttonChangeQuantidade}
          underlayColor={colors.cinzaClaro}
          onPress={() => somarQuantidade()}>
          <Text>+</Text>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
    flexDirection: 'row',
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 5,
    borderColor: colors.secundaria,
    width: 330,
  },
  containerTouchable: {
    padding: 0,
    borderRadius: 5,
  },
  buttonChangeQuantidade: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 50,
  },
});

export default ParticipanteItem;
