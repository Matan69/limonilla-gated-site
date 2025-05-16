const contractAddress = "0x9217da7a278ddb9e99538e645bcd65ba3dda724e";
const tokenId = 1;

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  document.getElementById("status").innerText = `Wallet connected: ${address}`;

  const abi = ["function ownerOf(uint256 tokenId) view returns (address)"];
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const owner = await contract.ownerOf(tokenId);
    if (owner.toLowerCase() === address.toLowerCase()) {
      document.getElementById("content").style.display = "block";
    } else {
      document.getElementById("status").innerText = "You don't own the Limonilla NFT.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error checking NFT ownership.";
  }
}
