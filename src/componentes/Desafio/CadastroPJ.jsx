import React, { useState } from "react";
import { Card, Space } from "antd";
import Label from "./Label.jsx";
import LabelTitle from "./LabelTitle.jsx";
import Button from "./Button.jsx";
import InputText from "./InputText.jsx";
import Endereco from "./Endereco.jsx";

export default function CadastroPJ() {
  const [cnpj, setCnpj] = useState("");
  const [erroCnpj, setErroCnpj] = useState("");

  const formatarCNPJ = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 18);
  };

  const validarCNPJ = (cnpj) => {
    const s = cnpj.replace(/\D/g, "");
    if (s.length !== 14) return false;
    if (/^(\d)\1+$/.test(s)) return false;

    let tamanho = s.length - 2;
    let numeros = s.substring(0, tamanho);
    let digitos = s.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = s.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarCNPJ(cnpj)) {
      setErroCnpj("CNPJ inválido.");
      return;
    }
    setErroCnpj("");
    alert("Cadastro de Pessoa Jurídica realizado com sucesso!");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 420 }} bordered>
        <LabelTitle texto="Cadastro de Pessoa Jurídica" />
        <form onSubmit={handleSubmit}>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <div>
              <Label texto="Razão Social:" />
              <InputText placeholder="Nome da empresa" />
            </div>

            <div>
              <Label texto="E-mail:" />
              <InputText placeholder="Digite o e-mail da empresa" />
            </div>

            <div>
              <Label texto="CNPJ:" />
              <InputText
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
              />
              {erroCnpj && (
                <p style={{ color: "red", fontSize: 12 }}>{erroCnpj}</p>
              )}
            </div>

            <div>
              <Label texto="Inscrição Estadual:" />
              <InputText placeholder="Digite a IE (se aplicável)" />
            </div>

            <Endereco />

            <div>
              <Label texto="Telefone Comercial:" />
              <InputText placeholder="(XX) XXXX-XXXX" />
            </div>

            <Button valor="Cadastrar" />
          </Space>
        </form>
      </Card>
    </div>
  );
}