Bom Dia, Professor;

Está na pasta: src/componentes/cadastrapessoa/EnderecoForm.jsx
-----------------------------------------------------------------
// Função para buscar o endereço via CEP
  const setCep = async (cep) => {
    try {
      const cleanCep = cep.replace(/\D/g, '');

      if (cleanCep.length !== 8) {
        message.warning("CEP inválido. Deve conter 8 números.");
        return;
      }

      const url = `https://viacep.com.br/ws/${cleanCep}/json/`;
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error(`Erro ao buscar CEP: ${resposta.status}`);
      }

      const dados = await resposta.json();

      if (dados.erro) {
        message.error("CEP não encontrado.");
        return;
      }
