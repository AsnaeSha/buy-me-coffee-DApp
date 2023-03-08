import React, {useEffect, useState} from "react";
import {connectToMetamask} from "./web3_functions.js";
import BuyCoffee from "./contracts/BuyCoffee.json";
import Buy from "./components/buy.js";
import Data from "./components/data.js";
import coffee from './Coffee.jpeg';
import './App.css';


function App(){
const [contractInstance, setContractInstance] = useState(null);
const [accounts, setAccount] = useState();

useEffect(()=>{
async function connect(){
try{
let{accounts, instance} = await connectToMetamask();
setContractInstance(instance);
setAccount(accounts[0]);
}catch(error){
alert("failed to load contract.....");
console.log(error);
}
}
connect()
})
return(
<div style={{ backgroundColor: "white", height: "100%" }}>
<img src={coffee}  alt=".." width="1300px" height="400px" object-fit="contain"/>
<p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "405px" }}
      >
        <small>Connected Account - {accounts ? accounts : "no account connected"}</small>
      </p>
      <div className="container">
        <Buy account={accounts} contractInstance={contractInstance} />
        <Data account={accounts} contractInstance={contractInstance} />

</div>
</div>

)
}


export default App;

