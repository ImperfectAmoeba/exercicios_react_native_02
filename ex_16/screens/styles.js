import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  conteudo: {
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSub: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  cardPeriodo: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  cardTexto: {
    fontSize: 14,
    marginTop: 6,
  },
});
