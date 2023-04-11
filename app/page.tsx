"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import logo from '../public/logo.svg'
import { ConnectWallet } from '@thirdweb-dev/react'
import { useGlobalContext } from './Context/store';
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { crowdsale_details } from './contract';
import { ethers } from 'ethers';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {amount, setAmount} = useGlobalContext()

  const address = useAddress();
  const signer = useSigner();
  const contract = new ethers.Contract(crowdsale_details['contract address'], crowdsale_details.abi, signer)
  const toWei = (ether: string) => ethers.utils.parseEther(ether)

  const buyTokens = async () => {
      const wei = toWei(amount)
      await contract.buyTokens(address, {value: wei})
  }
  return (
    <div className='bg-[#000000] w-full h-full flex flex-col p-[20px] items-center gap-[40px]'>
      {/* header */}
      <div className='flex flex-row md:px-[60px] justify-between space-x-[50px] items-center sm:space-x-[100px] lg:space-x-[350px] xl:space-x-[600px]'>
        {/* left-side */}
        <div className='flex flex-row flex-wrap gap-3'>
          <div className='flex flex-row'>
          <Image src={logo} alt={'Kiwinative'} className='h-[35px] w-[35px]'/>
          <h3 className='hidden xs:block text-white font-semibold sm:text-[20px] mt-[8px] p-0'>KIWINATIVE</h3>
          </div>
          <div className='hidden sm:flex flex-row gap-2 mt-[14px] text-[14px]'>
            <a href="http://kiwwinative.pro">
            <h5 className='text-white cursor-pointer'>Home</h5>
            </a>
            <a href="http://">
            <h5 className='text-white cursor-pointer'>Whitepaper</h5>
            </a>
          </div>
        </div>
        {/* right-side */}
        <ConnectWallet/>
      </div>
      <div className='bg-[#262626] p-[25px] text-white rounded-[10px] space-y-[10px] max-w-[400px]'>
        <div className='flex flex-col flex-wrap items-center mb-[20px]'>
          <h4 className='text-[24px] font-medium'>KIWINATIVE</h4>
          <h3 className='text-[45px] font-light'>Private Sale</h3>
        </div>
        <hr className='border-[#b9b9b9]'/>
        <p className='text-[12px] text-[#a2cf2f]'>NOTICE:</p>
        <p className='text-[#b9b9b9]'>Congrats! You're selected for Kiwinative's private sale. Don't miss out, act now and enjoy exclusive offers!</p>
        <hr className='border-[#b9b9b9]'/>
        <p className='text-[12px] text-[#a2cf2f]'>HOW TO PARTICIPATE:</p>
        <ul className='text-[#b9b9b9] list-disc'>
          <li>Connect Your wallet and make sure its on Smart chain</li>
          <li>Enter the amount and click on purchase token</li>
          <li>Import token into your wallet if its not already imported to see purchased token</li>
        </ul>
        <hr className='border-[#b9b9b9]'/>
        <div className='flex flex-col gap-7'>
        <div className='bg-[#686868] rounded-md p-2 flex items-center'>
        <p className='text-white'>Private sale price: 0.00000125</p>
        </div>
        <div  className='flex flex-col items-center justify-between space-y-3'>
          <input type="number" placeholder='0.00 BNB' onChange={e => setAmount(e.target.value)} className='bg-transparent rounded-lg focus:outline-none border-[1px] p-2 border-solid border-[#6c8726] ' />
          <input type="button" value="Purchase Token" className='cursor-pointer bg-[#6c8726] hover:bg-[#89ad2e] p-2 rounded-md' onClick={() => buyTokens()}/>
        </div>
        </div>
      </div>
    </div>
  )
}