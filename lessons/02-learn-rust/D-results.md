---
title: "Learn Rustlang Results"
description: "Lets go deep on results."
---

### To throw or not to throw, that is the question
One of the largest differences between rust and typescript exist with errors.

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
The biggest difference is that Errors are values.

This means that there is no throwing.  You get a value that is either a value
or an error.

Notice this is very similar to Option.
- Option is value or undefined
- Result is value or error value

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

### Lets look at some handling for rust

```rust
// Lets pretend this functino returns a number if successful
let error = some_fn_that_errors();

// we can do the same thing
if error.is_ok() {
    println!("my value {}", error.unwrap());
}

if error.is_ok() {
    println!("my value {}", error.expect("must exist"));
}

// we can do what we did with an Option
if let Ok(value) = error {
    // no error!
}

// Match statements
match error {
    Ok(value) => {
        ... code in here ...
    }
    Err(error) => {
        ... this is the error branch ...
    }
}

// maps
return error.map(|x| x * 5); // still a Result<V, E> object
return error.unwrap_or(0) * 5; // Returns V (V being the type of number)

// You can even convert between Results and Options
error.ok() // Option<V> (Error case becomes None)

let foo = Some(5);
// error_from_option has type Result<Number, &'static str> // <-- wow that looks terrible!
let error_from_option = foo.ok_or("this is an error value");
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

### Lets do a small exercise
The third piece of our "first learnings" are errors.  This will help you
navigate a huge amount of rust code early on.

Project:
- print a file provided by cli args

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

### TypeScript
Typescript should be SUPER easy.  This time, the solution should make
typescript Look so much more awesome

ps: i wrote this without opening up a text editor
```typescript
import fs from "fs";
const content = fs.readFileSync(process.argv[2]).toString();
console.log(content);
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
Ok lets try the same thing in rust.  It will be a bit more involved

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

```rust
fn main() {
    let arg = std::env::args().nth(1)
        .expect("please provide a file name as an argument");

    let file = std::fs::read_to_string(arg)
        .expect("unable to read the file provided");

    println!("file contents: {}", file);
}
```

<br />
<br />
<br />
<br />

We could also get cute, ignore errors, be a bit more functional, and only print
when a file exists

```rust
fn main() {
    // This is an Option<String>
    // Convert the read_to_string error to option
    // print out in map

    std::env::args().nth(1)
        .and_then(|s| std::fs::read_to_string(s).ok()) // and_then
        .map(|s| println!("file contents: {}", s));
        // .inspect(|s| println!("file contents: {}", s)); // nightly
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

