import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import Expo, { FileSystem } from 'expo';

export default class FileServices {

    // Read a file within the Expo context as string
    private async loadFileToString(filepath: String): Promise<String> {
                
        // Get the content of the recorded file
        let file: String = await FileSystem.readAsStringAsync(filepath);

        // Return the file content
        return file;

    }

    // Convert a string to a byte array
    public stringToByteArray(inputString: String): Array<number> {

        // Initialize a new byte array
        let bytes: Array<number> = new Array<number>(inputString.length);

        // Iterate through the string
        for (let i: number = 0; i < inputString.length; ++i) {

            // Get the chars byte code
            let code = inputString.charCodeAt(i);
            
            // Insert the byte code into the array
            bytes[i] = code;

        }

        return bytes;

    }

    // Convert a byte array into a bit array
    public byteArrayToBitArray(inputByteArray: Array<number>): Array<number> {

        // Initialize a new bit array
        let bits: Array<number> = new Array<number>();

        // Iterate through the byte array
        for(let i: number = 0; i < inputByteArray.length; ++i) {

            // Current byte
            let byte: number = inputByteArray[i];

            // Find the highest contained potency of two
            // Start potency
            let potencyOfTwo: number = 0;

            // Try a higher potency
            while(byte > Math.pow(2,potencyOfTwo)) {

                potencyOfTwo++;

            }

            // Residual
            let residual: number = byte;

            // Array for the reverse order of the byte in bits
            let byteInBitsReverse: Array<number> = new Array<number>();

            // Go through every contained potency of two
            for(let y: number = 0; y < potencyOfTwo; y++)  {

                // Current bit
                let currentBit: number = residual % 2;

                // Current bit is the potency bit of the byteInBitsReverse array
                byteInBitsReverse[y] = currentBit;

                // New total residual
                residual = residual - Math.ceil(residual / 2);

            }

            // There have to be at least 8 bits per byte
            // We want to fill up with leading 0
            for(let y: number = 0; y < (8 - byteInBitsReverse.length); y++) {

                // Put the 0s into bits
                bits.push(0);

            }

            // Put byteInBitsReverse into bits in reverse order
            for(let y: number = byteInBitsReverse.length - 1; y >= 0; y--) {

                // Put the current bit into bits
                bits.push(byteInBitsReverse[y]);

            }

        }

        return bits;

    }

    // Convert a bit array into a base64 string
    public bitArrayToBase64String(inputBitArray: Array<number>): String {

        // Base64 Coding
        let base64Coding = {
            "000000": "A",
            "000001": "B",
            "000010": "C",
            "000011": "D",
            "000100": "E",
            "000101": "F",
            "000110": "G",
            "000111": "H",
            "001000": "I",
            "001001": "J",
            "001010": "K",
            "001011": "L",
            "001100": "M",
            "001101": "N",
            "001110": "O",
            "001111": "P",
            "010000": "Q",
            "010001": "R",
            "010010": "S",
            "010011": "T",
            "010100": "U",
            "010101": "V",
            "010110": "W",
            "010111": "X",
            "011000": "Y",
            "011001": "Z",
            "011010": "a",
            "011011": "b",
            "011100": "c",
            "011101": "d",
            "011110": "e",
            "011111": "f",
            "100000": "g",
            "100001": "h",
            "100010": "i",
            "100011": "j",
            "100100": "k",
            "100101": "l",
            "100110": "m",
            "100111": "n",
            "101000": "o",
            "101001": "p",
            "101010": "q",
            "101011": "r",
            "101100": "s",
            "101101": "t",
            "101110": "u",
            "101111": "v",
            "110000": "w",
            "110001": "x",
            "110010": "y",
            "110011": "z",
            "110100": "0",
            "110101": "1",
            "110110": "2",
            "110111": "3",
            "111000": "4",
            "111001": "5",
            "111010": "6",
            "111011": "7",
            "111100": "8",
            "111101": "9",
            "111110": "+",
            "111111": "/"
        }

        // Iterate through the bit array (for bash64 we need steps of 6)
        for(let i = 0; i < inputBitArray.length; i + 6) {

            // For the case there are not enough bits left
            //if(i + 6 <=  )

             // TODO

        }

    }

}

