import React,{useState} from "react";
import Web3 from "web3";
const web3= new Web3();


export default function Buy({contractInstance, account}){
const[accounts, setAccount] = useState('');
const[_name, setName]=useState('');
const[_message, setMessage]= useState('');
const[buy, setBuy] = useState('');


async function handleSubmit(e){
e.preventDefault();
const amount = {from:account, value: web3.utils.toWei("0.001","ether"), gas:500000};
try{
let response = await contractInstance.methods.buyCoffee(_name, _message).send(amount);
console.log(response);
setBuy(response)
}catch(error){
console.log(error);
if(error.message.includes("please send atleast 1 ether")){
alert("please send atleast 1 ether")
}else if(error.message.includes("owner cant participate")){
alert("owner cant participate")
}else if(error.message.includes("already donated")){
alert("already donated")
}else{
alert("transaction error")
}
}
}
  return (
    <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Your Name"
            value={_name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">Message:</label>
          <input
            id="message"
            className="form-control"
            placeholder="Message"
            value={_message}
            onChange={e => setMessage(e.target.value)}
          ></input>
        </div>
        <button type="submit"
            className="btn btn-dark"
            onClick={handleSubmit}>Pay
            </button>
      </form>
    </div>
  );
}