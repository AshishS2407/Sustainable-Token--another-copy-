const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SustainableModule", (m) => {
    const sust = m.contract("SustainableProductNFT");
    return { sust };
});