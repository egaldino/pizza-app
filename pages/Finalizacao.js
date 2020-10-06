import React, {useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import globalStyle from '../styles';
import {Ranking, PrimaryButton} from '../components/';

export default ({navigation, route}) => {
  const {listaParticipantes} = route.params;

  const [ganhador] = useState(listaParticipantes[0]);

  return (
    <View style={mainContainer}>
      <View style={styles.ganhadorContainer}>
        <Image
          source={require('../assets/images/winner.png')}
          style={styles.winnerIcon}
        />
        <Text style={styles.nomeGanhador}> {ganhador.nome}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text>
          Você ganhou a competição, comendo {ganhador.quantidade} fatias de
          pizza!!
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.rankingContainer}>
        <Ranking listaParticipantes={listaParticipantes} />
      </ScrollView>

      <View style={styles.novaPartidaContainer}>
        <PrimaryButton
          nome="Nova Partida"
          onPress={() => navigation.replace('Home')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  winnerIcon: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
  },
  ganhadorContainer: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  rankingContainer: {
    margin: 10,
  },
  textContainer: {},
  nomeGanhador: {
    position: 'absolute',
    bottom: 20,
  },
  novaPartidaContainer: {
    width: 300,
  },
});

const mainContainer = StyleSheet.compose(
  globalStyle.appBackground,
  styles.container,
);
