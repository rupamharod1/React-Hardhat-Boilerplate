/* global ethereum */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import "./styles.css";
import { ethers } from "ethers";
import { Form, Button } from "react-bootstrap"
import { CircularProgress } from "@mui/material"

import Greeter from "../artifacts/Greeter.sol/Greeter.json";
import { contractAddress, networkDeployedTo, testContractAddress , testNetworkDeployedTo} from "../utils/contracts-config";
import networksMap from "../utils/networksMap.json";

const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "2px 4px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    marginBottom: "10px",
  };

const Home = () => {

    const data = useSelector((state) => state.userData.value)

    const [loading, setLoading] = useState(false)
    const [greeting, setGreeting] = useState("")
    const [newGreeting, setNewGreeting] = useState("")

    async function getGreeting() {
        if (data.network === networksMap[networkDeployedTo] || data.network === networksMap[testNetworkDeployedTo]) {
            const chainId = await ethereum.request({ method: 'eth_chainId'});
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const greeter = new ethers.Contract(chainId == "0x2126e" ? contractAddress: testContractAddress, Greeter.abi, provider);
            const currentGreeting = await greeter.greet()
            if (currentGreeting !== undefined) {
                setGreeting(currentGreeting)
            }
        }
    }

    async function changeGreeting() {
        if (data.network === networksMap[networkDeployedTo] || data.network === networksMap[testNetworkDeployedTo])  {
            try {
                setLoading(true)
                const chainId = await ethereum.request({ method: 'eth_chainId'});
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                const signer = provider.getSigner()
                const greeter = new ethers.Contract(chainId == "0x2126e" ? contractAddress: testContractAddress, Greeter.abi, signer);
                const set_tx = await greeter.setGreeting(newGreeting)
                await set_tx.wait()
                getGreeting()
                setLoading(false)
                

            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }

    async function testNetwork() {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1929E' }],
          });
        } catch (switchError) {
            console.log("Network dosen't exist in metamask")
        }
    }

    async function mainNetwork() {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2126E' }],
        });
      } catch (switchError) {
          console.log("Network dosen't exist in metamask")
      }
  }

    useEffect(() => {
        if (window.ethereum !== undefined) {
            getGreeting()
        }
    }, [data.network])


    return (
        <div style={{ color: "white", backgroundColor: "#24252d" }}>
          <div className="homeContainer">
            {/* ... (existing code) */}
            {data.account !== "" ? (
              data.network === networksMap[networkDeployedTo] || data.network === networksMap[testNetworkDeployedTo] ? (
                <>
                  <div className="home-container-text">
                    <h4>Contract greeting: {greeting}</h4>
                  </div>
                  <div className="col-md-4 center" style={{ display: "inline-block" }}>
                    <div >
                      <Form.Control
                        type="text"
                        placeholder="Enter the new greeting"
                        onChange={e => setNewGreeting(e.target.value)} />
                    </div>
                    <br />
                    <Button type="submit" variant="warning" onClick={changeGreeting}>
                      {loading ? <CircularProgress color="inherit" /> : "Set"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="home-container-text">
                  <button style={buttonStyle} variant="contained" color="primary" onClick={testNetwork}>
                    Switch to Test Network
                  </button>
                  <br /> {/* Add a line break to create space */}
                  <button style={buttonStyle} variant="contained" color="primary" onClick={mainNetwork}>
                    Switch to Main Network
                  </button>
                </div>
              )
            ) : null}
          </div>
        </div >
      );
};

export default Home;
