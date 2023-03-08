import Web3 from "web3";
import BuyCoffee from "./contracts/BuyCoffee.json";

async function connectToWeb3(){
const provider = new Web3.providers.HttpProviders("HTTP://127.0.0.1:8545");
const web3 = new Web3(provider);
const accounts = await web3.eth.getAccounts();
console.log(accounts);
const networkId = await web3.eth.net.getId();
const deployedNetwork = await BuyCoffee.networks[networkId];
console.log(deployedNetwork);
const instance = new web3.eth.Contract(BuyCoffee.abi, deployedNetwork.address);
return{accounts, instance};
}

async function connectToMetamask(){
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0:8545');
await window.ethereum.enable();
const accounts = await web3.eth.getAccounts();
const networkId = await web3.eth.net.getId();
console.log("injected web3 detected", accounts, networkId);
const deployedNetwork = await BuyCoffee.networks[networkId];
console.log(deployedNetwork);
const instance = new web3.eth.Contract(BuyCoffee.abi, deployedNetwork.address);
return{accounts, instance};
}

export {connectToWeb3, connectToMetamask}