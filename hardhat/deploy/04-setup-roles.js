const { ethers } = require("hardhat")

require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { get } = deployments;

    const governor = await get("GovernorContract")
    const timeLock = await get("TimeLock")
    const token = await get("DataGovernanceToken")

    // Setup sales and limits in DataGovernanceToken
    console.log("Setting up token...")
    const tokenContract = await ethers.getContractAt("DataGovernanceToken", token.address)
    const setSalesSettingsTx = await tokenContract.setSalesSettings(timeLock.address, 1);
    await setSalesSettingsTx.wait();
    console.log("Sales Settings in Token set!")
    const setLimitsTx = await tokenContract.setLimits(10, 100);
    await setLimitsTx.wait();
    console.log("Limit Settings in Token set!")

    //Set Roles in TimeLock.sol
    //This gives control only to DAO
    console.log("Setting roles in TimeLock.sol")
    const timeLockContract = await ethers.getContractAt("TimeLock", timeLock.address)
    
    const proposerRole = await timeLockContract.PROPOSER_ROLE()
    const executorRole = await timeLockContract.EXECUTOR_ROLE()
    const adminRole = await timeLockContract.TIMELOCK_ADMIN_ROLE()
  
    const proposerTx = await timeLockContract.grantRole(proposerRole, governor.address)
    await proposerTx.wait()
    const executorTx = await timeLockContract.grantRole(executorRole, "0x0000000000000000000000000000000000000000")
    await executorTx.wait()
    const revokeTx = await timeLockContract.revokeRole(adminRole, wallet.address)
    await revokeTx.wait()
    console.log("Roles in TimeLock.sol set!")
}