/**
 * Module: Sum to N Implementations
 *
 * This module provides three distinct implementations for calculating the summation
 * of all natural numbers from 1 to n. Each implementation demonstrates a different
 * approach along with its time and space complexity considerations.
 *
 * Implementations:
 * 1. Iterative Approach (sumToNIterative): Uses a loop to accumulate the sum.
 * 2. Recursive Approach (sumToNRecursive): Uses tail recursion to compute the sum.
 * 3. Mathematical Formula (sumToNFormula): Uses the arithmetic series formula for O(1) computation.
 */

/**
 * Iterative Approach
 * -------------------
 * Calculates the sum from 1 to n by iterating through each number.
 *
 * @param n - The number up to which the summation is performed.
 * @returns The sum of all numbers from 1 to n.
 *
 * Time Complexity: O(n) - Iterates n times.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
export function sumToNIterative(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Recursive Approach (Tail Recursive)
 * -------------------------------------
 * Calculates the sum from 1 to n using a tail-recursive helper function.
 * This minimizes additional stack usage compared to a naive recursive implementation.
 *
 * @param n - The number up to which the summation is performed.
 * @returns The sum of all numbers from 1 to n.
 *
 * Time Complexity: O(n) - Makes n recursive calls.
 * Space Complexity: O(n) in the worst case if tail-call optimization is not supported.
 *
 * Note: For very large n, this approach may still result in a call stack error.
 */
export function sumToNRecursive(n: number): number {
  function helper(current: number, acc: number): number {
    if (current <= 0) return acc;
    return helper(current - 1, acc + current);
  }
  return helper(n, 0);
}

/**
 * Mathematical Formula Approach
 * ------------------------------
 * Calculates the sum from 1 to n using the arithmetic series formula.
 *
 * @param n - The number up to which the summation is performed.
 * @returns The sum of all numbers from 1 to n.
 *
 * Time Complexity: O(1) - Uses a constant number of operations.
 * Space Complexity: O(1) - Uses a fixed amount of memory.
 */
export function sumToNFormula(n: number): number {
  return (n * (n + 1)) / 2;
}
