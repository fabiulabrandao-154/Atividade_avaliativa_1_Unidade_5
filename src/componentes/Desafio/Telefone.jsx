import React, { useState } from "react";
import { Space } from "antd";
import Label from "./Label.jsx";
import InputText from "./InputText.jsx";

export default function Telefone() {
  const [telefones, setTelefones] = useState({
    residencial: "",
    celular: "",
    comercial: "",
  });

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 10) {
      return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .substring(0, 14);
    } else {
      return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);
    }
  };

  const handleChange = (campo, valor) => {
    setTelefones((prev) => ({ ...prev, [campo]: formatarTelefone(valor) }));
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", marginTop: 8 }}
      size="small"
    >
      <div>
        <Label texto="Telefone Residencial:" />
        <InputText
          placeholder="(XX) XXXX-XXXX"
          value={telefones.residencial}
          onChange={(e) => handleChange("residencial", e.target.value)}
        />
      </div>

      <div>
        <Label texto="Telefone Celular:" />
        <InputText
          placeholder="(XX) XXXXX-XXXX"
          value={telefones.celular}
          onChange={(e) => handleChange("celular", e.target.value)}
        />
      </div>

      <div>
        <Label texto="Telefone Comercial:" />
        <InputText
          placeholder="(XX) XXXX-XXXX"
          value={telefones.comercial}
          onChange={(e) => handleChange("comercial", e.target.value)}
        />
      </div>
    </Space>
  );
}