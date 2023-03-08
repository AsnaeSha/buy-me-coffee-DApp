// spdx-license-identifier:mit

pragma solidity ^0.8.0;

contract BuyCoffee{
    struct Data{
        string name;
        string message;
        uint timeStamp;
        address from;
    }

    Data[] datas;
    address payable owner;

    constructor(){
        owner=payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable{
        require(msg.value > 0, "please send atleast 1 ether");
        require(msg.sender != owner,"owner cant participate");
        bool donated = false;
        for(uint i=0; i<datas.length; i++){
            if(datas[i].from ==msg.sender){
                donated=true;
                break;
            }
        }
        require(donated ==false, "already donated");
        owner.transfer(msg.value);
        datas.push(Data(_name,_message, block.timestamp, msg.sender));
    }

    function getData()public view returns(Data[]memory){
        return datas;
    }


}