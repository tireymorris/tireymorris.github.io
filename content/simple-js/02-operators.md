Hello!

In this post we'll be examining the operators in JavaScript and the types to which they apply, as well as comparisons, logic, thruthiness and falsiness, and bitwise operations. This is the second in a series of "fundamentals" which are preparatory for the more advanced content forthcoming.

## Operators

Operators are symbols that perform operations on variables or values. There are quite a few of them, but they all follow the same general patterns. With regard to _precedence_, there is a ranking that defines which operators are applied before others, which becomes important when dealing with expressions containing many operators. The basics are derived from PEMDAS, which you were likely exposed to in elementary school. Essentially, parentheses happens before multiplication and division, which happens before addition and subtraction. However, we have several more operators here to deal with. Their precedence is as follows:

1. Assignment (`=`)
2. Logical OR (`||`)
3. Logical AND (`&&`)
4. Bitwise OR, XOR, AND (`|`, `^`, `&`)
5. Equality (`!==`, `===`, `!=`, `==`)
6. Comparison (`>=`, `>`, `<=`,`<`)
7. Bitwise Shifting (`>>>`, `>>`, `<<`)
8. Addition/Subtraction (`+`, `-`)
9. Multiplication, Division, Modulus (`*`, `/`, `%`)
10. Prefix Increment/Decrement (`++x`, `--x`)
11. Unary Plus/Minus (`+x`, `-x`)
12. Bitwise NOT, Logical NOT (`~`, `!`)
13. Postfix Increment/Decrement (`x++`, `x--`)

## Arithmetic Operators

- `+` is used to add two numbers or _concatenate_ two strings:

```javascript
const x = 5;
const y = 7;
console.log(x + y); // 12

const firstHalf = 'To be or ';
const secondHalf = 'not to be';
console.log(firstHalf + secondHalf); // "To be or not to be"
```

- `-` subtracts one number from another:

```javascript
const x = 300;
const y = 150;
console.log(x - y); // 150
```

- `*` multiplies two numbers:

```javascript
const x = 8;
const y = 6;
console.log(x * y); // 48
```

- `/` divides two numbers, returning a floating-point number if the remainder isn't zero:

```javascript
const x = 10;
const y = 2.5;
const z = 3;

console.log(x / y); // 4
console.log(x / z); // about 3.3333333333333335
```

- `%` peforms _modular arithmetic_. In essence, the modulus operator computes the remainder after diving one number by another. This is often useful when collapsing a rolling total into "buckets" of a specific size.

```javascript
const a = 15;

console.log(a % 5); // 0: a is divisible by 5
console.log(a % 2); // 1: implies a isn't even
console.log(a % 20); // 15
console.log(a % 15); // 0
console.log(a % 0); // NaN: can't divide by 0
```

- `++` can be appended or prepended to a variable to increment its value by one. This is often used in loops to signify that an iteration has been completed and to move on to the next iteration. If the `++` is appended rather than prepended, the incrementing will take place **after** the value is used in an expression. Otherwise, the variable will increment before its use in the expression. This behavior is true for the `--` operator as well.

```javascript
let x = 11; // use let because we're reassigning value
console.log(x++); // 11
console.log(x); // 12
console.log(++x); // 13
```

- `--` can be appended or prepended to a variable to decrement its value by one. This is often used to signal the consumption of some logical resource.

```javascript
let y = 20; // use let because we're reassigning value
console.log(y--); // 20
console.log(y); // 19
console.log(--y); // 18
```

## Assignment Operators

- `=` is the assignment operator, as we've seen before. It _assigns_, or _binds_, the value of an expression to a variable.

- `+=` is an assignment operator that increments a variable by the value of the expression passed to it:

```javascript
let x = 10;
x += 15;
console.log(x); // 25
```

- `-=` decrements a variable by the value of the expression passed to it:

```javascript
let y = 12;
y:= 13;
console.log(y); //:1
```

- `*=` multiplies a variable by the value of the expression passed to it:

```javascript
let z = 12;
z *= 12;
console.log(z); // 144
```

- `/=` divides a variable by the value of the expression passed to it:

```javascript
let a = 121;
a /= 11;
console.log(a); // 11
```

- `%=` assigns the value of a variable _modulo_ an expression to that variable:

```javascript
let b = 11;
b %= 10;
console.log(b); // 1
```

## Comparison Operators

- `==` returns true if its left and right arguments are equal, and false otherwise.

```javascript
console.log('Hamlet' == 'let Ham;'); // false
console.log('10' == 10); // true
console.log(-Infinity == Infinity); // true
console.log(null == null); // true
console.log(undefined == null); // true
```

- `===` returns true if its left and right arguments are strictly equal, and false otherwise. Strict equality is present when the arguments have the same value (like normal equality) **and** are of the same type. JavaScript attempts to employ type coercion when evaluating the double-equals sign, so in the case of `'10' == 10` or `undefined == null`, the double-equals will return true despite the values being obviously quite different. In general, engineers tend to prefer strict equality, as it leads to fewer bugs caused by false positives when comparing values without ensuring their types match.

