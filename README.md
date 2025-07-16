# missing-number-identifier

An algorithm to find a missing number from an array of non-duplicate numbers greater than 0 and less than the size of the array

I got inspired to write this after watching [ThePrimeAgen's video on XOR](https://youtu.be/YNObatXvhZc) up until the 19-minute mark.

Then, I thought "Why do we need to iterate through the arrays twice with O(2n) complexity? Can we do it in 1 iteration?"

So, I spent a bit of time trying to figure out an algorithm to do it in one pass, and I figured one out

## How it works

- Instead of iterating through 2 arrays, XORing all the items in each array, then XORing the XOR'd arrays
- And since
  - The 1st array has values equal to the index
  - The 2nd array also has values equal to the index but with 1 number missing
  - XOR is commutative (the order of operations doesn't matter)
  - XORing a value by 0 equals the same number
- Therefore, I simplified the algorithm to
  - Iterate (for loop) through the array with the missing number
  - XOR all at the same time
    - The counter of the for loop offset by 1, for all iterations (1, 2, 3...)
    - Each item in the array
    - The above 2 values together
- This way, it performs all necessary XOR operations in a single for loop

Hilariously, once I continued watching Prime's video up until the [21-minute mark](https://youtu.be/YNObatXvhZc?t=1251), I saw that he had the exact same idea, and I was so excited to see that.
