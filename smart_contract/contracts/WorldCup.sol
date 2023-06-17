// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract WorldCup is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Address for address;
    using SafeMath for uint256;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant cost = 0.0001 ether;

    string public baseURI = "ipfs://image/";
    uint256[32] public ratios = [8, 10, 11, 14, 19, 19, 22, 22, 26, 52, 65, 93, 121, 121, 149, 149, 186, 186, 280, 280, 373, 466, 466, 466, 466, 559, 746, 746, 932, 932, 1864];
    bool public isPaused = false;

    event Mint(
        uint256 _date,
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );
    event Transfer(
        uint256 _date,
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );
    event ApprovalForAllNft(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    event Withdraw(
        address indexed account, 
        uint256 amount
    );

    mapping(address => uint256) private mintCounts;

    mapping(uint256 => string[]) public  tiers;
    

    constructor() ERC721("Worldcup22ShoeNFT", "WCS") {
        tiers[0]=["Brazil","France","England","Spain","Germany","Argentina","Belgium","Portugal"];
        tiers[1]=["Netherlands","Denmark","Croatia","Uruguay","Poland","Senegal","United States","Serbia"];
        tiers[2]=["Switzerland","Mexico","Wales","Ghana","Ecuador","Morocco","Cameroon","Canada"];
        tiers[3]=["Japan","Qatar","Tunisia","South Korea","Australia","Iran","Saudi Arabia","Costa Rica"];
    }
    struct NFT {
        string name;
        string description;
        string traits;
    }

    mapping(uint256 => NFT) private _nfts;

    modifier isExist(uint256 tokenId){
        require(_exists(tokenId),"Token does not exist");
        _;
    }

    modifier isApprovedOrOwner(uint256 tokenId) {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _;
    }

    modifier isNotZeroAddress(address to) {
        require(to != address(0), "Cannot transfer to address zero");
        _;
    }

    modifier contractHasBalance() {
        require(address(this).balance > 0, "Contract balance is zero");
        _;
    }

    modifier notPaused() {
        require(!isPaused, "Contract is paused");
        _;
    }

    function setApprovalForAll(address operator, bool approved)
        public
        override
    {
        require(msg.sender != operator, "ERC721: Approve to caller");
        super.setApprovalForAll(operator, approved);
        emit ApprovalForAllNft(msg.sender, operator, approved);
    }

    function pause() public onlyOwner {
        isPaused = !isPaused;
    }

   
    function safeMint() public payable notPaused() {
        if (msg.sender != owner()) {
            require(msg.value >= cost, "Insufficient funds to mint tokens");
        }

        string memory trait = _generateRandomRankWithRatio(ratios);
        uint256 tokenId = _tokenIdCounter.current().add(1);
        _safeMint(msg.sender, tokenId);
        _nfts[tokenId] = NFT("Worldcup22ShoeNFT", "Worldcup 2022 Shoe NFT", trait);

        _tokenIdCounter.increment();
        mintCounts[msg.sender]++;

        emit Mint(block.timestamp, address(0), msg.sender, tokenId);
    }

   /**
     * @dev Lấy ngẫy nhiên một rank từ array rank truyền vào theo tỉ lệ nhất định
     * @param ratios_ tỉ lệ tương ứng random ra các tier element
     */
    function _generateRandomRankWithRatio(
        uint256[32] memory ratios_ 
    ) public view returns (string memory) {
        uint256 num = mintCounts[msg.sender];
        if (num>=3 && num%3==0) {
            uint256 randLucky = _randInRange(0,15);
            return tiers[randLucky/8][randLucky%8];
        }
        uint256 rand = _randInRange(1, 10000);
        uint256 flag = 0;
        for (uint8 i = 0; i < 32; i++) {
            if (rand <= ratios_[i] + flag && rand >= flag) {
                return tiers[i/8][i%8];
            }
            flag = flag + ratios_[i];
        }
        return "Costa Rica";
    }

    /**
     * @dev Random trong khoảng min đến max
     */
    function _randInRange(uint256 min, uint256 max)
        public
        view
        returns (uint256)
    {
        uint256 num = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
            )
        ) % (max + 1 - min);
        return num + min;
    }


    function withdrawAll() external contractHasBalance() onlyOwner {
        address payable owner = payable(owner());
        bool success = owner.send(address(this).balance);
        require(success, "Withdrawal failed");

        emit Withdraw(owner, address(this).balance);
    }

    // function getOwner(uint256 tokenId) public view isExist(tokenId) returns (address) {
    //     return ownerOf(tokenId);
    // }
    
    function getTotalOwerMint() external view returns (uint256) {
        return mintCounts[msg.sender];
    }

    function transfer(address to, uint256 tokenId) public virtual isApprovedOrOwner(tokenId) isNotZeroAddress(to) {
        _transfer(msg.sender, to, tokenId);
        emit Transfer(block.timestamp, msg.sender, to, tokenId);
    }

    function getMetadata(uint256 tokenId) external view isExist(tokenId) returns (NFT memory) {
        return _nfts[tokenId];
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        isExist(tokenId)
        override(ERC721)
        returns (string memory)
    {
        NFT memory nft = _nfts[tokenId];

        string memory json = string(
            abi.encodePacked(
                '{"name":"',
                nft.name,
                '","description":"',
                nft.description,
                '","traits":"',
                nft.traits,
                '"}'
            )
        );
        return json;
    }
}