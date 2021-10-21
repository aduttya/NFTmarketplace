const serverUrl = "https://uu0yluccfjjx.grandmoralis.com:2053/server";
const appId = "v3afaINstW4ea7WmpmS4U1CpPpOpLvDx7W9W1ask";
Moralis.start({ serverUrl, appId });

let abi  =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_id",
        "type": "bytes32"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_NFThash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_NFTurl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_no",
        "type": "uint256"
      }
    ],
    "name": "uploadNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nftcollection",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_id",
        "type": "bytes32"
      }
    ],
    "name": "getNFT",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "NFThash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "NFTurl",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "internalType": "struct MyNFTmarketplace.NFTart",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_id",
        "type": "bytes32"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
const url = "https://speedy-nodes-nyc.moralis.io/892dbb9dd161fd10dd842f4f/bsc/testnet";
const address = "0x0069F01FBa7f97B38D41c8694226100c370bC11f";
const privateKey = "b06b9a369397fef3349d483ee86cf142497d9b1fc3fa85f4b28692792a14e928";
const ContractAddress = "0x15D1cCFcC2cE9DD3E0598FFDD7Fd41d91D27e2AB";
let contract,w3,user,account,id;

async function login(){

  user = await Moralis.authenticate({ signingMessage: "authenticate" })
      .then(function (user) {
         console.log("logged in user:", user);
      })
  user = Moralis.User.current();
  account = await user.get("ethAddress")
  console.log("currently interacting user is ",user)

  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "authenticate" })
      .then(function (user) {
         console.log("logged in user:", user);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.log("The user Account is : ",account);

  w3 = await Moralis.enableWeb3()
  contract = new w3.eth.Contract(abi,ContractAddress);
  console.log(contract)

  $("#btn-login").hide();
  document.getElementById("btn-logout").style.display = "";
  
}

async function logOut() {
  console.log("logout")
  await Moralis.User.logOut();
  $("#btn-login").show();
  document.getElementById("btn-logout").style.display = "none";

}



async function upload(){
    console.log('file upload ')
    const fileInput = document.getElementById("file");
    const data = fileInput.files[0];
    const file = new Moralis.File("none.jpg",data);
    await file.saveIPFS()
    const account = await user.get("ethAddress")
    if(user){
      console.log("currently interacting user is ",user)
      await contract.methods.uploadNFT(file.hash(),file.ipfs(),10).send({
          from : account
        }).then(function(results){
          console.log(results)
        });
    }

    console.log(file.hash());
    console.log(file.ipfs());
}

async function BuyNFT(id){
  console.log("Buy NFT function called")

    let val = await contract.methods.getNFT(id).call();
    
if(val[2] != account){
  if(user){
  await contract.methods.transfer(account,id).send({
    from : account,
    value : 2,
    gas : 850000
  }).then(function(results){
    console.log(results)
  })

}}
else{
  console.log("You already owned the NFTart")
}

}

async function getData(){

  await contract.methods.nftcollection().call({
    from:account
  }).then(function(results){
    let count = 0;
    while(results[count] != undefined){
      console.log(results[count])
    count++;}
  })
  console.log("data got")
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").style.display = "none";
document.getElementById("upload_file_button").onclick = upload;
