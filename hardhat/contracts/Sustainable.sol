// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SustainableProductNFT is ERC721, Ownable {
    // Struct to store product information
    struct Product {
        string productName;
        string description;
        string ipfsMetadataHash; // IPFS hash of the product's metadata
        string sustainabilityClaims;
        uint256 nftTokenId; // Token ID of the associated NFT
        bool isMinted; // Status whether NFT is minted or not
    }

    // Struct to store user information
    struct User {
        address userAddress;
        bool isRegistered;
    }

    // Mapping of productId to Product struct
    mapping(uint256 => Product) public products;

    // Mapping of addresses to users
    mapping(address => User) public users;

    // Counter for assigning unique token IDs
    uint256 public nextTokenId;

    // Counter for the total number of products submitted
    uint256 public productCount;

    // Price to purchase an NFT (in wei)
    uint256 public nftPrice = 0.01 ether;

    // Event triggered when a new product NFT is minted
    event ProductMinted(address indexed buyer, uint256 tokenId, string ipfsMetadataHash);
    event UserLoggedIn(address indexed userAddress);
    event ProductSubmitted(address indexed submitter, uint256 productId);

    // Modifier to ensure the product has not been minted before
    modifier notMinted(uint256 productId) {
        require(!products[productId].isMinted, "Product already has an NFT.");
        _;
    }

    // Modifier to ensure the user is registered
    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not logged in or registered.");
        _;
    }

    // Constructor with ERC721 and Ownable initialization
    constructor() ERC721("SustainableProductNFT", "SPNFT") Ownable(msg.sender) {
        nextTokenId = 0; // Initialize tokenId counter
        productCount = 0; // Initialize productCount counter
    }

    // Function for user login (register if not registered)
    function login() external {
        require(!users[msg.sender].isRegistered, "User already logged in or registered.");
        users[msg.sender] = User(msg.sender, true);
        emit UserLoggedIn(msg.sender);
    }

    // Function to allow a user to submit product details and mint an NFT
    function submitAndMintProduct(
        uint256 productId,
        string memory _productName,
        string memory _description,
        string memory _ipfsMetadataHash,
        string memory _sustainabilityClaims
    ) public payable onlyRegistered notMinted(productId) {
        require(msg.value >= nftPrice, "Insufficient payment for minting NFT.");

        // Create a new Product
        products[productId] = Product({
            productName: _productName,
            description: _description,
            ipfsMetadataHash: _ipfsMetadataHash,
            sustainabilityClaims: _sustainabilityClaims,
            nftTokenId: nextTokenId,
            isMinted: true
        });

        // Mint the NFT to the submitter
        _mint(msg.sender, nextTokenId);
        emit ProductMinted(msg.sender, nextTokenId, _ipfsMetadataHash);

        // Increment the tokenId and productCount for the next product
        nextTokenId++;
        productCount++;

        // Emit product submission event
        emit ProductSubmitted(msg.sender, productId);
    }

    // Function to retrieve product details by productId
    function getProductDetails(uint256 productId)
        public
        view
        returns (
            string memory productName,
            string memory description,
            string memory ipfsMetadataHash,
            string memory sustainabilityClaims,
            uint256 nftTokenId,
            bool isMinted
        )
    {
        Product storage product = products[productId];
        return (
            product.productName,
            product.description,
            product.ipfsMetadataHash,
            product.sustainabilityClaims,
            product.nftTokenId,
            product.isMinted
        );
    }

    // Function to retrieve the IPFS link for a specific NFT
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // Find the product by matching the tokenId with products
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (products[i].nftTokenId == tokenId) {
                return string(abi.encodePacked("ipfs://", products[i].ipfsMetadataHash));
            }
        }
        return "";
    }

    // Function to retrieve the total number of products submitted
    function getProductCount() public view returns (uint256) {
        return productCount;
    }

    // Function for the contract owner to withdraw the contract balance (collected funds)
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
