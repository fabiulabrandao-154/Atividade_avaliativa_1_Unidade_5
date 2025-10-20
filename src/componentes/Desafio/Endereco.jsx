import React, { useState } from "react";
import InputText from "./InputText.jsx";
import Label from "./Label.jsx";

export default function Endereco({ onChange }) {
  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const [loading, setLoading] = useState(false); // novo estado para exibir "Buscando CEP..."

  // Atualiza o estado local e envia os dados ao componente pai (CadastroPF ou PJ)
  const atualizarEndereco = (campo, valor) => {
    const novoEndereco = { ...endereco, [campo]: valor };
    setEndereco(novoEndereco);
    if (onChange) onChange(novoEndereco);
  };

  // Busca automática do endereço pelo CEP (ViaCEP)
  const buscarCep = async (cep) => {
    try {
      const cepLimpo = cep.replace(/\D/g, "");
      if (cepLimpo.length !== 8) return; // só busca quando tiver 8 dígitos

      setLoading(true);

      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        setLoading(false);
        return;
      }

      atualizarEndereco("logradouro", data.logradouro || "");
      atualizarEndereco("bairro", data.bairro || "");
      atualizarEndereco("cidade", data.localidade || "");
      atualizarEndereco("uf", data.uf || "");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao consultar o CEP. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
      <Label texto="CEP:" />
      <InputText
        placeholder="Digite o CEP (somente números)"
        value={endereco.cep}
        onChange={(e) => {
          const cep = e.target.value.replace(/\D/g, "");
          atualizarEndereco("cep", cep);
          if (cep.length === 8) buscarCep(cep);
        }}
      />

      {loading && (
        <p className="text-blue-600 text-sm mb-2 animate-pulse">
          🔄 Buscando endereço...
        </p>
      )}

      <Label texto="Logradouro:" />
      <InputText
        placeholder="Rua / Avenida"
        value={endereco.logradouro}
        onChange={(e) => atualizarEndereco("logradouro", e.target.value)}
      />

      <Label texto="Número:" />
      <InputText
        placeholder="Número"
        value={endereco.numero}
        onChange={(e) => atualizarEndereco("numero", e.target.value)}
      />

      <Label texto="Complemento:" />
      <InputText
        placeholder="Apartamento, bloco, sala..."
        value={endereco.complemento}
        onChange={(e) => atualizarEndereco("complemento", e.target.value)}
      />

      <Label texto="Bairro:" />
      <InputText
        placeholder="Bairro"
        value={endereco.bairro}
        onChange={(e) => atualizarEndereco("bairro", e.target.value)}
      />

      <Label texto="Cidade:" />
      <InputText
        placeholder="Cidade"
        value={endereco.cidade}
        onChange={(e) => atualizarEndereco("cidade", e.target.value)}
      />

      <Label texto="UF:" />
      <InputText
        placeholder="UF (ex: DF)"
        value={endereco.uf}
        onChange={(e) => atualizarEndereco("uf", e.target.value.toUpperCase())}
      />
    </div>
  );
}
