const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/L-CdtCDioer5lBFsvQjDRg2N0y1CkkQC"
    );

    const wallet = new ethers.Wallet(
        "4f41887c1122723abe301bdb6d5f5179c4e3471bbd1ea8571b7f77f065ee12e5",
        provider
    );

    const abi = fs.readFileSync("_mnt_c_Users_Shivaraj Manikashett_Desktop_scholar_scs_sol_ScholarshipCredit.abi", "utf8");
    const binary = fs.readFileSync("_mnt_c_Users_Shivaraj Manikashett_Desktop_scholar_scs_sol_ScholarshipCredit.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Contract is deploying...");

    // Manually set gas limit (e.g., 3000000)
    const gasLimit = 3000000;
    
    const contract = await contractFactory.deploy({ gasLimit });
    console.log(contract); 
    console.log("Contract deployed! 🥂🥂");
    
    console.log(contract.address) 
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });