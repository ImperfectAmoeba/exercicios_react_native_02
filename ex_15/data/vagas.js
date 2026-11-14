const vagas = [
  {
    id: '1',
    titulo: 'Desenvolvedor Backend',
    salario: 3000,
    descricao:
      'Desenvolvimento e manutenção de APIs REST em Node.js, integração com bancos de dados relacionais e escrita de testes automatizados.',
    contato: 'rh@techsolutions.com.br',
  },
  {
    id: '2',
    titulo: 'Engenheiro de Dados',
    salario: 3000,
    descricao:
      'Construção de pipelines de dados (ETL), modelagem de data warehouse e criação de rotinas de ingestão com Python e SQL.',
    contato: 'vagas@dataco.com.br',
  },
  {
    id: '3',
    titulo: 'Desenvolvedor Frontend',
    salario: 3500,
    descricao:
      'Criação de interfaces web responsivas com React, consumo de APIs e foco em acessibilidade e boas práticas de UX.',
    contato: 'talentos@webstudio.com.br',
  },
  {
    id: '4',
    titulo: 'Desenvolvedor Mobile',
    salario: 4000,
    descricao:
      'Desenvolvimento de aplicativos multiplataforma com React Native e Expo, publicação nas lojas e integração com serviços em nuvem.',
    contato: 'carreiras@appfactory.com.br',
  },
  {
    id: '5',
    titulo: 'Analista de Suporte',
    salario: 2500,
    descricao:
      'Atendimento a usuários, abertura e acompanhamento de chamados, configuração de estações de trabalho e redes.',
    contato: 'suporte.rh@infoservice.com.br',
  },
  {
    id: '6',
    titulo: 'Analista de QA',
    salario: 3200,
    descricao:
      'Planejamento e execução de testes manuais e automatizados, documentação de bugs e validação de entregas com o time de desenvolvimento.',
    contato: 'qa.vagas@qualitysoft.com.br',
  },
];

export function formatarSalario(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default vagas;
