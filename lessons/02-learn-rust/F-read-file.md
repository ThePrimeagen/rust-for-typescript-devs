---
title: "Rust Basics"
description: "Lets build a small application to understand rust!"
---

### I think the best way to learn
build

for whatever reason reading just doesn't have the same effect as doing

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

### One of the hardest parts of rust
learning the standard is hard.  there are TONS of helper methods so it takes
time don't feel bad.  especially coming from javascript where support is a bit
lacking.  your first move may not be to reach for the standard.

so there is going to be a few methods i'll just know the answer to that you
wont, and that is ok, that is just experience

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

I also want everyone to handle all errors or undefined behavior.  in other
words write this script well

DONT RUN IT AND FIX ERRORS.  I want you to exercise the language guiding you

```bash
# create this file
touch src/read-nums.ts
```

```bash
# Example file you can use
1
5
49
3
```

this is also the ideal output

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

// we smert now
if (!fileName) {
    console.error("please provide a file name as an argument");
    process.exit(1);
}

try {
    fs
        .readFileSync(fileName, "utf8")
        .toString()
        .split("\n")
        .map(x => +x)
        .filter(x => !isNaN(x))
        .forEach(x => console.log(x));
} catch (e) {
    console.error("unable to read file", fileName);
    process.exit(1);
}
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

### [Discussion]: How did we do?
Ok run your program

1. Who made it run without errors?
2. Who made it run mostly correct without incorrect display?
2. Who 100% no glitch speed run?

How much did you rely on your _personal_ knowledge of javascript or how your
computer works or how programming works vs the api given?

#### For me
I knew that process.argv can be undefined
I knew reading files can throw errors
I knew that converting to numbers can cause NaN
I did not know about 0

"Oh the 0?" you say?
Well, JavaScript fun behavior is that number conversion of "" is 0
+"" === 0

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

### Full Code
This first way is very procedural, handling errors

```rust
fn main() {
    let file = std::env::args().nth(1)
        .expect("please provide a file name as an argument");

    let file = std::fs::read_to_string(s)
        .expect("unable to read file");

    for line in s.lines() {
        if let Ok(x) = line.parse::<i32>() {
            println!("{}", x);
        }
    }
}
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

### Now Rust
We can also ignore all the errors and just print numbers

```rust
// this is pretty much as clean as i can make it
fn main() {
    let file = std::env::args().nth(1)
        .and_then(|s| std::fs::read_to_string(s).ok());

    if let Some(file) = file {
        file
            .lines()
            .filter_map(|x| x.parse::<i32>().ok())
            .for_each(|x| println!("{}", x));
    }
}
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

### Take a step back
What did we learn here?
- when errors/undefineds are treated as first class citizens, you tend to get
  an amazing set of utilities around it.

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
