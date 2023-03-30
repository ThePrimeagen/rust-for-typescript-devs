---
title: "Iterators"
description: "Iterators in rust are sooo much better."
---

## Ok lets start coding.

enough of this talking biz, its coding time. I have always been under the
impression its easier to learn with my hands than my eyes.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## To begin with, There are 2 things that have to be understood in Rust

This is for fundamental understanding of the language.

1. Iterators
1. Enums

Once you get these two, it becomes easier to work with rust initially. As these
concepts are a bit wonkey coming from TypeScript.

<br />

**You are even probably thinking...** "I use iterators all the time and enums are
horrible!"

<br />

From a typescript perspective you are right and from a rust perspective, you
are wrong.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Lets start with iterators

(first basic whiteboard explanation)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Iterators

I think iterators will make the easiest transition as they have the strongest
similarity in javascript.

and we can start with `.map`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Quick example in TypeScript

Lets go over a quick example in typescript

Lets create a script that:

- creates an list initialized with 1, 2, 3
- adds 1 to each item in that list
- prints the list

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
// what happens here?
const foo = [1, 2, 3].map((x) => x + 1);
console.log(foo);
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

## Quick example in Rustlang

Now lets do it in rust!

- (in case you forgot) a closure is defined

```rust
// defining a closure
|x| {
    //... body with a return
    return x * 5;
}

// without body
|x| x * 5
```

See how far you can get on your own!

- do you remember how to define a vector? `vec![...]`
- to iterator over references `.iter()`
- map it
- but... how to get an iterator back to a vector... (`collect`)

(in case you forgot)

- creates an list filled with 1, 2, 3
- adds 1 to each item in that list
- prints the list
  - debug print works on vectors auto*magically* `println!("{:?}", foo);`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
