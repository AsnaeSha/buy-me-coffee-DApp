var BuyCoffee = artifacts.require("./BuyCoffee.sol");

module.exports = function(deployer) {
	deployer.deploy(BuyCoffee);
};