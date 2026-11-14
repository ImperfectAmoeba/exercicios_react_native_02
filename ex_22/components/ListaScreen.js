import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { carregarItens, salvarItens } from './storage';

export default function ListaScreen({ navigation }) {
  const [itens, setItens] = useState([]);

  // Recarrega a lista sempre que a tela volta a ficar visível
  useFocusEffect(
    useCallback(() => {
      carregarItens().then(setItens);
    }, [])
  );

  const excluir = (item) => {
    Alert.alert('Excluir', `Remover "${item.mercadoria}" da lista?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const novos = itens.filter((i) => i.id !== item.id);
          setItens(novos);
          await salvarItens(novos);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.texto}>
        {item.mercadoria} ({item.quantidade})
      </Text>
      <View style={styles.acoes}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Form', { item })}
          style={styles.botaoIcone}>
          <MaterialIcons name="edit" size={22} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => excluir(item)}
          style={styles.botaoIcone}>
          <MaterialIcons name="remove" size={22} color="#c0392b" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum item na lista.</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Form')}>
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    flex: 1,
  },
  acoes: {
    flexDirection: 'row',
  },
  botaoIcone: {
    marginLeft: 12,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
