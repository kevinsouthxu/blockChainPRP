import {react, useState, useEffect} from 'react'
import Web3 from 'web3'
import abi from '../tool/abi'
import detectEthereumProvider from '@metamask/detect-provider';
function HomePage () {
    let contract;
    let userAccount;
    let web3js;
    let ethereum = window.ethereum;
    const [accountAddress, setAccountAddress] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [status,setStatus] = useState("");
    const [userId,setUserId] = useState(0);
    const startApp = async () => {
        web3js= await detectEthereumProvider();
        console.log(web3js)
        setContractAddress("0x092818F20C19a7827614C29c8a9BF8769f168BeE")
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts);
        setAccountAddress(accounts[0]);
    }

    ethereum.on('accountsChanged', function (accounts) {
        setAccountAddress(accounts[0]);
    });

    const registerPatient = async () => {
        console.log('begin register...')
        // contract.methods.PatientRegister().send({ from: userAccount })
        //     .on("receipt", function(receipt) {
        //         // $("#txStatus").text("成功注册惹");
        //         setStatus("成功注册了")
        //         displayPatientId()
        //         console.log('successfully register!')
        //     })
        //     .on("error", function(error) {
        //         // $("#txStatus").text(error);
        //         setStatus(error)
        //         console.log('something wrong!')
        //     });
        const transactionParameters = {
            gas: 0,
            gasPrice: 0,
            to: contractAddress, // Required except during contract publications.
            from: accountAddress, // must match user's active address.

        };
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }).then(function(result) {
            console.log(result);
        })
        console.log(txHash);
    }

    const displayPatientId = async () => {
        const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: accountAddress, // must match user's active address.
        };
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }).then(function(result) {
            console.log(result);
        })
        console.log(txHash);
    }

    window.addEventListener('load', function() {
        console.log(ethereum)
        startApp().then(function(result){
            console.log(result);
        })
    })
    return(
        <>
        <a onClick={registerPatient}>注册</a>
        <a onClick={displayPatientId}>更新Id</a>
        <div>
            status: {status}
        </div>
        <div>
            userId: {userId}
        </div>
        </>
    )
}

export default HomePage;
