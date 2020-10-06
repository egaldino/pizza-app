import React, {useState} from 'react';
import {
  TextInput,
  FlatList,
  StyleSheet,
  View,
  Alert,
  StatusBar,
} from 'react-native';
import {ParticipanteItem, PrimaryButton} from '../components/';
import globalStyle from '../styles';
import colors from '../colors.json';
import {postRodizio} from '../api/index';

const corAleatoria = () => {
  const cores = colors.participantes;
  const indiceAleatorio = Math.floor(Math.random() * cores.length);
  return cores[indiceAleatorio];
};

const listaParticipantesMock = [
  {
    id: 1,
    nome: 'Rodrigo',
    quantidade: 5,
    borderColor: corAleatoria(),
  },
  {
    id: 2,
    nome: 'Gabriela',
    quantidade: 3,
    borderColor: corAleatoria(),
  },
  {
    id: 3,
    nome: 'Edson',
    quantidade: 1,
    borderColor: corAleatoria(),
  },
  {
    id: 4,
    nome: 'Rodrigo',
    quantidade: 5,
    borderColor: corAleatoria(),
  },
  {
    id: 5,
    nome: 'Gabriela',
    quantidade: 3,
    borderColor: corAleatoria(),
  },
  {
    id: 6,
    nome: 'Edson',
    quantidade: 1,
    borderColor: corAleatoria(),
  },
  {
    id: 7,
    nome: 'Rodrigo',
    quantidade: 5,
    borderColor: corAleatoria(),
  },
  {
    id: 8,
    nome: 'Gabriela',
    quantidade: 3,
    borderColor: corAleatoria(),
  },
  {
    id: 9,
    nome: 'Edson',
    quantidade: 1,
    borderColor: corAleatoria(),
  },
];

const Home = ({navigation}) => {
  const [listaParticipantes, setListaParticipantes] = useState(
    listaParticipantesMock,
  );
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

  const finalizarRodizio = () => {
    postRodizio(listaParticipantes)
      .then(() => navigation.replace('Finalizacao', {listaParticipantes}))
      .catch((erro) => {
        console.log(erro);
        Alert.alert(
          'Erro ao acessar servidor',
          'Verifique sua conexão ou tente novamente mais tarde',
        );
      });
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
    <View style={globalStyle.appBackground}>
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

          <PrimaryButton
            nome="Adicionar"
            onPress={() => addParticipante(novoParticipante)}
          />
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
          {listaParticipantes.length > 1 && (
            <PrimaryButton
              nome="Finalizar"
              onPress={() => finalizarRodizio()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  listaParticipantes: {
    alignItems: 'center',
  },
  itemParticipante: {
    fontSize: 20,
  },
});

export default Home;
