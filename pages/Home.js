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

const Home = () => {
  const [listaParticipantes, setListaParticipantes] = useState([]);
  // const nomeInputRef = useRef('');

  const [novoParticipante, setNovoParticipante] = useState();

  const addParticipante = (participante) => {
    if (!participante || participante.length === 0) {
      return;
    }

    setListaParticipantes([...listaParticipantes, participante]);
    setNovoParticipante('');
  };

  return (
    <View style={{backgroundColor: '#eee', flex: 1}}>
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
          onPress={() => addParticipante(novoParticipante)}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableHighlight>

        <FlatList
          data={listaParticipantes}
          contentContainerStyle={styles.listaParticipantes}
          renderItem={({item, index}) => (
            <ParticipanteItem item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  addButton: {
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: '#1c943d',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
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
