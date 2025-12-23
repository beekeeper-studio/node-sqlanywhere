# Test Suite

This directory contains the test suite for the SQL Anywhere Node.js driver.

## Running Tests

```bash
npm test
```

## Test Structure

### basic.test.js

Contains basic tests that verify:
- Module loading
- Connection object creation
- API availability (connect, disconnect, exec, prepare, commit, rollback)
- Error handling
- Module stability with multiple connections

These tests do not require an actual SQL Anywhere database connection and focus on:
- Native module loading
- JavaScript API availability
- Basic error handling

## Adding Tests

When adding new tests:

1. Create a new file in the `test/` directory with the `.test.js` extension
2. Use the Mocha test framework with the standard `describe()` and `it()` functions
3. Tests will automatically be picked up by the test runner

## CI/CD

Tests are automatically run on:
- Pull requests
- Commits to master/main branch

Tests run against:
- Multiple Node.js versions (18.x, 20.x, 22.x)
- Multiple Electron versions (30.0.0, 32.0.0, 33.0.0, 39.2.7)
- Multiple operating systems (Ubuntu, macOS, Windows)
