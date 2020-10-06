import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../colors.json';

export default ({listaParticipantes}) => {
  return (
    <View style={styles.rankingContainer}>
      <Text style={styles.title}>Ranking</Text>
      {listaParticipantes.map((participante) => (
        <RankingItem key={`${participante.id}`} participante={participante} />
      ))}
    </View>
  );
};

const RankingItem = ({participante}) => (
  <View style={styles.rankingItemContaner}>
    <Text>{participante.nome}</Text>
    <Text style={styles.quantidade}>{participante.quantidade}</Text>
  </View>
);

const styles = StyleSheet.create({
  rankingContainer: {
    borderColor: colors.primariaDark,
    borderWidth: 1,
    width: 300,
    padding: 15,
    paddingTop: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  rankingItemContaner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    borderBottomWidth: 0.5,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 4,
  },
  quantidade: {
    fontWeight: 'bold',
    color: colors.primariaDark,
  },
});
