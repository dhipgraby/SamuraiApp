import { ethers } from 'ethers';



export default class TxListener {
    private provider: any;

    async getTransaction(hash: string) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.provider = new ethers.BrowserProvider(window.ethereum)
        const tx = await this.provider.getTransaction(hash)
        console.log("tx", tx);
    }

}
