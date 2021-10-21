// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MyNFTmarketplace{

    // structure for the NFTart
    struct NFTart{
        string NFThash;
        string  NFTurl;
        address owner;
    }
    // events to get data for off chain uses
    event Transfer(address _from, address _to, bytes32 _id);

    mapping(bytes32 => NFTart) NFT;

    bytes32 [] NFTcollections;

    // function to update uploaded NFT data in smart contract
    function uploadNFT(string memory _NFThash, string memory _NFTurl,uint _no)external{
        // hashing the data and generting a unique id for the NFtart
        bytes32 _id = keccak256(abi.encodePacked(_NFThash,_NFTurl,_no));

        // updating NFTart data in respective containers
        NFT[_id].NFThash = _NFThash;
        NFT[_id].NFTurl = _NFTurl;
        NFT[_id].owner = msg.sender;
        NFTcollections.push(_id);
    }

    function nftcollection()public view returns(bytes32 [] memory){
        return NFTcollections;
    }

    // function to return details of a NFtart when it's is has been send
    function getNFT(bytes32  _id) public view returns(NFTart memory){
        return NFT[_id];
    }

    // function to transfer NFTart(only Owner has can perform this opertion)
    function transfer(address _to, bytes32 _id) external payable{
        // require(NFT[_id].owner == msg.sender,"Only owner has right to transfer");
        require(msg.value >= 0.000000000000000001 ether,"Amount is not enough");
        NFT[_id].owner = _to;
        emit Transfer(msg.sender, _to, _id);
        }


    


}