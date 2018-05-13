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
    public stringToCharCodeArray(inputString: String): Array<number> {

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

    // Convert a char code array into a bit array
    public charCodeArrayToBitArray(inputByteArray: Array<number>): Array<number> {

        // Initialize a new bit array
        let bits: Array<number> = new Array<number>();

        // Iterate through the byte array
        for(let i: number = 0; i < inputByteArray.length; ++i) {

            // Current byte
            let byte: number = inputByteArray[i];

            // Test preconditions
            if(byte < 0 || byte % 1 != 0) {

                throw 'Only positive integers are accepted';

            } 

            // Find the highest contained potency of two
            // Start potency
            let potencyOfTwo: number = 0;

            // Try a higher potency
            while(byte >= Math.pow(2,potencyOfTwo)) {

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

            // There have to be at least 8 bits per byte (Javascript string coding is UTF16)
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

        // Test preconditions
        for(let i: number = 0; i < inputBitArray.length; i++) {

            if(!(inputBitArray[i] == 0 || inputBitArray[i] == 1)) {

                throw 'Array must have only 0 and 1 as elements allowed';

            } 

        }

        // Copied Input array - we need to push some new elements later on
        let inputBitArrayCopy: Array<number> = inputBitArray.slice();

        // Base64 Coding
        let base64Coding: Array<string> = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
        
        // Initialize the output string
        let outputString: String = '';

        // We need to fill up the copied input array to be dividable through 8
        if(inputBitArray.length % 8 != 0) {
            
            for(let i: number = 0; i < 8 - inputBitArray.length % 8; i++) {

                inputBitArrayCopy.unshift(0);

            }

        }

        // We need to fill up the copied input array to be dividable through 6
        if(inputBitArrayCopy.length % 6 != 0) {

            // We need to cache the inputBitArrayCopy.length
            let inputBitArrayCopyLength = inputBitArrayCopy.length;
            
            for(let i: number = 0; i < 6 - inputBitArrayCopyLength % 6; i++) {

                inputBitArrayCopy.push(0);

            }

        }

        // Iterate through the bit array (for bash64 we need steps of six bits)
        for(let i: number = 0; i < inputBitArrayCopy.length; i = i + 6) {

            // Compute the corresponding decimal number to the six bits
            let sixBitNumber: number = inputBitArrayCopy[i] * Math.pow(2, 5) + inputBitArrayCopy[i+1] * Math.pow(2, 4) + inputBitArrayCopy[i+2] * Math.pow(2, 3)
                                    + inputBitArrayCopy[i+3] * Math.pow(2, 2) + inputBitArrayCopy[i+4] * Math.pow(2, 1) + inputBitArrayCopy[i+5] * Math.pow(2, 0);

            outputString = outputString.concat(base64Coding[sixBitNumber]);

        }

        let fullByteLength: number = inputBitArray.length;

        // First we need to fill the array to match full bytes
        if(inputBitArray.length % 8 != 0) {

            fullByteLength = inputBitArray.length + 8 - inputBitArray.length % 8;

        }

        // Now we add an = for every byte we need to fill up to be divideable through 3
        for(let i: number = fullByteLength; i % 24 != 0; i = i + 8) {

            outputString = outputString.concat('=');

        }

        return outputString;

    }

    // Convert an string to Base64
    public stringToBitArray(inputString: String): Array<number> {

        // Covert the string to a byte array
        let byteArray: Array<number> = this.stringToCharCodeArray(inputString);

        // Convert the byte array to a bit array
        let bitArray: Array<number> = this.charCodeArrayToBitArray(byteArray);

        return bitArray;

    }

    // Convert an string to Base64
    public stringToBase64String(inputString: String): String {

        // Convert the string to a bit array
        let bitArray: Array<number> = this.stringToBitArray(inputString);

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

