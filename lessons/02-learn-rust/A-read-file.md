---
title: "Rust Basics"
description: "Lets build a small application to understand rust!"
---

### I think the best way to learn
is to build things.  Not to read specifications, but to do.  To use my hands.
And that is what we are going to do today.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### The Program
The program will be simple.
Lets write a CLI application that:
- read the first argument as a filename
- read the file given by filename
- covert each line into a number
- print out each number

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### A warning
The first program is by far the hardest since there is going to be MANY new
concepts.  This means you will be confused.  Lets take it slow and work
together.  You should actively try to program the program with me.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### TypeScirpt
Lets first do this is TS to make things clear.  Though this will pretty much
be pure javascript.

I want everyone to take 3 minutes to quickly type this up

```bash
touch src/read-nums.ts
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

```typescript
import fs from "fs";

const fileName = process.argv[2];
const contents = fs
    .readFileSync(fileName, "utf8")
    .toString()
    .split("\n")
    .map(x => +x);

console.log(contents);
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets do this in Rust
There are going to be many pitstops along the way, since everything is so new.

Do not feel bad for feeling confused.  We will have questions.  And i'll give
you time to ask.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets read a CLI arg!
The first and most important thing to do is a read CLI argument.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### I am sorry we didn't get 2 lines of code in...
So what is Option<String>?

- what is an Option?
- what is an String? (we will cover this later)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### What is a Option?
This is ackshually going to be simpler than what is a String.

You can think of an Option as being in 2 states.
1. Nothing
2. A value

```typescript
function foo(bar?: number) {
}
```

<br/>
<br/>
<br/>

`bar` can be `undefined` or a `number`.  The equivalent function argument in
Rust is the following

```rust
fn foo(bar: Option<usize>) {
}
```

<br/>
<br/>
<br/>

### Lets play with Options to understand them.
So lets do the following:
- define an Option
- expect / unwrap
- get a value out of an option (pattern matching, or lifting)
- unwrap_or
- map
- ?
- iterator

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

So what can we do here?  How do we get a string?

```rust
    let file = std::env::args().nth(1);
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

```rust
    let file = std::env::args().nth(1).expect("error message");
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Questions?  There is going to be more Options
so.... speak now, or forever be confused on how to get your value...

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Time to read a file!
Reading a file like we did previously is really simple.  There are more
efficient ways to do things, but we chose the simplest way in node, and we will
continue that.

```rust
    let file = std::fs::read_to_string(filename);
```

I want you to ask yourself this... what is wrong with this statement?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### It appears we are at an impasse
```rust
    let file = std::fs::read_to_string(filename);
```

WHAT IS A RESULT???
I JUST WANT MY VALUE!!!
... alright... lets talk results

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Result
Lets do with what we did with options.

- define an Result
- expect / unwrap
- get a value out of an option (pattern matching, or lifting)
- unwrap_or
- map
- ?
- iterator
- anyhow -- the greatest thing since forgetting you have to handle errors

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Why are Result enums great?
This question is best answered with a couple of questions.

- What functions in javascript throw errors?
- Who handles the errors in javascript?


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

