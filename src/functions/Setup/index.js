import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


const providerOptions = {
    injected: {
        display: {
            name: "MetaMask",
        },
        package: null
    },
    walletconnect: {
        display: {
            name: "Mobile",
        },
        package: WalletConnectProvider, 
        options: {
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1"
        }
    }
};
  
const web3Modal = new Web3Modal({
    network: "mainnet", 
    cacheProvider: true, 
    providerOptions
});

const { ethereum } = window

let { web3 } = window
export const connectWallet = async () => {
    if (ethereum) {
        try {
            const provider = await web3Modal.connect();
            web3 = new Web3(provider)
            return true
        } catch (e) {
            console.error(e)
            throw new Error("User denied wallet connection!")
        }
    } else {
        throw new Error("No web3 detected!")
    }
}

export const connectNetwork = async () => {
    const _chainId = await ethereum.request({method: "eth_chainId"});
    if (_chainId != 0x3) {
        await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId: "0x3"}]
        });
    }
    return true;
}

export const getCoinbase = async () => {
    const accounts =  await ethereum.request({ method: 'eth_accounts' })
    
    return accounts.length > 0 ? accounts[0] : ""
}





