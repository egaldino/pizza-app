import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  View,
  Alert,
  StatusBar,
} from 'react-native';
import ParticipanteItem from '../components/ParticipanteItem';

import colors from '../colors.json';

const corAleatoria = () => {
  const cores = colors.participantes;
  const indiceAleatorio = Math.floor(Math.random() * cores.length);
  return cores[indiceAleatorio];
};

const Home = () => {
  const [listaParticipantes, setListaParticipantes] = useState([]);
  const [novoParticipante, setNovoParticipante] = useState();
  const [ultimoIdGerado, setUltimoIdGerado] = useState(0);

  const salvarListaOrdenada = (listaDesordenada) => {
    const listaOrdenada = [...listaDesordenada];
    listaOrdenada.sort(function (a, b) {
      if (a.quantidade < b.quantidade) {
        return 1;
      }
      if (a.quantidade > b.quantidade) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    setListaParticipantes(listaOrdenada);
  };

  const addParticipante = (nome) => {
    if (!nome || nome.length === 0) {
      return;
    }

    const proximoId = ultimoIdGerado + 1;

    salvarListaOrdenada([
      ...listaParticipantes,
      {
        id: proximoId,
        nome,
        quantidade: 0,
        borderColor: corAleatoria(),
      },
    ]);
    setNovoParticipante('');
    setUltimoIdGerado(proximoId);
  };

  const subtrairQuantidade = (item) => {
    const listaAtualizada = listaParticipantes.map((participante) => {
      if (participante.id === item.id) {
        return {
          ...participante,
          quantidade: item.quantidade === 0 ? 0 : item.quantidade - 1,
        };
      }
      return participante;
    });
    salvarListaOrdenada(listaAtualizada);
  };

  const somarQuantidade = (item) => {
    const listaAtualizada = listaParticipantes.map((participante) => {
      if (participante.id === item.id) {
        return {...participante, quantidade: item.quantidade + 1};
      }
      return participante;
    });
    salvarListaOrdenada(listaAtualizada);
  };

  const questionarRemoverParticipante = (participanteParaRemover) => {
    Alert.alert(
      'Remover',
      `Deseja remover ${participanteParaRemover.nome}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => removerParticipante(participanteParaRemover),
        },
      ],
      {cancelable: false},
    );
  };

  const removerParticipante = (participanteParaRemover) => {
    const listaSemParticipante = listaParticipantes.filter(
      (participante) => participante.id !== participanteParaRemover.id,
    );

    setListaParticipantes(listaSemParticipante);
  };

  return (
    <View style={styles.appBackground}>
      <StatusBar backgroundColor={colors.primariaDark} />
      <View style={styles.container}>
        <View style={styles.containerAdicionar}>
          <TextInput
            style={styles.textInput}
            placeholder="Nome do participante"
            value={novoParticipante}
            // ref={nomeInputRef}
            onChangeText={(textoDigitado) => setNovoParticipante(textoDigitado)}
          />

          <TouchableHighlight
            style={styles.addButton}
            underlayColor={colors.secundaria}
            onPress={() => addParticipante(novoParticipante)}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.containerListaParticipantes}>
          <FlatList
            data={listaParticipantes}
            contentContainerStyle={styles.listaParticipantes}
            renderItem={({item}) => (
              <ParticipanteItem
                item={item}
                subtrairQuantidade={() => subtrairQuantidade(item)}
                somarQuantidade={() => somarQuantidade(item)}
                removerParticipante={() => questionarRemoverParticipante(item)}
              />
            )}
          />
        </View>

        <View style={styles.containerFinalizar}>
          <TouchableHighlight
            style={styles.addButton}
            underlayColor={colors.secundaria}
            onPress={() => addParticipante(novoParticipante)}>
            <Text style={styles.addButtonText}>Finalizar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBackground: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerAdicionar: {
    flex: 2,
    justifyContent: 'center',
  },
  containerListaParticipantes: {
    flex: 6,
  },
  containerFinalizar: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: colors.cinzaClaro,
    backgroundColor: colors.cinzaClaro,
    paddingLeft: 15,
  },
  addButton: {
    margin: 10,
    marginHorizontal: 10,
    backgroundColor: colors.primaria,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 15,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
  },
  listaParticipantes: {
    alignItems: 'center',
  },
  itemParticipante: {
    fontSize: 20,
  },
});

export default Home;
