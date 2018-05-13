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

        // Copied Input array - we might need to push some new elements later on
        let inputBitArrayCopy: Array<number> = inputBitArray.slice();

        // Base64 Coding
        let base64Coding: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        
        // Initialize the output string
        let outputString: String = "";
        
        // Iterate through the bit array (for bash64 we need steps of six bits)
        for(let i: number = 0; i < inputBitArray.length; i = i + 6) {

            // The block of the last six bits might not be complete
            if(i + 6 < inputBitArray.length) {

                // Compute the corresponding decimal number to the six bits
                let sixBitNumber: number = inputBitArrayCopy[i] * Math.pow(2, 5) + inputBitArrayCopy[i+1] * Math.pow(2, 4) + inputBitArrayCopy[i+2] * Math.pow(2, 3)
                                        + inputBitArrayCopy[i+3] * Math.pow(2, 2) + inputBitArrayCopy[i+4] * Math.pow(2, 1) + inputBitArrayCopy[i+5] * Math.pow(2, 0);

                outputString = outputString.concat(base64Coding[sixBitNumber]);

            }

        }

        // For every bit of the incomplete block we would need to add an =
        for(let i: number = 0; i < 6 - (inputBitArray.length % 6); i++) {

            outputString = outputString.concat("=");

        }

        return outputString;

    }

    // Convert an string to Base64
    public stringToBase64String(inputString: String): String {

        // Covert the string to a byte array
        let byteArray: Array<number> = this.stringToByteArray(inputString);

        // Convert the byte array to a bit array
        let bitArray: Array<number> = this.byteArrayToBitArray(byteArray);

        // Convert the bit array to a Base64 String
        let base64String: String = this.bitArrayToBase64String(bitArray);

        return base64String;

    }

    // Load a file an convert it to a Base64 string
    public async fileToBase64String(filepath: String): Promise<String> {

        // Get the file content
        let fileContent = await this.loadFileToString(filepath);

        return this.stringToBase64String(fileContent);

    }

}

