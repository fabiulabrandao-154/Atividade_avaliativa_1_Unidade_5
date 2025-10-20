import React, { useState } from "react";
import { Card, Space } from "antd";
import Label from "./Label.jsx";
import LabelTitle from "./LabelTitle.jsx";
import Button from "./Button.jsx";
import InputText from "./InputText.jsx";
import Endereco from "./Endereco.jsx";

export default function CadastroPF() {
  const [cpf, setCpf] = useState("");
  const [erroCpf, setErroCpf] = useState("");

  // Máscara e validação simples de CPF
  const formatarCPF = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  };

  const validarCPF = (cpf) => {
    const s = cpf.replace(/\D/g, "");
    if (s.length !== 11) return false;
    if (/^(\d)\1+$/.test(s)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(s[i]) * (10 - i);
    let dig1 = (soma * 10) % 11;
    if (dig1 === 10) dig1 = 0;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(s[i]) * (11 - i);
    let dig2 = (soma * 10) % 11;
    if (dig2 === 10) dig2 = 0;
    return dig1 === parseInt(s[9]) && dig2 === parseInt(s[10]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarCPF(cpf)) {
      setErroCpf("CPF inválido.");
      return;
    }
    setErroCpf("");
    alert("Cadastro de Pessoa Física realizado com sucesso!");
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
        <LabelTitle texto="Cadastro de Pessoa Física" />
        <form onSubmit={handleSubmit}>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <div>
              <Label texto="Nome Completo:" />
              <InputText placeholder="Digite seu nome completo" />
            </div>

            <div>
              <Label texto="E-mail:" />
              <InputText placeholder="Digite seu e-mail" />
            </div>

            <div>
              <Label texto="CPF:" />
              <InputText
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatarCPF(e.target.value))}
              />
              {erroCpf && <p style={{ color: "red", fontSize: 12 }}>{erroCpf}</p>}
            </div>

            <div>
              <Label texto="Data de Nascimento:" />
              <InputText placeholder="DD/MM/AAAA" />
            </div>

            <div>
              <Label texto="Título de Eleitor:" />
              <InputText placeholder="Número do título de eleitor" />
            </div>

            <Endereco />

            <div>
              <Label texto="Telefone:" />
              <InputText placeholder="(XX) XXXXX-XXXX" />
            </div>

            <Button valor="Cadastrar" />
          </Space>
        </form>
      </Card>
    </div>
  );
}