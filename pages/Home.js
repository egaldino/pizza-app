import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import ParticipanteItem from '../components/ParticipanteItem';

import colors from '../colors.json';

const corAleatoria = () => {
  const cores = colors.participantes;
  const indiceAleatorio = Math.floor(Math.random() * cores.length);
  return cores[indiceAleatorio];
};

const Home = () => {
  const [listaParticipantes, setListaParticipantes] = useState([
    {id: 1, nome: 'Edson', quantidade: 3, borderColor: corAleatoria()},
    {id: 2, nome: 'Gabriel', quantidade: 5, borderColor: corAleatoria()},
  ]);
  // const nomeInputRef = useRef('');

  const [novoParticipante, setNovoParticipante] = useState();

  const addParticipante = (nome) => {
    if (!nome || nome.length === 0) {
      return;
    }

    setListaParticipantes([
      ...listaParticipantes,
      {
        id: listaParticipantes.length + 1,
        nome,
        quantidade: 0,
        borderColor: corAleatoria(),
      },
    ]);
    setNovoParticipante('');
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
    setListaParticipantes(listaAtualizada);
  };

  const somarQuantidade = (item) => {
    const listaAtualizada = listaParticipantes.map((participante) => {
      if (participante.id === item.id) {
        return {...participante, quantidade: item.quantidade + 1};
      }
      return participante;
    });
    setListaParticipantes(listaAtualizada);
  };

  const removerParticipante = (participanteParaRemover) => {
    const listaSemParticipante = listaParticipantes.filter(
      (participante) => participante.id !== participanteParaRemover.id,
    );

    setListaParticipantes(listaSemParticipante);
  };

  return (
    <View style={styles.appBackground}>
      <View style={styles.container}>
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

        <FlatList
          data={listaParticipantes}
          contentContainerStyle={styles.listaParticipantes}
          renderItem={({item, index}) => (
            <ParticipanteItem
              item={item}
              index={index}
              subtrairQuantidade={() => subtrairQuantidade(item)}
              somarQuantidade={() => somarQuantidade(item)}
              removerParticipante={() => removerParticipante(item)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBackground: {
    paddingTop: 20,
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  container: {
    margin: 5,
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
