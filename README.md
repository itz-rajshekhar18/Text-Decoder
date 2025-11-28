# 🔐 On-Chain Text Decoder — Caesar Cipher

Welcome to the **On-Chain Text Decoder** project — a simple, beginner-friendly blockchain application that demonstrates how smart contracts can be used for more than just tokens and finance.  
This project takes the classic **Caesar Cipher decoding technique** and runs it **on-chain**, making it fully transparent, verifiable, and unstoppable.

---

## 📌 Project Description

This project allows users to decode Caesar-cipher encoded text using a deployed smart contract on the blockchain.  
Instead of relying on a backend server or local logic, the decoding happens **directly inside the blockchain**, ensuring:

- Trustless execution  
- On-chain transparency  
- No centralized dependency  

You interact with the smart contract through a simple UI where you input the encoded message and shift key — and the blockchain returns the decoded result.

Perfect for:

- Web3 Beginners  
- Students learning Solidity  
- Developers exploring smart contract → frontend integration  
- Blockchain experimentation projects  

---

## 🛠 What It Does

✔ Takes an encoded string  
✔ Accepts a numeric shift value  
✔ Uses the Caesar decoding algorithm  
✔ Returns a readable decoded message — **computed on-chain**

No wallet signing for the read function. No gas to decode. Just blockchain logic in action.

---

## ✨ Features

- 🔹 **Fully On-Chain Text Decoding**
- 🔹 **Beginner-Friendly Code and UI**
- 🔹 **Wallet Connection (Web3-Enabled UI)**
- 🔹 **No Deployment Arguments Required**
- 🔹 **Secure, Immutable Logic**
- 🔹 **Uses wagmi + viem + React for seamless integration**

---

## 📍 Deployed Smart Contract

👉 Contract: **XXX**  
(Replace this with your live deployed contract link when ready)

---

## 📄 Smart Contract Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title TextDecoder (Caesar cipher demo)
/// @author
/// @notice Simple contract showing how to decode text using a Caesar shift
/// @dev No constructor inputs — deployable without any parameters
contract TextDecoder {
    /// @notice Decode a string encoded with a Caesar cipher
    /// @param encoded The encoded text to decode
    /// @param shift  The shift used when encoding (0-255). The function will shift letters backward by `shift`.
    /// @return decoded A new string with A-Z and a-z shifted back by `shift`. Other characters unchanged.
    function caesarDecode(string calldata encoded, uint8 shift)
        external
        pure
        returns (string memory decoded)
    {
        bytes memory b = bytes(encoded);
        for (uint i = 0; i < b.length; i++) {
            uint8 char = uint8(b[i]);

            // lowercase a-z
            if (char >= 97 && char <= 122) {
                // map to 0-25, subtract shift, wrap, map back
                uint8 alphaIndex = char - 97;
                uint8 newIndex = uint8((uint16(alphaIndex) + 26 - (shift % 26)) % 26);
                b[i] = bytes1(newIndex + 97);
            }
            // uppercase A-Z
            else if (char >= 65 && char <= 90) {
                uint8 alphaIndex = char - 65;
                uint8 newIndex = uint8((uint16(alphaIndex) + 26 - (shift % 26)) % 26);
                b[i] = bytes1(newIndex + 65);
            }
            // other characters stay the same (spaces, punctuation, digits, etc.)
        }
        return string(b);
    }
}
