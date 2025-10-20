import React from "react";
import { Form, Input, Row, Col, Select, message } from "antd";

const { Option } = Select;

function EnderecoForm() {
  const [form] = Form.useForm();

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

      // Preenche automaticamente os campos no formulário
      form.setFieldsValue({
        endereco: {
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          uf: dados.uf,
          regiao: dados.regiao,
        },
      });
    } catch (erro) {
      message.error("Erro ao buscar o CEP.");
      console.error(erro);
    }
  };

  // Handler quando o usuário sai do campo CEP
  const handleCepChange = (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove tudo o que não for número
    form.setFieldValue(["endereco", "cep"], cep);
  };

  const handleCepBlur = (e) => {
    const cep = e.target.value;
    if (cep) setCep(cep);
  };

  // Função para evitar a digitação de letras no campo CEP
  const handleKeyPress = (e) => {
    // Permite apenas números (0-9)
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="CEP"
        name={["endereco", "cep"]}
        rules={[{ required: true, message: "Informe o CEP!" }]}
      >
        <Input
          placeholder="Digite o CEP (Somente números)"
          maxLength={8}
          onChange={handleCepChange}
          onBlur={handleCepBlur}
          onKeyPress={handleKeyPress} // Adiciona a função para bloquear letras
        />
      </Form.Item>

      <Form.Item
        label="Logradouro"
        name={["endereco", "logradouro"]}
        rules={[{ required: true, message: "Informe o logradouro!" }]}
      >
        <Input placeholder="Rua / Avenida" />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name={["endereco", "bairro"]}
        rules={[{ required: true, message: "Informe o bairro!" }]}
      >
        <Input placeholder="Bairro" />
      </Form.Item>

      <Row gutter={8}>
        <Col span={13}>
          <Form.Item
            label="Cidade"
            name={["endereco", "cidade"]}
            rules={[{ required: true, message: "Informe a cidade!" }]}
          >
            <Input placeholder="Cidade" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            label="UF"
            name={["endereco", "uf"]}
            rules={[{ required: true, message: "Informe a UF!" }]}
          >
            <Input placeholder="UF" maxLength={2} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Região"
            name={["endereco", "regiao"]}
            rules={[{ required: true, message: "Selecione a região!" }]}
          >
            <Select placeholder="Selecione">
              <Option value="Norte">Norte</Option>
              <Option value="Nordeste">Nordeste</Option>
              <Option value="Centro-Oeste">Centro-Oeste</Option>
              <Option value="Sudeste">Sudeste</Option>
              <Option value="Sul">Sul</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default EnderecoForm;