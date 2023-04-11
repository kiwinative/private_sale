"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"

interface ContextProps {
    amount: string,
    setAmount: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    amount: "",
    setAmount: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
    }
})

export const GlobalContextProvider = ({ children }) => {
    const [amount, setAmount] = useState('')

    return (
        <ThirdwebProvider activeChain={ChainId.BinanceSmartChainMainnet} dAppMeta={{
            name: "KiwiNative",
            description: "Kiwinative is a web3 based project that focuses on enhancing peer to peer transactions and improves usability and profitability.",
            logoUrl: "https://kiwinative.pro/logo.png",
            url: "https://kiwinative.pro",
          }}>
        <GlobalContext.Provider value={{amount, setAmount }}>
            {children}
        </GlobalContext.Provider>
        </ThirdwebProvider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);