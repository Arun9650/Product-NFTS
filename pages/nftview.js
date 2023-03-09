import React, { useContext, useEffect,useState } from "react";
import Layout from "../components/Layout";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constans/index";
import { useSigner } from "wagmi";
import { Contract } from "ethers";
import { AppWrapper } from "../utils/context";
import Image from "next/image";
import { Card, CardFooter } from "@material-tailwind/react";
import { useAccount } from "wagmi";
import Link from "next/link";

function Nftview() {


  const { isConnected } = useAccount();


  const [isConnectedStatus, setIsConnectedStatus] = useState(false);

  const baseurl = "https://ipfs.io/ipfs/";

  const { state, dispatch } = useContext(AppWrapper);

  const {
    cart: { cartItem },
  } = state;

  const { data: signer } = useSigner();

  const [links, setLink] = useState([]);

  const getAllToken = async () => {
    setLink([]);
    try {
      const nftContract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, signer);
     
      const token = await nftContract.getAllTokens();
      // console.log("this is a token ", token);

      token.forEach((nft) => {
        fetch(nft.uri)
          .then((response) => response.json())
          .then((metaData) => {
            setLink((state) => [...state, { id: nft.id, metaData: metaData }]);
          });
      });
    } catch (error) {
      console.log("this is a error ", error);
    }
  };


  const hexToDecimal = (hex) => parseInt(hex, 16);

  useEffect(() => {
    if (isConnected) {
      setIsConnectedStatus(true);
    }
    
  }, [isConnected]);

 
  



  if(!isConnectedStatus){
    return (
      <Layout title="NFT Page">
        <div className="mt-20">
          <div className="flex items-center justify-center  flex-wrap ">
            <div className="text-5xl italic bold ">Please Connect Your Wallet</div>
          </div>
        </div>
      </Layout>
    );
  }


  else {
return (
  <Layout title="NFT Page">
      <div className="mt-20">
        <button
          className="border p-4 m-4 bg-blue-gray-50 rounded  "
          onClick={() => getAllToken()}
        >
          view tokens
        </button>

        <div className="flex items-center justify-center  flex-wrap ">
          {links ? (
            links.map((nft, index) => {
              const image = nft.metaData.image.slice(7);
              const url = baseurl + image;
              const id = hexToDecimal(nft.id);
              
              
              return (
                <div key={index} className="">
                  <Card className=" m-3  border rounded-2xl  ">
                    <div className="h-64">
                      <Image
                        src={url}
                        alt={nft.metaData.name}   
                        width={300}
                        height={300}
                        className="object-contain cursor-pointer"
                      />
                    </div>
                    <CardFooter
                      divider
                      className="mx-4 p-5 flex justify-between"
                    >
                      <div className="">
                        <div className="font-Roboto text-[#0e0a23] truncate w-40z">
                          {nft.metaData.name}
                        </div>

                   
                        <Link  target="_black" href={`https://testnets.opensea.io/assets/mumbai/0x908Bb1431fCEB2309E55229D33dA830AbB7DE29B/${id}`}>
                          <div className=" hover:text-blue-800 font-semibold hover:underline">
                            Opensea
                          </div>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="text-5xl italic bold ">Nothing</div>
          )}
        </div>
      </div>
    </Layout>
)
  }




}

export default Nftview;