fn main() {
    let items: Vec<isize> = vec![1, 2, 3]
        .iter() // create the iterator to go over the elements in teh array
        .map(|x| x + 1) // do the plus one'ings
        .collect(); // take the iterator and put it somewhere..

    println!("items {:?}", items);
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

## What is collect?

One thing that is different than you may be use to is that an `Iterator` is its
own data type. So we must convert from an iterator back into the struct we
want and in our case its a `Vec`

So lets do this manually

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```rust
fn main() {
    let items = vec![1, 2, 3];
    let mut iter = items
        .iter()
        .map(|x| x + 1);

    let mut collected_items = vec![];
    while let Some(value) = iter.next() {
        collected_items.push(value);
    }

    println!("collected_items: {:?}", collected_items);
}
```

Its sometimes easy to think things magic when they are not, its literally, in
our example, a simple while loop

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Wanna see something cool with collect?

Well, collect is more that just "put back into a vector"

(show them the deets, String, HashSet, HashMap)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

Collect into string!

```rust
let foo: String = vec!["this", "is", "a", "test"]
    .into_iter() // what the heck is this?  we will talk more about this
    .collect();
```

<br/>
<br/>
<br/>
<br/>

Collect into HashSet (this would be Set in JS)

```rust
let foo: HashSet<isize> = vec![1, 2, 3]
    .into_iter()
    .collect();
```

<br/>
<br/>
<br/>
<br/>

Collect into a HashMap

```rust
let foo: HashMap<&str, usize> = vec!["this", "is", "a", "test"]
    .into_iter()
    .enumerate() // Adds the index to the iterator!
                 // one of the glories of rust is that we work with iterators
    .map(|(idx, item)| (item, idx)) // reverses the order
    .collect();
```

`map(|(idx, item)|` is an example of destructuring.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## We are going to play a game

this will help you see whats possible

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## What is value?

```rust
let value: usize = vec![1, 2, 3]
    .iter()
    .sum();
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
let how_many_items: usize = vec![1, 2, 3]
    .iter()
    .skip(2)
    .count();
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

## What will i print?

```rust
    vec![1, 2, 5, 9, 4]
        .iter()
        .skip(2)
        .take_while(|&&x| x > 4) // i can explain the && later,
                                 // but know its pattern matching
        .for_each(|x| println!("{}", x));
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
let what_about_this: usize = vec![1, 2, 3]
    .iter()
    .filter(|x| *x % 2 == 0) // we will explain the * later
    .count();
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

## Iterators from other collections!

```rust
let map = HashMap::from([
   ("foo", 1),
   ("bar", 2),
   ("baz", 3),
]);

map
    .iter()
    .for_each(|(k, v)| println!("{}: {}", k, v));
```

<br/>
<br/>
<br/>
<br/>

```rust
let set = HashSet::from([
    "foo",
    "bar",
    "baz",
]);

set
    .iter()
    .for_each(|v| println!("{}", v));
```

<br/>
<br/>
<br/>
<br/>

## You can even create your own iterators!

We will soon, but here is a basic example!

```rust
let todos = Todo { ... values ... }

for task in &todos { // requires trait implementations
    println!("I need to do: {}", task); // require trait implementations
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

## Iterator way of thinking

This is an important concept which isn't in javascript

```
[Type] -> [Iterator] -> [Type]
```

This typically gives us code that looks like.

```rust
some_type
    .iter() // creates iterator
    .filter(|x| ...

    ) // A series of combinators

    .collect/sum/count/for_each() // some operation that takes the iterator and consumes it
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

## Lets do a simple exercise

Lets do the following.

1. create this file called `project/lines`

```bash
hello
fem
how
1
2
3
are
you?
```

1. read file `lines`
1. print out each line individually

<br />

#### **TypeScript**

I'll give you a few moments to try this yourself

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```typescript
import fs from "fs";

const file = fs.readFileSync("lines");

file
  .toString()
  .split("\n")
  .forEach((line) => console.log(line));
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

## Lets do the same in Rust

Since you are new, i'll have to walk through each line of code. <br/>
<br/>
Just in case you forgot

1. read a file from disk
2. print out each line individually

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```rust

fn main() {
    let file = std::fs::read_to_string("lines").unwrap();

    file
        .lines()
        .for_each(|line| println!("{}", line));
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

## How about every other line?

Add a few more lines to your test file and then implement it in TypeScript

I'll give you ~1 minute to do this

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```typescript
import fs from "fs";

const file = fs.readFileSync("lines");

file
  .toString()
  .split("\n")
  .filter((_, i) => i % 2 === 0)
  .forEach((line) => console.log(line));
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

## But how to do this in rust?

You have seen me mention `.enumerate()` `.filter(|x| ...)` thus far, why not
take 1 minute and see if you can update your code to take every other!

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

Observation: Rust does exactly what you tell it and no more.

```rust
fn main() {
    let file = std::fs::read_to_string("lines").unwrap();

    file
        .lines()
        .enumerate()
        .filter(|(idx, _)| idx % 2 == 0)
        .for_each(|line| println!("{}", line.1));
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

## One more

do these steps _IN ORDER_.

- every other line
- skip the first two lines
- print two lines

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```typescript
import fs from "fs";

const file = fs.readFileSync("lines");

file
  .toString()
  .split("\n")
  .filter((_, i) => i % 2 === 0)
  .filter((_, i) => i >= 2 && i < 4)
  .forEach((line) => console.log(line));
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

## Now Rust

Remember when i said rust has an amazing combinator set? Its time to shine

i think you should give it a try

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```rust

fn main() {
    let file = std::fs::read_to_string("lines").unwrap();

    file
        .lines()
        .enumerate()
        .filter(|(idx, _)| idx % 2 == 0)
        .skip(2)
        .take(2)
        .for_each(|line| println!("{}", line.1));
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

## Lets break down what happened

```typescript
split("\n")
  .filter((_, i) => i % 2 === 0)
  .filter((_, i) => i >= 2 && i < 4)
  .forEach((line) => console.log(line));
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

## Split

that takes substrings and creates an array.

That means calling `split` iterates the entire string up front and creates a
list

```typescript
[
    "line1",
    "line2",
    ...
]
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

## What about filter?

Filter takes in a list and produces a new list

```typescript
[
    "line1",
    "line2",
    ...
] => [
    "line2",
    "line4",
    ...
]
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

## The second filter

```typescript
[
    "line1",
    "line2",
    ...
] => [
    "line2",
    "line4",
    ...
] => [ // no matter how many lines were before, it goes through ALL
    "line6",
    "line8",
]
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

## for each

This just goes through each item in the final array, i approve

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## So what does the "code produced" ackshually look like?

With javascript its so easy to perform _many_ high level tasks that you forget
exactly what is happening.

Here is "transpiled" code

```typescript
function filter_1(x: number): boolean {
  return x % 2 === 0;
}

function filter_2(x: number): number {
  return x >= 2 && x < 4;
}

// Skipping the split operation
let a = contents.toString().split("\n");
let b = [];
for (let i = 0; i < a.length; ++i) {
  if (filter_1(a[i])) {
    b.push(a[i]);
  }
}
let c = [];
for (let i = 0; i < b.length; ++i) {
  if (filter_2(i)) {
    c.push(b[i]);
  }
}
for (let i = 0; i < c.length; ++i) {
  console.log(c[i]);
}
```

v8 may optimize some of this away. To what extent, i don't have the faintest
clue and neither do you

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Same example, but in rust

```rust
    .lines()
    .enumerate()
    .filter(|(idx, _)| idx % 2 == 0)
    .skip(2)
    .take(2)
    .for_each(|line| println!("{}", line.1));

// Goes through every char
let mut start = 0;
let mut taken = 0;
let mut skipped = 0;
let mut lines_found = 0;
for (idx, c) in lines.enumerate().chars() {
    if c !== "\n" {
        continue;
    }

    // doesn't copy, just a &str (ptr, len)
    let slice = lines[start..idx];
    start = idx + 1;

    lines_found += 1
    if lines_found % 2 == 0 {
        continue
    }

    if skipped < 2 {
        skipped += 1;
        continue;
    }

    taken += 1;
    println!("{}", slice);

    if taken == 2 {
        break;
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

## Zero cost abstractions

You will see this phrase commonly in the rust community, and this is why. Its
able to have these higher order abstractions, just without all the cost of them

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Questions?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
