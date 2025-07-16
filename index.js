function runApp() {
  console.log([
    "number_of_items",
    "algo1_time",
    "algo2_time",
    "algo1_memory",
    "algo2_memory",
  ].join(" | "));

  for (let i = 0; i < 20; i++) {
    const number_of_items = 2500000;

    const {
      original_array,
      array_with_missing_number,
      missing_number,
    } = generateArrayOfNumbersWithMissingNumber(number_of_items);

    const algo1_memory_before = process.memoryUsage().heapUsed;
    performance.mark("algo1_start");
    const missing_number_eval_1 = findMissingNumber1(
      xor_all,
      original_array,
      array_with_missing_number,
    );
    performance.mark("algo1_end");
    const algo1 = performance.measure("algo1_time", "algo1_start", "algo1_end");
    const algo1_time = algo1.duration;
    const algo1_memory_after = process.memoryUsage().heapUsed;
    const algo1_memory_used = algo1_memory_after - algo1_memory_before;

    const algo2_memory_before = process.memoryUsage().heapUsed;
    performance.mark("algo2_start");
    const missing_number_eval_2 = findMissingNumber2(
      array_with_missing_number,
    );
    performance.mark("algo2_end");
    const algo2 = performance.measure("algo2_time", "algo2_start", "algo2_end");
    const algo2_time = algo2.duration;
    const algo2_memory_after = process.memoryUsage().heapUsed;
    const algo2_memory_used = algo2_memory_after - algo2_memory_before;

    console.log([
      number_of_items,
      algo1_time,
      algo2_time,
      algo1_memory_used,
      algo2_memory_used,
    ].join(" | "));
  }
}

/**
 *
 * @param {number[]} arr
 * @returns the XOR of all items in the array
 */
function xor_all(arr) {
  let xor_result = 0;
  for (let i = 0; i < arr.length; i++) {
    const e = arr[i];
    xor_result ^= e;
  }

  return xor_result;
}

/**
 * Performs the XORs one at a time, with O(2n) time complexity
 * @param {function} xor_all
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {number} the missing number between the 2 arrays
 */
function findMissingNumber1(xor_all, arr1, arr2) {
  const arr1_xor = xor_all(arr1);
  const arr2_xor = xor_all(arr2);
  const result = arr1_xor ^ arr2_xor;
  return result;
}

/**
 * Performs the XORs breadth-first with O(n) time complexity
 * which is possible because XOR is commutative (order-insensitive)
 * @param {number[]} arr
 * @returns {number} the missing number
 */
const findMissingNumber2 = (arr) => {
  let arr1_xor = 0;
  let arr2_xor = 0;
  let largest_number = 0;
  for (let i = 0; i < arr.length; i++) {
    const current_item = arr[i];
    arr1_xor ^= (i + 1);
    arr2_xor ^= current_item;
    if (current_item > largest_number) {
      largest_number = current_item;
    }
  }

  // Do the final XOR only if there is actually a missing number
  if (largest_number !== arr.length) {
    arr1_xor ^= arr.length + 1;
  }
  const result = arr1_xor ^ arr2_xor;
  return result;
}

function generateArrayOfNumbersWithMissingNumber(length) {
  /**
   * Create an array whose values are equivalent to their indices
   */
  const array_with_missing_number = [];
  for (let i = 0; i < length; i++) {
    array_with_missing_number[i] = i + 1;
  }

  const original_array = structuredClone(array_with_missing_number);

  /**
   * Remove a random value from the array, except for the last item
   */
  let random_number = Math.floor(Math.random() * length);
  while (random_number - 1 < 1 || random_number === length) {
    random_number = Math.floor(Math.random() * length);
  }
  array_with_missing_number.splice(random_number - 1, 1);

  return {
    original_array: original_array,
    array_with_missing_number: array_with_missing_number,
    missing_number: random_number,
  };
}

runApp();
