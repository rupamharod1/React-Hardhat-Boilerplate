import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import "./styles.css";
import { ethers } from "ethers";
import { Form, Button } from "react-bootstrap"
import { CircularProgress } from "@mui/material"

import Greeter from "../artifacts/Greeter.sol/Greeter.json";
import { contractAddress, networkDeployedTo } from "../utils/contracts-config";
import networksMap from "../utils/networksMap.json";

const Home = () => {

    const data = useSelector((state) => state.userData.value)

    const [loading, setLoading] = useState(false)
    const [greeting, setGreeting] = useState("")
    const [newGreeting, setNewGreeting] = useState("")

    async function getGreeting() {
        if (data.network === networksMap[networkDeployedTo]) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const greeter = new ethers.Contract(contractAddress, Greeter.abi, provider);
            const currentGreeting = await greeter.greet()

            if (currentGreeting !== undefined) {
                setGreeting(currentGreeting)
            }
        }
    }

    async function changeGreeting() {
        if (data.network === networksMap[networkDeployedTo]) {
            try {
                setLoading(true)
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                const signer = provider.getSigner()
                const greeter = new ethers.Contract(contractAddress, Greeter.abi, signer);
                const set_tx = await greeter.setGreeting(newGreeting)
                await set_tx.wait()

                setNewGreeting("")
                setLoading(false)
                getGreeting()

            } catch (err) {
                console.log(err)
                setLoading(false)
            }
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
                <div className="home-container-text">
                    <h1>React Demo App</h1>
                </div>
                <br />
                {data.account !== "" ? (
                    data.network === networksMap[networkDeployedTo] ? (
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
                            <h4>{`Please Switch to the ${networksMap[networkDeployedTo]} network`}</h4>
                        </div>
                    )
                ) : null}
            </div>
        </div >
    );
};

export default Home;
