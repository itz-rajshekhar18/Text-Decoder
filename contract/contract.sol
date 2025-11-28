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