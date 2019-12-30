# Simple JS - Functions

Welcome back to Simple JS! After a hiatus I've returned to talk to you a bit about a very special topic - functions. These reusable chunks of code form much of the basis for modular program design, and allow you to save lots of time writing redundant code - and can even make your programs look nice and clean! Let's get into it.

### Functions

Functions are one of the seven basic types in JavaScript. You might remember the basics from math class. Although there are different classifications for how these inputs and outputs differ, essentially a function is a mapping from a set of inputs from a set of outputs. The `square` button on a calculator, for instance, is a function that operates on a `number` and returns a `number`. In JavaScript, it might look something like this:

```js
function square(x) {
  return x * x;
}
```

The keyword `function` tells the JavaScript interpreter that the variable we're creating, named `square`, holds a function. The value in the parentheses is the function's _parameter_ (also called an _argument_ when invoking the function). Within the _body_ of the function (denoted by the curly braces), this parameter can be used any number of times. Finally, the `return` keyword tells the interpreter that this function is meant to produce the value `x * x`. Some functions may not return values, and in JavaScript that's perfectly fine.

We can reuse the square function like so:

```js
const a = 7;
const b = 6;

console.log(square(a)); // 49
console.log(square(b)); // 36
```

Although we invoke the function multiple times, its value never changes - it simply operates on a new input and returns a new output. And since a function in JavaScript is what's called _first-class_, we can pass it around just like any other variable. For instance, we can do the following:

```js
function square(x) {
  return x * x;
}

function apply_fn(fn, y) {
  return fn(y);
}

console.log(apply_fn(square, 4)); // 16
```

See what happened there? We actually passed the function `square` as an argument to the other function `apply_function`, which returned the value produced by invoking `square`! This functionality will be a key part of the JavaScript utility belt, and will be invaluable in many cases in the future. Keep it in mind!

### Anonymous functions

Anonymous functions are simply unnamed functions. The biggest use for them is as arguments to other functions. For example,

```js
setTimeout(function() {
  // empty parentheses signify no parameters
  console.log(`The secret number is ${Math.random() * 1000}`);
}, 750);
```

(We haven't seen the `setTimeout` function yet - you can ignore it if you choose. It basically executes a given block of code after a set number of milliseconds have elapsed, although there are some minor complications to that explanation.

Alternatively, when held within a variable:

```js
const printSecretMessage = function() {
  console.log(`The secret number is ${Math.random() * 1000}`);
};
setTimeout(printSecretMessage, 1500);
```

### Arrow functions

Arrow functions are "syntactic sugar" on top of defining anonymous functions. They can be held within variables or passed as arguments just as anonymous functions are, but have a slightly simpler and cleaner syntax:

```js
const print = x => {
  console.log(x);
};

setTimeout(() => {
  print(25);
}, 500);
```

If an anonymous function simply returns a single expression, it can be rewritten without braces for brevity. Like so:

```js
const getHello = name => `Hello ${name}`;

const sayHello = name => {
  console.log(getHello(name));
};

sayHello('JavaScript!'); // prints "Hello JavaScript!"
```

That about wraps it up for now regarding functions! Thanks so much for sticking around and see you next time when we talk about control flow!
