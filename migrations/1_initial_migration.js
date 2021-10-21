const Migrations = artifacts.require("MyNFTmarketplace");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
