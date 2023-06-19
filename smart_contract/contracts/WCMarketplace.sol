// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./WorldCup.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract WCMarketplace is ERC721Holder, Ownable {
    using SafeMath for uint256;

    WorldCup private _nft;
    uint256 private _tax = 5; // percentage

    struct Listing {
        address payable seller;
        uint256 price;
        uint256 tokenId;
    }

    mapping(uint256 => Listing) private _listings;
    uint256[] private _heldTokens;

    event ListNFT(address indexed seller, uint256 tokenId, uint256 price);
    event UnlistNFT(address indexed seller, uint256 tokenId);
    event BuyNFT(address indexed buyer, address indexed seller, uint256 tokenId, uint256 price);
    event UpdateListingNFTPrice(uint256 tokenId, uint256 price);
    event SetTax(uint256 tax);

    constructor(address nft) {
        _nft = WorldCup(nft);
    }

    modifier onlySeller(uint256 tokenId) {
        require(_nft.ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        _;
    }

    modifier onlyNotListed(uint256 tokenId) {
        require(_listings[tokenId].seller == address(0), "NFT is already listed");
        _;
    }

    modifier onlyHeld(uint256 tokenId) {
        require(!_isTokenHeld(tokenId), "NFT is already held by the contract");
        _;
    }

    modifier onlyListed(uint256 tokenId) {
        require(_listings[tokenId].seller != address(0), "NFT is not listed");
        _;
    }

    modifier onlySellerOrOwner(uint256 tokenId) {
        require(_listings[tokenId].seller == msg.sender || owner() == msg.sender, "Only seller or owner can perform this action");
        _;
    }

    modifier onlyBuyer(uint256 tokenId) {
        require(_listings[tokenId].seller != msg.sender, "You cannot buy your own NFT");
        _;
    }

    function setTax(uint256 tax) public onlyOwner {
        _tax = tax;
        emit SetTax(tax);
    }

    function getListedNFTs() public view returns (Listing[] memory) {
        uint256 listedNFTsCount = 0;

        for (uint256 i = 0; i < _heldTokens.length; i++) {
            uint256 tokenId = _heldTokens[i];
            if (_listings[tokenId].seller != address(0)) {
                listedNFTsCount++;
            }
        }

        Listing[] memory listedNFTs = new Listing[](listedNFTsCount);
        uint256 j = 0;

        for (uint256 i = 0; i < _heldTokens.length; i++) {
            uint256 tokenId = _heldTokens[i];
            if (_listings[tokenId].seller != address(0)) {
                listedNFTs[j] = _listings[tokenId];
                listedNFTs[j].tokenId = tokenId;
                j++;
            }
        }

        return listedNFTs;
    }

    function listNFT(uint256 tokenId, uint256 price) public onlySeller(tokenId) onlyNotListed(tokenId) onlyHeld(tokenId) {
        require(price > 0, "Price cannot be set to zero");

        _listings[tokenId] = Listing(payable(msg.sender), price, tokenId);

        _nft.safeTransferFrom(msg.sender, address(this), tokenId);

        _heldTokens.push(tokenId);

        emit ListNFT(msg.sender, tokenId, price);
    }

    function updateListingNFTPrice(uint256 tokenId, uint256 price) public onlySeller(tokenId) onlyListed(tokenId) {
        require(price > 0, "Price cannot be set to zero");

        _listings[tokenId].price = price;

        emit UpdateListingNFTPrice(tokenId, price);
    }

    function unlistNFT(uint256 tokenId) public onlySellerOrOwner(tokenId) onlyListed(tokenId) {
        _nft.safeTransferFrom(address(this), _listings[tokenId].seller, tokenId);

        delete _listings[tokenId];
        _removeTokenFromHeldTokens(tokenId);

        emit UnlistNFT(msg.sender, tokenId);
    }

    function buyNFT(uint256 tokenId) public payable onlyBuyer(tokenId) onlyListed(tokenId) {
        require(_nft.ownerOf(tokenId) == address(this), "NFT is not in escrow");
        require(msg.value >= (_listings[tokenId].price * 1 wei), "Insufficient payment");

        uint256 fee = (msg.value * _tax) /100;
        uint256 sellerProceeds = msg.value - fee;

        _listings[tokenId].seller.transfer(sellerProceeds);
        _nft.safeTransferFrom(address(this), msg.sender, tokenId);

        delete _listings[tokenId];
        _removeTokenFromHeldTokens(tokenId);

        emit BuyNFT(msg.sender, _listings[tokenId].seller, tokenId, _listings[tokenId].price);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _isTokenHeld(uint256 tokenId) private view returns (bool) {
        for (uint256 i = 0; i < _heldTokens.length; i++) {
            if (_heldTokens[i] == tokenId) {
                return true;
            }
        }
        return false;
    }

    function _removeTokenFromHeldTokens(uint256 tokenId) private {
        for (uint256 i = 0; i < _heldTokens.length; i++) {
            if (_heldTokens[i] == tokenId) {
                _heldTokens[i] = _heldTokens[_heldTokens.length - 1];
                _heldTokens.pop();
                break;
            }
        }
    }
}