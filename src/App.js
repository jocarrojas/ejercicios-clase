import logo from "./logobambu.png";
import "./App.css";

import { ethers } from "ethers";
import Button from "@mui/material/Button";
import { useState } from "react";

import ABIdelContrato from "../src/contratos/ContratoABI.json";

function App() {
  const [walletActual, setWalletActual] = useState("");
  const [balanceActual, setBalanceActual] = useState("");
  const [balanceActualETH, setBalanceActualETH] = useState("");

  const conectarWallet = async () => {
    alert("CONECTANDO WALLET");
    //Esta linea invoca la conexión por metamask, metamask va a ser nuestro proveedor web3
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Si la conexión es exitosa obtengo los siguientes valores, primero la dirección
    const accounts = await provider
      .send("eth_requestAccounts", [])
      .catch((error) => {
        if (error && error.code && error.code === 4001) {
          alert("USUARIO HA NEGADO LA CONEXION");
        }
        console.log(error);
      });
    if (accounts) {
      setWalletActual(accounts[0]);
    }
    //luego obtengo el balance
    const balance = await provider.getBalance(accounts[0]);
    /*  if (balance) {
      setBalanceActual(balance); //va a tirar error porque el balance es BigNumber
    } */
    //luego obtengo el balance en ETH
    const balanceInEther = ethers.utils.formatEther(balance);
    if (balanceInEther) {
      setBalanceActualETH(balanceInEther);
    }
    //los muestro en un console.log
    console.log({ provider, accounts, balance, balanceInEther });
  };

  const desconectarWallet = async () => {
    alert("DESCONECTANDO WALLET");
    setBalanceActual("");
    setWalletActual("");
    setBalanceActualETH("");
  };

  const invocarTransferencia = async () => {
    alert("INVOCANDO TRANSFERENCIA");
    //let wallet = new ethers.Wallet("");
    //let gasActual = window.ethersProvider.getGasPrice();
    //console.log("COSTO DEL GAS", gasActual);
    /* const detallesdeTransferencia = {
      from: send_account,
      to: '0x21332453543543543',
      value: ethers.utils.parseEther(1),
      nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
      gasLimit: ethers.utils.hexlify(gas_limit), // 100000
      gasPrice: gas_price,
    }; */
  };

  const interactuarContrato = async () => {
    alert("INTERACTUAR CON UN CONTRATO");
    //Aqui interactuo con el ABI de mi contrato usando la libreria ethers
    //Especificamente invoco el método que me intersa, comprarBoleta(), consultarEstado()
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ fontWeight: "Bold" }}>
          Hola <code>Universidad </code> Este es un ejemplo de un dApp
        </p>

        <p style={{ fontWeight: "Bold" }}>Billetera actual: {walletActual}</p>
        <p style={{ fontWeight: "Bold" }}>
          Billetera actual MATIC: {balanceActualETH}
        </p>
        <Button
          variant="contained"
          style={{ width: "10rem", height: "5rem", fontWeight: "bold" }}
          onClick={
            walletActual === ""
              ? () => conectarWallet()
              : () => desconectarWallet()
          }
        >
          {walletActual !== "" ? "DESCONECTAR" : "CONNECTAR BILLETERA"}
        </Button>

        <Button
          variant="contained"
          style={{
            width: "10rem",
            height: "5rem",
            fontWeight: "bold",
            marginTop: "3rem",
          }}
          onClick={() => invocarTransferencia()}
        >
          INVOCAR TRANSFERENCIA
        </Button>
        <Button
          variant="contained"
          style={{
            width: "10rem",
            height: "5rem",
            fontWeight: "bold",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
          onClick={() => interactuarContrato()}
        >
          INTERACTUAR CON UN CONTRATO
        </Button>
      </header>
    </div>
  );
}

export default App;
