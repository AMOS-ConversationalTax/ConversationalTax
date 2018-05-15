import 'react-native';
import React from 'react';
import FileServices from './FileServices';

describe('FileServices:', () => {

    // stringToCharCodeArray()

    it('stringToCharCodeArray() - Empty string', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = '';
        let output: Array<number> = [];

        // Test the function
        expect(fs.stringToCharCodeArray(input)).toEqual(output);
    
    });

    it('stringToCharCodeArray() - String without special characters', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = 'Test';
        let output: Array<number> = [84, 101, 115, 116];

        // Test the function
        expect(fs.stringToCharCodeArray(input)).toEqual(output);
    
    });

    it('stringToCharCodeArray() - String with common special characters', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = 'Test !&%*+';
        let output: Array<number> = [84, 101, 115, 116, 32, 33, 38, 37, 42, 43];

        // Test the function
        expect(fs.stringToCharCodeArray(input)).toEqual(output);
    
    });

    it('stringToCharCodeArray() - String with less common special characters', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = 'Test «mdatÚ©¶';
        let output: Array<number> = [84, 101, 115, 116, 32, 171, 109, 100, 97, 116, 218, 169, 182];

        // Test the function
        expect(fs.stringToCharCodeArray(input)).toEqual(output);
    
    });

    // charCodeArrayToBitArray() 

    it('charCodeArrayToBitArray() - Empty input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [];
        let output: Array<number> = [];

        // Test the function
        expect(fs.charCodeArrayToBitArray(input)).toEqual(output);
    
    });

    it('charCodeArrayToBitArray() - Small charCode that has to be filled up to 8 Bits (1)', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [23];
        let output: Array<number> = [0, 0, 0, 1, 0, 1, 1, 1];

        // Test the function
        expect(fs.charCodeArrayToBitArray(input)).toEqual(output);
    
    });

    it('charCodeArrayToBitArray() - Small charCode that has to be filled up to 8 Bits (2)', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [84];
        let output: Array<number> = [0, 1, 0, 1, 0, 1, 0, 0];

        // Test the function
        expect(fs.charCodeArrayToBitArray(input)).toEqual(output);
    
    });

    it('charCodeArrayToBitArray() - Small charCode that has to be filled up to 8 Bits (3)', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [32];
        let output: Array<number> = [0, 0, 1, 0, 0, 0, 0, 0];

        // Test the function
        expect(fs.charCodeArrayToBitArray(input)).toEqual(output);
    
    });

    it('charCodeArrayToBitArray() - High charCode that matches 8 Bits', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [231];
        let output: Array<number> = [1, 1, 1, 0, 0, 1, 1, 1];

        // Test the function
        expect(fs.charCodeArrayToBitArray(input)).toEqual(output);
    
    });

    it('charCodeArrayToBitArray() - High charCode that is longer than 8 Bits', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [2312];
        let output: Array<number> = [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0];

        // Test the function
        expect(fs.charCodeArrayToBitArray(input)).toEqual(output);
    
    });

    it('charCodeArrayToBitArray() - Three charCodes', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [23,231,2312];
        let output: Array<number> = [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0];

        // Test the function
        expect(fs.charCodeArrayToBitArray(input)).toEqual(output);
    
    });

    it('charCodeArrayToBitArray() - Exception: Negative integers in input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input 
        let input: Array<number> = [-231];

        // Test the function
        expect(() => {fs.charCodeArrayToBitArray(input)}).toThrow();
    
    });

    it('charCodeArrayToBitArray() - Exception: Not only integers in input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input 
        let input: Array<number> = [23, 342.12];

        // Test the function
        expect(() => {fs.charCodeArrayToBitArray(input)}).toThrow();
    
    });

    it('charCodeArrayToBitArray() - Exception: Negative floats in input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input 
        let input: Array<number> = [-23.31];

        // Test the function
        expect(() => {fs.charCodeArrayToBitArray(input)}).toThrow();
    
    });

    // bitArrayToBase64String()

    it('bitArrayToBase64String() - Empty input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [];
        let output: String = '';

        // Test the function
        expect(fs.bitArrayToBase64String(input)).toEqual(output);
    
    });

    it('bitArrayToBase64String() - Empty input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [];
        let output: String = '';

        // Test the function
        expect(fs.bitArrayToBase64String(input)).toEqual(output);
    
    });

    it('bitArrayToBase64String() - Short input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [0, 1, 1, 1, 0, 1, 1, 0];
        let output: String = 'dg==';

        // Test the function
        expect(fs.bitArrayToBase64String(input)).toEqual(output);
    
    });

    it('bitArrayToBase64String() - Medium input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> = [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1];
        let output: String = 'RK6V';

        // Test the function
        expect(fs.bitArrayToBase64String(input)).toEqual(output);
    
    });

    it('bitArrayToBase64String() - Large input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: Array<number> =  [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1,
                                    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1];
        let output: String = 'AIldK9/lfw==';

        // Test the function
        expect(fs.bitArrayToBase64String(input)).toEqual(output);
    
    });

    it('bitArrayToBase64String() - Exception: Only 0 and 1 in input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input 
        let input: Array<number> = [0, 0, 1, 3];

        // Test the function
        expect(() => {fs.bitArrayToBase64String(input)}).toThrow();
    
    });

    it('bitArrayToBase64String() - Exception: Only 0 and 1 in input (2)', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input 
        let input: Array<number> = [0, 0, 1, -3];

        // Test the function
        expect(() => {fs.bitArrayToBase64String(input)}).toThrow();
    
    });

    it('bitArrayToBase64String() - Exception: Only 0 and 1 in input (3)', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input 
        let input: Array<number> = [0, 0, 1, 0.10];

        // Test the function
        expect(() => {fs.bitArrayToBase64String(input)}).toThrow();
    
    });

    // stringToBitArray()

    it('stringToBitArray() - Empty input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = '';
        let output: Array<number> = [];

        // Test the function
        expect(fs.stringToBitArray(input)).toEqual(output);

    });

    it('stringToBitArray() - String without special characters', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = 'Test';
        let output: Array<number> = [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0,
                                     1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0];

        // Test the function
        expect(fs.stringToBitArray(input)).toEqual(output);

    });

    it('stringToBitArray() - String with common special characters (1)', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = '!§2&';
        let output: Array<number> = [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0,
                                     0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0];

        // Test the function
        expect(fs.stringToBitArray(input)).toEqual(output);

    });

    it('stringToBitArray() - String with common special characters (2)', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = 'Test a special (!!!) Base64 converting function #cool';
        let output: Array<number> = [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0,
                                     1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0,
                                     1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                                     0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1,
                                     0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0,
                                     0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 
                                     0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
                                     0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
                                     0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 
                                     0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
                                     0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1,
                                     1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1,
                                     0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0,
                                     0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1,
                                     1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1,
                                     0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0,
                                     0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0,
                                     1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0,
                                     1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                                     1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0,
                                     0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1,
                                     0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
                                     1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
                                     1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
                                     0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0];

        // Test the function
        expect(fs.stringToBitArray(input)).toEqual(output);

    });

    // stringToBase64String()

    it('stringToBase64String() - Empty input', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = '';
        let output: String = '';

        // Test the function
        expect(fs.stringToBase64String(input)).toEqual(output);

    });

    it('stringToBase64String() - String without special characters', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = 'Test';
        let output: String = 'VGVzdA==';

        // Test the function
        expect(fs.stringToBase64String(input)).toEqual(output);

    });

    it('stringToBase64String() - String with common special characters', () => {

        // Create FileServices object
        let fs: FileServices = new FileServices();

        // Input and expected output
        let input: string = 'Test a special (!!!) Base64 converting function #cool';
        let output: String = 'VGVzdCBhIHNwZWNpYWwgKCEhISkgQmFzZTY0IGNvbnZlcnRpbmcgZnVuY3Rpb24gI2Nvb2w=';

        // Test the function
        expect(fs.stringToBase64String(input)).toEqual(output);

    });

});