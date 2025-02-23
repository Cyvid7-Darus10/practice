/**
 * Test Suite: Sum to N Functions
 *
 * This test suite validates the correctness of the three sum-to-n implementations
 * provided in solution.js. It leverages Node.js's built-in 'assert' module to ensure
 * that each implementation returns the expected result for a variety of test cases.
 *
 * Note:
 *  - JavaScript's number type has precision limitations, so these tests only use inputs
 *    that produce results below Number.MAX_SAFE_INTEGER.
 *  - Due to potential call stack limitations, the recursive approach is tested only
 *    with relatively small inputs.
 */

const assert = require("assert");
const {
  sumToNIterative,
  sumToNRecursive,
  sumToNFormula,
} = require("./solution");

// Define test cases for safe integer arithmetic.
const testCases = [
  { n: 0, expected: 0 },
  { n: 1, expected: 1 },
  { n: 5, expected: 15 },
  { n: 10, expected: 55 },
  { n: 100, expected: 5050 },
  { n: 1000, expected: 500500 },
  { n: 10000, expected: 50005000 },
  { n: 100000, expected: 5000050000 },
  { n: 1000000, expected: 500000500000 },
  { n: 10000000, expected: 50000005000000 },
  { n: 100000000, expected: 5000000050000000 },
];

/**
 * Executes a series of tests for a provided sum function.
 *
 * @param {Function} sumFunction - The function under test.
 * @param {string} functionName - A descriptive name for the function.
 * @param {Array} cases - An array of test cases to run.
 */
function runTests(sumFunction, functionName, cases) {
  console.log(`\nRunning tests for ${functionName}:`);

  cases.forEach(({ n, expected }) => {
    const result = sumFunction(n);
    try {
      assert.strictEqual(result, expected);
      console.log(`✓ Passed for n = ${n}: result = ${result}`);
    } catch (error) {
      console.error(
        `✗ Failed for n = ${n}: expected ${expected}, but got ${result}`
      );
      throw error;
    }
  });

  console.log(`All tests passed for ${functionName}.`);
}

// For the recursive approach, limit tests to smaller n values to avoid call stack overflow.
const recursiveTestCases = testCases.filter(({ n }) => n <= 1000);

// Run tests for each implementation.
runTests(sumToNIterative, "sumToNIterative (Iterative Approach)", testCases);
runTests(
  sumToNRecursive,
  "sumToNRecursive (Recursive Approach)",
  recursiveTestCases
);
runTests(sumToNFormula, "sumToNFormula (Mathematical Formula)", testCases);

console.log("\nAll test suites completed successfully.");
