import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@lista_compras';

export async function carregarItens() {
  try {
    const json = await AsyncStorage.getItem(CHAVE);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.log('Erro ao carregar itens', e);
    return [];
  }
}

export async function salvarItens(itens) {
  try {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(itens));
  } catch (e) {
    console.log('Erro ao salvar itens', e);
  }
}
