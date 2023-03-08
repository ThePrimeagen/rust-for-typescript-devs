---
title: "options"
description: "an introduction of option"
---

### Option
`Option` is the answer to typescript's undefined / null problem.

`Option` is an enum

<br />
<br />

The thing about null / undefined is that you get different answers for why you
should use what or the other...

`null`: `undefined` on purpose

`undefined`: we have no reasonable guarantee it will be there...

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

### Fun Challenge
is this valid TS?

```typescript
type Foo = {
    bar?: string
}

const item: Foo = {}
const item2: Foo = {bar: ""}
const item3: Foo = {bar: undefined}; // <-- is this valid?
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

### Depends on your TSConfig
`exactOptionalPropertyTypes` requires that bar either be _not specified_ or a
string.

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


### Rust handles it different and better
At first, this may seem annoying, but once you get use to them, it grows on you
a ton

1. the ENUM definition of Option
```rust
enum Option<T> { // yes, generics can be used in enums, again, cool
    None
    Some(T),
}
```

That means we can create Options with any inner value.

2. Rust also recognizes that they will be used so much that they made them
   first class citizens.

```rust
// notice i don't have to do Option::Some(...)
let foo = Some(5);
let foo = Some("different type");
let foo = Some(Custom { age: 69, name: "ThePrimeagen" });
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

### But why?
Why do we need `Option`s in rust?  The answer is memory.  If you might or might
not return an item from a function, rust needs to be able to allocate that
memory on the stack.

This happens in JS too, it is just behind the scenes in the engine

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

### Working with Option
They are enums, so `match`/`if let` pattern matching works, but there is more
because there are plenty of convenient methods.

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

### Lets start with a small exercise
You can erase all the code you have written thus far and lets start with
TypeScript.

I want you to write a function with the following:
* signature takes in a `number` or `undefined` and returns a `number`
* if the value is `undefined`, return 0
* else multiply the value by `5`
* the signature cannot use `?` as that doesn't mean you _have to pass in
  undefined_.

I think you can do this pretty quick, i'll give you one minute.

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
function multiply(num: number | undefined): number {
    return (num ?? 0) * 5;
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

### Lets do the same thing with rust
Remember, repetition and small exercises are a great way to learn, so make sure
you are participating!

Requirements
* signature takes in a `number` or `undefined` and returns a `number`
* if the value is `undefined`, return 0
* else multiply the value by `5`

I'll give you a couple moments to try yourself
(don't just code, scroll down (note to me))

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

### How I started
When you first start with rust, it looks pretty ugly, so let me show you how i
would have completed this.

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

### Complete Code (How I would have)
```rust
fn multiply(num: Option<usize>) -> usize {
    if num.is_some() {
        return num.unwrap() * 5; // unwrap a None causes a panic
    }
    return 0;
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

### How I would now

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

### Much nicer
```rust
fn multiply(num: Option<usize>) -> usize {
    return num.unwrap_or(0) * 5;
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

### Lets change up the rules a bit
Start with TypeScript<br/>
instead of returing 0, if `undefined` is provided, return `undefined` else
multiply by 5

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
function multiply(num: number | undefined): undefined | number {
    return num === undefined ? undefined : num * 5;
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

### Can Rust help us?
yes it can!  We ackshually have 2 different ways we can accomplish this

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

### Method 1: map
`Option#map` keeps the box value (`Option`) while giving you a chance to deal
with the inner value, which for us is a number.

```rust
let foo = Some(5);
//-----------------v is a {integer}!
let foo = foo.map(|x| {...})
//---^ is now Option<Return type of map>
```

Go a head, give it a shot, and upgrade our previous example.  The new signature
should look like `fn multiply(num: Option<usize>) -> Option<usize> {...`

<br/>

i'll give you a moment to try it out

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
fn multiply(num: Option<usize>) -> Option<usize> {
    return num.map(|x| x * 5); // remains as an option
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

### Version 2, ? operator
When you have a function that returns an `Option` you can automagically unwrap
the value.

<br/>

That might sound confusing, let me show you what its doing
```rust
fn test() -> Option<usize> {
    let foo = Some(5);

    // --------v Option<usize>
    let foo = foo?;
    //---^ usize
}
```

This expands out to

```rust
fn test() -> Option<usize> {
    let foo = Some(5);
    let foo = match foo {
        Some(x) => x,
        None => return None
    };
}
```

See if you can change your `.map` example to use `?`

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
fn multiply(num: Option<usize>) -> Option<usize> {
    return Some(num? * 5);
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

### Lets do a little exercise
lets do a moment of practice!

### Small program
- write a function, call it `practice`, that takes in `nums` of `Vec<usize>`
  and an `index: usize`

- Return one of the following
  - if value exists at `index` in `nums`, return it multiplied by 5
  - if there is no value, return `index` multiplied by 5

First typescript (i'll give you a moment)!

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
function practice(list: number[], idx: number): number {
    return (list.length > idx ? list[idx] : idx) * 5
}

function practice2(list: number[], idx: number): number {
    if (idx >= list.length) {
        return idx * 5;
    }
    return list[idx] * 5;
}

const list = [1, 2, 3];

console.log(practice(list, 4));
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

### Now to the rust version!
I'll give you a moment.

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

### Complete Version

```rust
fn practice(items: Vec<usize>, idx: usize) -> usize {
    return items.get(idx).unwrap_or(&idx) * 5;
}

fn main() {
    let vec = vec![1, 2, 3, 4, 5];

    println!("value: {}", practice(vec, 0));
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

### Would you look at it?

```typescript
return (list.length > idx ? list[idx] : idx) * 5;
```

```rust
return list.get(idx).unwrap_or(&idx) * 5;
```

Rust as a language is hard.  But there are TONS of utilities that make it
really easy to work with.  This is just one example.  The Option<?> interface

Rusts take on the "Billion" dollar mistake i think is the right move.

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

### A quick thing about Vectors
* What's the difference between `[]` and `.get(x)`?
  - `[]` directly accesses the element, if its not there, its like accessing
    undefined.
  - `.get(x)` safely handles out of bounds values

* why `unwrap_or(&idx)`?
  - `.get(x)` returns Option<&T>
  - `unwrap_or` must maintain the _same_ type

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

### Some(Questions)?
... maybe that joke is a bit nerdy

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

