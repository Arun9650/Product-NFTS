// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SmartContract is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter tokenIds;
    using Strings for uint256;

    mapping(uint256 => string) public tokenURIs;

    AggregatorV3Interface public priceFeed;

    struct RenderToken {
        uint256 id;
        string uri;
    }

    constructor() ERC721("Smart Drone", "SD") {
        priceFeed = AggregatorV3Interface(
            // 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
            // 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e

            // polygon data feed address 
            // 0xf9680d99d6c9589e2a93a78a04a279e509205945
            // 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
            0x0715A7794a1dc8e42615F059dD6e406A6594651A
        );
    }

    function getLatestPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();

        return price;
    }

    function getDecimals() public view returns (uint8) {
        uint8 decimals = priceFeed.decimals();

        return decimals;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual  override returns (string memory){
        require(_exists(tokenId));
        string memory _tokenURI = tokenURIs[tokenId];
        return _tokenURI;
    }   

    function mint(  string memory uri)
        public
        payable
        returns (uint256)
    {
        uint256 newId = tokenIds.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, uri);
        tokenIds.increment();
        return newId;
    }

    function getAllTokens() public view returns (RenderToken[] memory) {
        uint256 lastestId = tokenIds.current();
        uint256 counter = 0;
        RenderToken[] memory res = new RenderToken[](lastestId);
        for (uint256 i = 0; i < lastestId; i++) {
            if (_exists(counter)) {
                string memory uri = tokenURI(counter);
                res[counter] = RenderToken(counter, uri);
            }
            counter++;
        }
        return res;
    }

        
        function withdraw() public onlyOwner  {
            address _owner = owner();
            uint256 amount = address(this).balance;
            (bool sent, ) =  _owner.call{value: amount}("");
            require(sent, "Failed to send Ether");
        }

         // Function to receive Ether. msg.data must be empty
        receive() external payable {}

        // Fallback function is called when msg.data is not empty
        fallback() external payable {}



}
