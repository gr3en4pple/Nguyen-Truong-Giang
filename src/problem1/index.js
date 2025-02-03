/**
 *  Problem 1: Three ways to sum to n
 */

// 1. using for-loop
var sum_to_n_a = function (n) {
  if (n <= 0) return 0
  let result = 0
  for (let i = 1; i <= n; i++) {
    result += i
  }
  return result
}

// 2. using mathematical formula
var sum_to_n_b = function (n) {
  if (n <= 0) return 0
  return (n * (n + 1)) / 2
}

// 3. using recursive
var sum_to_n_c = function (n) {
  if (n <= 0) return 0
  return n + sum_to_n_c(n - 1)
}
