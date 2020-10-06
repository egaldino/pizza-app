import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

import colors from '../colors.json';

export default ({nome, onPress}) => (
  <TouchableHighlight
    style={styles.button}
    underlayColor={colors.secundaria}
    onPress={() => onPress()}>
    <Text style={styles.buttonText}>{nome}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginHorizontal: 10,
    backgroundColor: colors.primaria,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 15,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
  },
});
