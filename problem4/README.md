# Three Ways to Sum to n – TypeScript Implementations

This repository is the solution for **Problem 4: Three Ways to Sum to n**. It provides three distinct TypeScript implementations for calculating the summation of all natural numbers from 1 to n, each showcasing a unique approach along with commentary on its time and space complexity.

---

## Task Overview

- **Multiple Implementations:**  
  Implement three unique versions of the summation function:
  - **Iterative Approach (`sumToNIterative`):**  
    Uses a loop to accumulate the sum.  
    *Time Complexity:* O(n)  
    *Space Complexity:* O(1)
    
  - **Recursive Approach (`sumToNRecursive`):**  
    Uses tail recursion to compute the sum, minimizing additional stack usage compared to naive recursion.  
    *Time Complexity:* O(n)  
    *Space Complexity:* O(n) in the worst case (if tail-call optimization is not supported)
    
  - **Mathematical Formula Approach (`sumToNFormula`):**  
    Uses the arithmetic series formula to compute the result in constant time.  
    *Time Complexity:* O(1)  
    *Space Complexity:* O(1)
  
- **Input & Output:**  
  - **Input:** A number `n` (assumed to produce a result below `Number.MAX_SAFE_INTEGER`).  
  - **Output:** The summation of all numbers from 1 to n, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

- **Testing:**  
  A comprehensive test suite verifies the correctness of all three implementations using various test cases.

---

## Features

- **Three Distinct Implementations:**  
  Explore different algorithmic approaches to solving the summation problem.
  
- **Performance Analysis:**  
  Each function is annotated with its respective time and space complexity, allowing for easy comparison.

- **Robust Testing:**  
  The repository includes a suite of tests that validate each implementation against a variety of inputs to ensure correctness and reliability.

- **TypeScript & Node.js:**  
  The project is implemented in TypeScript, leveraging type safety and modern JavaScript features. Tests are executed using Node.js's built-in modules.

---

### Running the Tests

To execute the test suite and verify that all implementations produce the expected results, run:
```bash
npm run test
```

The tests will output results for each function:
- **Iterative Approach:** Validates the loop-based implementation.
- **Recursive Approach:** Tests the tail-recursive solution (with inputs limited to avoid call stack issues).
- **Mathematical Formula Approach:** Confirms the correctness of the arithmetic series computation.

---

## Code Structure

- **src/solution.ts:**  
  Contains the three function implementations:
  - `sumToNIterative`
  - `sumToNRecursive`
  - `sumToNFormula`

- **src/solution.test.ts:**  
  Houses the test cases and assertions that ensure each function behaves as expected across a range of input values.