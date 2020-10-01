import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

import colors from '../colors.json';

// import { Container } from './styles';

const ParticipanteItem = ({
  item,
  index,
  subtrairQuantidade,
  somarQuantidade,
  children,
}) => {
  return (
    <View style={{...style.container, borderColor: item.borderColor}}>
      <TouchableHighlight
        style={style.buttonChangeQuantidade}
        underlayColor={colors.alterarQuantidadeUnderlay}
        onPress={() => subtrairQuantidade()}>
        <Text>-</Text>
      </TouchableHighlight>
      <Text key={`${item}${index}`}>
        {item.nome} ({item.quantidade})
      </Text>
      <TouchableHighlight
        style={style.buttonChangeQuantidade}
        underlayColor={colors.alterarQuantidadeUnderlay}
        onPress={() => somarQuantidade()}>
        <Text>+</Text>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: 330,
    height: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.secundaria,
  },
  buttonChangeQuantidade: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 50,
  },
});

export default ParticipanteItem;
