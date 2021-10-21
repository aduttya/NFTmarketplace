const MyNFT = artifacts.require("MyNFTmarketplace")

contract("Tesing NFTmarketplace",(accounts)=>{

    let Mynft;
    
    it('deploying the contract',async()=>{

        Mynft = await MyNFT.deployed()
        console.log("Contract has been successfully deployed at address : ",Mynft.address)
    })

     it("uploading NFT",async()=>{
        const arg1 = []
        const arg2 = []

        // arg1 = web3.utils.hexToBytes("616a6179")
        // console.log(arg1);
          await Mynft.uploadNFT(
              "ajay",
              "www.gooogle.com",
              5,{
                  from : accounts[1],
                  gas : 800000
              })

              await Mynft.uploadNFT(
                "aditya",
                "www.apple.com",
                5,{
                    from : accounts[1],
                    gas : 800000
                })

                await Mynft.uploadNFT(
                    "aman",
                    "www.yahoo.com",
                    5,{
                        from : accounts[1],
                        gas : 800000
                    })

                
                    await Mynft.uploadNFT(
                        "aduttya",
                        "www.aduttya.com",
                        5,{
                            from : accounts[0],
                            gas : 800000
                        })

                    
                await Mynft.uploadNFT(
                    "sanjay",
                    "www.sanjay.com",
                    5,{
                        from : accounts[0],
                        gas : 800000
                    })
     })


     it('Getting NFT',async () =>{

        await Mynft.nftcollection().then(async function(results){
            console.log("The results are : ",results)
            let i = 0;
            while(results[i] != undefined){
                let val = await Mynft.getNFT(results[i]);
                console.log(val)
                i++;
            }
        })        

     })
})