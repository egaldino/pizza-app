import React, {useEffect, useState} from 'react';
import {View, Alert, FlatList, Text} from 'react-native';
import {getRodizios} from '../api/index';

// import { Container } from './styles';

const Historico = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    getRodizios()
      .then((response) => {
        setHistorico(response.data);
      })
      .catch((erro) => {
        Alert.alert(
          'Erro ao acessar servidor',
          'Verifique sua conexão ou tente novamente mais tarde',
        );
      });
  }, []);

  return (
    <View>
      <FlatList
        data={historico}
        renderItem={({item}) => <Text>{item.local}</Text>}
      />
    </View>
  );
};

export default Historico;
