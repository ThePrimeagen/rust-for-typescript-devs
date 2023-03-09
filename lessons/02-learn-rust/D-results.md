---
title: "Learn Rustlang Results"
description: "Lets go deep on results."
---

### To throw or not to throw, that is the question
Another place where typescript and rust have fundamentally different design
decisions.

Ask yourself the following questions
* what function throws an error?
* who handles the error if thrown?
* what can be throw?  (look at the promise reject definition (reason: any))

with javascript you learn by trial. <br/>

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### How Rust Handles Errors
Errors are values

This means that there is no throwing.  You get a value that is either a value
or an error.

Notice this is very similar to Option.
- Option is value or undefined
- Result is value or error value

<br />

### if err != nil
yes, the golang meme of error handling doesn't exist in rust.  Rust handles
errors better than go.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### I am going to make some assumptions
You don't need me to show you another example of how to handle enums because
that's all we have been doing.

The definition of a result
```rust
enum Result<V, E> {
    Ok(V),
    Err(E),
}
```
<br />
<br />
<br />
<br />

Also, rust has `Ok` and `Err` as first class citizens

<br />
<br />
<br />
<br />

```rust
if let Ok(value) = a_function_that_can_error() {
    // something with the value
}

match a_function_that_can_error() {
    Ok(value) => println!("oh yeah, value! {}", value);
    Err(e) => eprintln!("ohh no... {}", e);
}

// you don't care about the error
_ = a_function_that_can_error();

// yolo
let foo = a_function_that_can_error().unwrap();

// respectful yolo
let foo = a_function_that_can_error().expect("should never fail");

// defaults
let foo = a_function_that_can_error().unwrap_or(0);

// convert to option
// Ok(V) => Some(V)
// Err(E) => None
// bai felicia
let foo = a_function_that_can_error().ok();

let foo = a_function_that_can_error()
    .map(|value| value + 1);

let foo = a_function_that_can_error()
    .and_then(|value| another_possible_error(value))
    .and_then(|value| again(value));

// If your function returns an error, you can do this!
let foo = a_function_that_can_error()?;
```

### Side Note
there are two `crates` (rust package) that work very well with errors
* thiserror - great for creating your own errors.  should be used in libraries
* anyhow - great for applications.

We will use anyhow shortly

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Another small exercise!
This is going to combine all of our knowledge of `Iterator`s, `Option`s, and
newly introduced `Result`. <br />

But!  Lets go in small steps
1. read the first argument passed to the program
  - `cargo run -- this_is_an_arg`
  - `npx ts-node file this_is_an_arg`
1. the first argument is a name and path to the file to read
1. print out each line of the file

```typescript
process.argv[2] <--- first arg to program
```

Now we have already done some of this, so this should become a bit easier, lets
start with TypeScript.

file you should use, save as proj/numbers
```
1
5
9
33
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Complete Code

```typescript
import fs from "fs";
fs.readFileSync(process.argv[2]).
    toString().
    split("\n").
    forEach(line => console.log(line));
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

Ok... now try this

```bash
npx ts-node src/index.ts filethatdoesntexist
```

what happens?
why?

ok... again
```bash
npx ts-node src/index.ts
```

?? WHY YOU DO THIS TO ME

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Rust
Ok lets try the same thing in rust.  It will be a bit more involved.

I'll give you some hints.

```rust
std::env::args().nth(1) // <--- gets the first argument
                        //      passed to the program
```

if you forgot

```rust
std::fs::read_to_string(...) // reads a file to string
```

I'll give you a second, then i'll do it

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Complete Code

```rust
fn main() {
    let arg = std::env::args().nth(1)
        .expect("please provide a file name as an argument");

    std::fs::read_to_string(arg)
        .expect("unable to read the file provided")
        .lines()
        .for_each(|line| println!("{}", line));
}
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### [Discussion]: Compare TypeScript w/ Rust
what makes rust better or worse in this example?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Lets add more requirements
lets only print out lines that are `number`s and lines that are not, lets print
out `Line not a number`

First, TypeScript, i'll give you a moment

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Complete Code

```typescript
import fs from "fs";
fs.readFileSync(process.argv[2]).
    toString().
    split("\n").
    forEach(line => {
        const v = parseInt(line);
        if (isNaN(v)) {
            console.log("Line not a number");
        } else {
            console.log(v);
        }
    });
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Now how do we do this in rust?
one piece of knowledge, `parse` is needed.

A `&str` has `parse` function which allows for any `Type` implementing
`FromStr` to be parsed from a string.  Now this sounds like a bunch of
non-sense, don't worry, we will go through this more deeply soon.


```rust
// -------v
let foo: usize = "5".parse();

// ---------------------v
let foo = "5".parse::<usize>();

// ------------v
fn mult() -> usize {
    return "5".parse().unwrap_or(0);
}
```

I'll give you a moment to try it out, then i'll do it
(think pattern matching)

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Complete Code

```rust
fn main() {
    let arg = std::env::args().nth(1)
        .expect("please provide a file name as an argument");

    std::fs::read_to_string(arg)
        .expect("unable to read the file provided")
        .lines()
        .for_each(|line| {
            if let Ok(value) = line.parse::<usize>() {
                println!("{}", value);
            } else {
                println!("Line not a number");
            }
        });
}
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### [Discussion]: Which one was easier to get right?
Try to think through the problem as if you knew Rust as well as TypeScript

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### A Case for rust
In the simplest sense, you always know where your errors happen, you always
know when undefineds can happen
- Result saves you from errors you should be able to prevent
- Option saves you from `undefined is not a function`
- Rust doesn't save you from bad logic, we are all bad programmers, sowwy

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Questions?
Get them out of the way now, even if its not `Result` based.

Remember:
- If you don't understand something, this is a great time understand it better
- If you don't understand something, guarantee the person next to you is
  struggling with the same thing
- If you don't ask, who will?

The next section is going to be harder

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