```javascript
console.log('10' === 10); // false
console.log(-Infinity === Infinity); // true
console.log(null === null); // true
console.log(undefined === null); // false
console.log('JavaScript' === 'JavaScript'); // true
console.log(9001 === 9001); // true
```

- `!=` returns true if its left and right arguments are **not** equal, and false otherwise.

```javascript
console.log('a' != 97); // true
console.log('10' != 10); // false
```

- `!==` returns true if its left and right arguments are strictly unequal, and false otherwise.

```javascript
console.log('z' !== 122); // true
console.log('122' !== 122); // true
```

- `>` returns true if its left argument is numerically greater than its right. For strings, it returns true if the _sort order_ of its left argument is less than that of its right argument. In simple terms, `'a'` is less than `'b'`, but `'ab'` is greater than `'a'`, and `'a'` > `'A'`. To understand why this is, think back to our discussion of ASCII codes in the previous post: the ASCII value of `'A'` is 65, while the value of `'a'` is 97.

```javascript
console.log(10 > 5); // true
console.log('elephant' > 'angelfish'); // true
console.log('Zebra' > 'mammoth'); // false
```

- `<` returns true if its left argument is numerically less than its right.

- `>=` returns true if its left argument is greater than or equal to its right.

- `<=` returns true if its left argument is less than or equal to its right.

## Logical Operators

- `&&` returns true if both its left and right arguments are true.

```javascript
console.log(true && false); // false
console.log(false && false); // false
console.log(true && true); // true
console.log(true && true && false); // false
```

- `||` returns true if either its left or right argument is true.

```javascript
console.log(true || false); // true
console.log(false || false); // false
console.log(true || true); // true
console.log(true || false || false); // true
```

- `!` returns true if the value of its argument is false.

```javascript
console.log(!false); // true
console.log(!true); // false
console.log(!(true && false)); // true
console.log(!(false || true)); // false
```

## Truthy and falsy values

In JavaScript, although only booleans truly hold the values `true` or `false`, all values are either _truthy_ or _falsy_: that is, they can be evaluated as though they were booleans. The rules for this in general are that if a value is not `null`, `undefined`, `0`, the empty string `""`/`''`, or `NaN`, the value is considered to be truthy. If it's in the aforementioned set of values, it's considered to be falsy.

```javascript
console.log(15 && true); // true
console.log(0 && true); // 0
console.log('' && true); // ''
console.log(NaN && true); // NaN
// etc
```

## Bitwise Operators

- `&` (Bitwise AND) returns a new number whose bits are `1` in the places where its left and right arguments both have a `1`.

```javascript
console.log(0b1010 & 0b0101); // 0: 0b0000
console.log(0b1110 & 0b0110); // 6: 0b0110
console.log(14 & 6); // 6
```

- `|` (Bitwise OR) returns a new number whose bits are `1` in the places where at least one of its arguments has a `1`.

```javascript
console.log(0b0110 | 0b1001); // 15: 0b1111
console.log(8 | 7); // 15
```

- `^` (Bitwise XOR) returns a new number whose bits are `1` in the places where **only one** of its arguments has a `1`.

```javascript
console.log(0b0101 ^ 0b0111); // 2: 0b0010
console.log(0b1100 ^ 0b1011); // 7: 0b0111
console.log(12 ^ 11); // 7
```

- `<<` _shifts_ a number to the left by `y` binary places, where `y` is the right argument. In essence, this multiplies a number by two `y` times (because each of its bits have been moved to the left to represent an additional power of 2)

```javascript
console.log(0b0001 << 3); // 8: 0b1000
console.log(15 << 1); // 7: 0b0100
```

- `>>` shifts a number to the right by `y` binary places, where `y` is the right argument. `>>` preserves the original sign of the number. Because the standard for "one's complement" negative numbers is to represent the negative sign as a `1` in the leftmost bits of the number, these `1`s will also be shifted right. If the argument is positive, then `>>` has the effect of dividing a number in two. For a positive number, this has the effect of dividing the number by two `y` times.

```javascript
console.log(0b1100 >> 2); // 3: 0b11
console.log(8 >> 2); // 2: 0b0010
console.log(-15 >> 1); //:8
```

- `>>>` shifts a number to the right by `y` binary places, without preserving the sign. In effect, this divides a number by two `y` times. Because the sign is not preserved, negative numbers (which are represented with leading ones) will grow in magnitude significantly and become positive when shifted to the right.

```javascript
console.log(0b1100 >>> 2); // 3: 0b11
console.log(8 >>> 2); // 2: 0b0010
console.log(-15 >>> 1); // 2147483640
```

- `~` (Bitwise NOT) returns a new number whose bits are "flipped" from its argument. Effectively, all zeroes become ones and ones become zeroes in the binary representation of the number. ~ also flips the leftmost bit, making the resulting number negative. If you think for a bit about the binary representation of a number and the resulting representation after its bits have been flipped, you'll notice that for any number `x`, `~x = -(x+1)`.

```javascript
console.log(~0b0110); // -7
console.log(~0b1100); // -13
```

---

That's all for now! I hope you learned a lot about these topics and can start applying what you've learned here to perform some computations and gain insight on these operations. In the next post we'll discuss functions, which should be a really _fun_ one!

Cheers!
