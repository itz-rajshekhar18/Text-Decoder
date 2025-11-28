export const contractAddress = "0xD8735BBCA6Ba176525CB5AcfFbA4Ac5E730720fF";

// Export only the ABI array expected by viem/wagmi
export const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "encoded",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "shift",
        "type": "uint8"
      }
    ],
    "name": "caesarDecode",
    "outputs": [
      {
        "internalType": "string",
        "name": "decoded",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
] as const;