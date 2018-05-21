# Testing with Jest und Typescript
This is more or less a summary of the [Jest docs](https://facebook.github.io/jest/docs/en/getting-started.html) with a focus on code snippets. Take a look there if you miss anything! 

## Basics

### Things you need to know before
1. Run the tests with `npm run test`.
2. Unit test are always stored in a .spec.ts file and places along the regular .ts file. 
3. Both our Frontend and our Backend use the same Testing-Framework.

### Test structure
You may follow the following structure for writing Unit Tests:

```typescript
// Import statments
// Global const, mocks, etc... 

describe('ClassNameGoesHere', () => {

    beforeEach(() => {
        // Init code
    });

    describe('FunctionNameOne', () => {
        it('should return true on success', () => {
            // Run code and check result
        });

        it('should do XYZ', () => {
            // Run code and check result
        });
    });

    describe('FunctionNameTwo', () => {
        // ....
    });
});
```
### Testing Basic Classes (e.g. Services)
This applies to frontend services and most of our backend classes. See below how to test React Components.
For this example we want to test a DummyService.

dummyService.ts
```typescript
export DummyService {
    public containsOnlyNumbers(text: string): boolean {
        return text.match(/^[0-9]+$/) != null;
    }
}
```
dummyService.spec.ts
```typescript
import DummyService from './DummyService';

describe('ClassNameGoesHere', () => {
    let dummyService: DummyService;

    beforeEach(() => {
        // Create a new and clean instance before each test
        dummyService = new DummyService(); 
    });

    describe('containsOnlyNumbers', () => {
        it('should return true if input only contains', () => {
            const result = dummyService.contcontainsOnlyNumbers('012345');
            expect(result).toBe(true); 
        });

        it('should return false if input also conains letters', () => {
            const result = dummyService.contcontainsOnlyNumbers('012sdfdsf345');
            expect(result).toBe(false); 
        });
    });
});
```

### Mocking Functions
You may want to check whether your class correctly calls another function. (Normally you'll call a function of another class. We'll take a loke at that afterwards.)

dummyService.ts
```typescript
export DummyService {
    public containsOnlyNumbers(text: string, containsLetters: () => boolean): boolean {
        return !containsLetters(text);
    }
}
```
dummyService.spec.ts
```typescript
// Import 

describe('ClassNameGoesHere', () => {
    // beforeEach - See above

    describe('containsOnlyNumbers', () => {
        // ...

        it('should call the function containsLetters', () => {
            // Create a Spy/Mock function wich always returns true;
            const containsLetters = jest.fn().mockReturnValue(true);
            // jest.fn() creates a mock, which would return undefined
            const result = dummyService.contcontainsOnlyNumbers('abc', containsLetters);
            expect(result).toBe(false); 
            expect(containsLetters).toHaveBeenCalled();
            expect(containsLetters).toHaveBeenCalledWith('abc');
        });
    });
});
```

### Mocking Classes
Since your normally calling functions of a class, you need to mock the whole class. With the method below you may mock any class. You can even mock external dependencies like Expo etc.

dummyService.ts
```typescript
import TypeHelper from './TypeHelper';
export DummyService {
    private typeHelper = new TypeHelper();

    public containsOnlyNumbers(text: string): boolean {
        return !this.typeHelper.containsLetters(text);
    }
}
```
dummyService.spec.ts
```typescript
// Import 

jest.mock('./TypeHelper', () => ({ // Auto mock the class
    // specifiy the function Spy
    containsLetters: jest.fn().mockReturnValue(true);
}));

describe('ClassNameGoesHere', () => {
    // beforeEach

    describe('containsOnlyNumbers', () => {
        // ...

        it('should call the function containsLetters', () => {
            const result = dummyService.contcontainsOnlyNumbers('abc');
            expect(result).toBe(false); 
            // Check against the mocked class
            expect(TypeHelper.containsLetters).toHaveBeenCalled();
            expect(TypeHelper.containsLetters).toHaveBeenCalledWith('abc');
        });
    });
});
```

### Testing async functions
Just add the async keyword to the arrow function and you're go to go to use the await keyword.

```typescript
it('should return true on success', async () => {
    const result = await recordingService.askForPermissions();
    expect(result).toBe(false);
});
```


## Tests for React Native

Will be added later as soon as we get more experience with it.

