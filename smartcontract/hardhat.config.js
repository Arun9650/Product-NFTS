require("@nomicfoundation/hardhat-toolbox");


require("dotenv").config({ path: ".env" });

const Polygon_API_KEY_URL = process.env.Polygon_API_KEY_URL;

const Polygon_PRIVATE_KEY = process.env.Polygon_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    matic: {
      url: Polygon_API_KEY_URL,
      accounts: [Polygon_PRIVATE_KEY],
    },
  },
};