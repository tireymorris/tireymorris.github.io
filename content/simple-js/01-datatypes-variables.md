Hi! Welcome to the first entry in a series of tutorial articles on JavaScript, done the simple way. In this series we'll be exploring the fundamentals of the language as well as some more advanced facets in the later articles. This will be the first in the "fundamentals" of the language designed to get us ready to check out more advanced topics.

In this entry we'll be learning about JavaScript's data types and operators in addition to some fundamentals like variables and comments. Let's get into it!

## Datatypes

JavaScript has seven basic types - `number`, `string`, `boolean`, `object`, `function`, `null`, and `undefined`. We'll explore each of these in detail below.

- `number` values represent integer data such as `42`, `9001`, or `-10`. In JavaScript, numbers can also be floating-point, so a value such as `3.5` is also valid. Numbers in JS range from -(2<sup>53</sup>-1) to (2<sup>53</sup>-1). Infinity and negative infinity can be written as `Infinity` and `-Infinity`, and there's also a value called `NaN` (not-a-number) which is a special value that is returned when built-in math functions fail on their input. Numbers in JS can also be written using scientific notation - a lowercase e separates the digits from the exponent. For example, `3.5e5` is equal to `3.5 * Math.pow(10, 5)`, and `1.7e-2` is equal to `1.7 * Math.pow(10, -2)`.

```javascript
const y = 1.5 * 1e1 + 7;

console.log(y); // 22
console.log(y / 0); // Infinity
console.log(-y / 0); // -Infinity
console.log(y * 'Not a number'); // NaN
```

- `string` - Strings are sequences of characters of arbitrary length, such as `'A man, a plan, a canal, Panama'` or `"To be or not to be"`. Strings can be written using single or double quotes, but the beginning and end quotes must match. (Most linters prefer single quotes, except for HTML attributes).

```javascript
console.log('This is a string');
console.log('I am also a string!!');
```

- `boolean` - Boolean values are an invention of the English mathematician George Boole, and underly modern computing logic. They can be either `true` or `false`, and a number of operators called Logical Operators are used to make different decisions based on these values.

```javascript
console.log(true);
console.log(false);
console.log(true && false); // false (more on that later!)
```

- `object` - We'll talk more about objects later, but suffice it to say that they are essentially reusable blueprints for building values with specific properties.

- `function` - We'll also talk more about functions in a future entry, but for now we can say that functions are reusable blocks of code that execute arbitrary operations and can be passed around as values inside the program.

- `undefined` - In a sense, `undefined` is the default value. It signifies that a value is likely going to be assigned in place of this value but has not yet been _initialized_. Variables (which we will hit very soon) are _initialized_ by default with the value `undefined`.

```javascript
let result;

console.log(result); // undefined
```

- `null` is a special value to represent the absence of a value, and unlike `undefined` it is often _assigned_ to a variable to represent the absence of a value.

```javascript
let result = null;
console.log(result); // null
result = 'success';
console.log(result); // "success"
```

## Comments

Comments are, intuitively, comments that the programmer leaves in the code for other programmers to read. They aren't printed or captured in any variables, and are purely for the benefit of those reading your code. There are two types of comments: _inline_ comments begin with `//` and take up a single line, and _multi-line comments_, beginning with `/*` and ending with `*/`, which, as the name implies, span multiple lines. All the text between the beginning and end of a comment is ignored.

```javascript
console.log('This line is executed');
// console.log('This line is not');
/*
  console.log('Neither is this');
*/
```

## ASCII and strings

Since the late '60s, computers have represented characters in memory by using a specific encoding of numbers to characters. This encoding is called ASCII, and the most recent revision has 256 possible values (8 bits) per character, with `A` through `Z` occupying codes `65` through `90` and `a` through `z` occupying codes `97` through `122`. Although we use Unicode now to represent character encodings, the scheme for the first 8 bits has stayed essentially the same as in ASCII.

Though we haven't talked much about objects or methods yet, here's a taste, showing how we can convert between numerical and string representations of characters.

