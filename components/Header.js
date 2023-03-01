import React, { useContext, useEffect, useState } from 'react'
import { AppWrapper } from '../utils/context'
import Link from 'next/link'
import { Menu, MenuList, MenuItem, MenuHandler, Button,  } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image'
import { FaBars } from 'react-icons/fa'
export default function Header() {

  const { state, dispatch } = useContext(AppWrapper)
  const { cart } = state;
  const router = useRouter()
  const [cartItemsCount, setcartItemsCount] = useState(0)
  const [cartItemTotal, setCartItemTotal] = useState(0);

  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });


  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
    console.log("showLinks")
  };



 

  
  useEffect(() => {

    setcartItemsCount(cart.cartItem.reduce((a, c) => a + c.quantity, 0))
    setCartItemTotal(cart.cartItem.reduce((a, c) => a + c.quantity * c.price, 0))


    

  }, [cart.cartItem])


  return (
    <div className='flex border-6 fixed   z-10 w-full bg-white h-16  sm:px-4  shadow-md items-center justify-between'>
  <div className='z-1'>

        
        <Link href="/">
        <Image src="/images/NFT-logo.png" className="sm:ml-20" alt="logo" width={100} height="50" />
        </Link>
  </div>


    <div onClick={() => toggleLinks()} className="mx-4  flex sm:hidden">
      <FaBars/>
    </div>


      <div  className={`items-center  flex ${showLinks ? ' h-screen top-14 bg-white right-0 absolute flex flex-col rounded px-5  transition-transform  gap-4 pt-10  ' : "hidden sm:flex    "}`} >
      <ConnectButton   />
        <Menu>
        <Link href='/nftview'>
            <Button className=" sm:mx-5 bg-[#21248A] flex   items-center">          
            View NFT          
            </Button>
            </Link>
          <MenuHandler>
            <button className='flex relative'>

            {showLinks ? (
            <div>
              Cart Items : {cartItemsCount}
            </div>)  : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 relative w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            )}

              {cart.cartItem.length > 0 && (
                <a className='h-min text-white rounded-full px-1 absolute top-0 right-0 text-xs bg-[#0000ff] '>
                  {cartItemsCount}
                </a>
              )}
            </button>
          </MenuHandler>
          <MenuList>
            <MenuItem className='text-black pb-0 hover:bg-white cursor-default'>{cartItemsCount} Items</MenuItem>
            <MenuItem className='text-[#21248A] pt-1 pb-4 hover:bg-white  cursor-default'>Subtotal : {dollarUS.format(cartItemTotal)}</MenuItem>
           <Button className='bg-[#21248A]' onClick={() => router.push("/cart2")} fullWidth>View Cart</Button>
          </MenuList>
        </Menu>
      </div>

    </div>
  )
}
