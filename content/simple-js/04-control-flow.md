# Simple JS - Control Flow

Welcome! In this entry I wanted to introduce you to the concept of control flow. Up until now, all our programs and snippets have been quite linear - that is, they executed some statements and then terminated. Today, we're going to become acquainted with some new structures that allow us to change the flow of the program according to some conditions.

## Conditionals

- `if` is a statement that executes some code only if a boolean condition is evaluated to `true`. For example,

```js
const isBirthday = true;

if (isBirthday) {
  console.log("Hooray! It's your birthday!");
}
```

or, more functionally,

```js
const theDate = new Date();
const date = theDate.getUTCDate();
const month = theDate.getUTCMonth();

if (date === 5 && month === 0) {
  console.log("It's your birthday?! Congrats!");
}
```

- `else if` is an optional statement that can be appended to an `if` block, in order to signify an additional condition with its own logic.

```js
const theDate = new Date();
const date = theDate.getUTCDate();
const month = theDate.getUTCMonth();

if (date === 5 && month === 0) {
  console.log("It's your birthday?! Congrats!");
} else if (date === 25 && month === 11) {
  console.log("It's not your birthday - but it is Christmas! So that's cool!");
}
```

- `else` operates much like `else if`, except it takes no condition and is only executed after all prior `if`/`else if` conditions have been exhausted.

```js
const theDate = new Date();
const date = theDate.getUTCDate();
const month = theDate.getUTCMonth();

if (date === 5 && month === 0) {
  console.log("It's your birthday?! Congrats!");
} else if (date === 25 && month === 11) {
  console.log("It's not your birthday - but it is Christmas! So that's cool!");
} else {
  console.log("It's not your birthday or Christmas. Sorry!");
}
```

- A `ternary` is an expression that rolls up an `if` and `else` into a minimal amount of code, using only two characters to represent the logic. It can represent a single `if`/`else` pair, or can be chained together to represent an arbitrary number of `if`/`else if`/`else if`/.../`else` combinations. A ternary is technically an expression rather than a statement, so it produces a value that can be assigned to a variable or used as an argument. The value after the `?`is what the expression produces if the condition is met. Otherwise, the value after the`:` is used. This can either be another ternary expression or a constant expression.

```js
const theDate = new Date();
const date = theDate.getUTCDate();
const month = theDate.getUTCMonth();

const greeting =
  date === 5 && month === 0
    ? "It's your birthday?! Congrats!"
    : date === 25 && month === 11
    ? "It's not your birthday - but it is Christmas! So that's cool!"
    : "It's not your birthday or Christmas. Sorry!";

console.log(greeting);
```

Whether you use the ternary expression or an `if`/`else if`/`else` combination is essentially a matter of style and preference. In a case like this with a small amount of actual logic and simple constant values, a ternary is probably a good choice. But you could equally decide to forego ternaries altogether to avoid confusion and that would be a perfectly suitable choice as well.

## Switch

Switch statements are almost unneeded and very rarely used in production code, but since they do come up you'll probably need to read them. They're used to execute a given statement based on the value

## Loops (while, for)

## Error handling