```javascript
const a = String.fromCharCode(97);
console.log(a); //"a"

const _97 = 'a'.charCodeAt(0);
console.log(_97); //97
```

## Escape sequences

Certain characters need a special representation inside a string in order to be displayed correctly. Common characters like this include tabs (`\t`), newlines (`\n`), carriage-returns (`\r`), and single/double quotes (`\'` / `\"`). If you want to display the backslash itself, you'll need to escape it too (`\\`). Additionally, the quotes used to delimit a string can't be used inside a string without escaping them:

```javascript
const title = " 'The Walrus and the Carpenter' "; // valid
const invalidTitle = ' 'The Walrus and the Carpenter' '; // invalid

const compromiseTitle = ' \'The Walrus and the Carpenter\' '; // valid
```

## Template strings

Template strings are special strings denoted by the backtick, that can be used to capture variable and expression values.

```javascript
const timestamp = Date.now();
const resultOne = `The number of ms since the beginning of time is ${timestamp}.`;
const resultTwo = `The ms of time that just passed is ${Date.now() -
  timestamp}.`;

console.log(resultOne);
console.log(resultTwo);
```

## Variables

Variables are a sort of container that hold data in a program. They can be reused as values passed to functions or used in computations, and have a name that often refers to their significance in the program or application. Variable names in JavaScript can begin with letters or an underscore, and the remaining characters can include any letter, number, or an underscore. There's no limit to the length of a variable name, but in general keeping them short but descriptive is a good rule of thumb. Variables are _declared_ using the keyword `let`, `const`, or `var`, and _assigned_ using the `=` operator.

- `let` is used to declare a variable that we want to reassign later, such as a counter. `let` is _scoped_ to the **block** it's declared in, so it can't be used outside its block of declaration.

```javascript
let i;
i = 10; // valid reassignment

{
  // creating a block
  let j = 10;
}
console.log(j); // printing j throws a ReferenceError
// j is undefined outside the block scope
```

- `const` is used to declare a variable we don't want to reassign later. In general, it's best to use `const` whenever possible; when a variable has a long lifetime throughout a program, it's easier for debugging (and constructing a mental model of the program) to know its value hasn't changed since its declaration. Most declarations can prefer `const` over `var` or `let`. `const`, like `let`, is scoped to the block it's declared in.

```javascript
const i = 0;
i = 10; // invalid reassignment, throws an error

{
  // creating a block
  const j = 10;
}
console.log(j); // printing j throws a ReferenceError
// j is undefined outside the block scope
```

- `var` is similar to `let` in that a variable declared with `var` can be reassigned later. However, in modern JavaScript, it is common to prefer `let` to `var` because the latter is _hoisted_ outside of block scope (essentially, the declaration is moved further up in the program, from the smaller area of a block to the top of a function, somewhat implicitly). This can lead to unexpected program behavior, and in general it's safer and simpler to prefer `let`.

# Boolean, hex, and octal literals

Numeric literals are most often used to represent decimal (base-10) values, but JavaScript numbers can also represent boolean (base-2) values, hexadecimal (base-16), and octal (base-8). In a number literal with base `x`, each digit from right to left represents an increasing power of `x`. In decimal, for example, `123 = 1*100 + 2*10 + 3*1`. In boolean, the only valid digits are 0 and 1, and these literals are written like `0b1010` (10). Hexadecimal digits range between 0 and 15, and digits 10-15 are represented by the characters A, B, C, D, E, and F, respectively. Hex literals look like `0xF` (15) or `0x2A` (42). Octal digits range between 0 and 7, and literals are written like `0o10` (8) or `0o21` (17).

## typeof

Typeof is an operator that _returns_ a string representing the type of a variable.

```javascript
console.log(typeof 100); // "number"
console.log(typeof Math.random); // "function"
```

---

That's it for this post! I hope you enjoyed learning about datatypes and variables. Next in the series I'll be talking about operators, bitwise computation, and truthiness/falsiness.

Cheers!
