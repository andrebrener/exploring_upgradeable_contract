const { writeFileSync } = require("fs");
const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyTokenUpgradeable = await ethers.getContractFactory(
    "MyTokenUpgradeable"
  );

  const mintAmount = ethers.utils.parseEther("1000000000000");

  const contract = await upgrades.deployProxy(
    MyTokenUpgradeable,
    [mintAmount],
    {
      initializer: "initialize",
      kind: "transparent",
    }
  );

  await contract.deployed();
  console.log("ERC20UpgradableV1 deployed to:", contract.address);

  writeFileSync(
    "deployment.json",
    JSON.stringify(
      {
        address: contract.address,
        args: [mintAmount],
      },
      null,
      2
    )
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
