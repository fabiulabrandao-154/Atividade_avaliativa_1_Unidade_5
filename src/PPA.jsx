import React, { useState } from "react";
import { Button, Space } from "antd";
import Login from "./Login.jsx";
import CadastroPF from "./CadastroPF.jsx";
import CadastroPJ from "./CadastroPJ.jsx";

export default function App() {
  const [tela, setTela] = useState("login"); // login | pf | pj

  const renderTela = () => {
    switch (tela) {
      case "pf":
        return <CadastroPF />;
      case "pj":
        return <CadastroPJ />;
      default:
        return <Login />;
    }
  };

  return (
    <div>
      {/* Menu superior fixo */}
      <div
        style={{
          backgroundColor: "#1677ff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Space>
          <Button
            type={tela === "login" ? "primary" : "default"}
            onClick={() => setTela("login")}
          >
            Login
          </Button>
          <Button
            type={tela === "pf" ? "primary" : "default"}
            onClick={() => setTela("pf")}
          >
            Cadastro PF
          </Button>
          <Button
            type={tela === "pj" ? "primary" : "default"}
            onClick={() => setTela("pj")}
          >
            Cadastro PJ
          </Button>
        </Space>
      </div>

      {/* Conteúdo da tela */}
      <div style={{ marginTop: "70px" }}>{renderTela()}</div>
    </div>
  );
}