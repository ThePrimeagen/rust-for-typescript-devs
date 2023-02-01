---
title: "Why should you use rust?"
description: "This is the simple breakdown of why rust is important"
---

### This part is the hardest part of the course
The reason I say that is you haven't programmed rust, yet i am going to show
you rust...

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Lets do another one

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Option vs null/undefined
In JavaScript/TypeScript there is two values for denoting "no value."

Typically null is used to say something is there, but its nothing, whereas
undefined is used to state nothing is there.  Which this is already crazy.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Rust?
Very much so like a `Result` object from earlier. (we will go over this)

```rust
struct Foo {
    bar: Option<u32>
}

// Options definition
enum Option<V> {
    Some(V),
    None
}

fn some_fn() {
    if let Some(value) = other_fn() {
        // I get that this may seem confusing...
        // what the heck is if let?
    }
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

### Explicit Mutation vs Explicit Readonly
This is a huge design decision.

In TypeScript `const` != constant

```typescript
const foo = [];
foo.push(42); // very valid
```

Where as in rust, its perfectly backwards

```rust
let foo = vec![]; // eq to [] in js
foo.push(42); // this ERRORS!!!

// cannot borrow `foo` as mutable
```

To be explicitly readonly, you must state it in typescript (artifact of js)

```typescript
const foo = [] as const;
foo.push(42); // dne
```

```rust
let mut foo = vec![]; // eq to [] in js
foo.push(42); // deal!
```

Same with function calls

```typescript
function noChange(foo: readonly number[]) {
}
```

```rust
fn change_allowed(mut foo: Vec<i32>) {
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

### Traits
There is no equivalent in JavaScript, and sort of equivalent in TypeScript

A trait roughly equal to an interface.

Its what you can do with traits that really make it amazing. Let me show you.

#### First, TypeScript
```typescript
interface Foo {
    prop_def: string;
    here_is_my_methods(): void;
}

// there is one problem about this...
interface Foo {
    i_can_just_add_a_method() // ..? WHY
}

class Bar implements Foo {
    ... implementation details ...
}
```

#### Now Rust
```rust
trait Foo {
    // NO PROPERTIES...
    fn here_is_a_method(&self);
}

struct SomeType { }

impl SomeType for Foo {
    fn here_is_a_method(&self) {
        ... body
    }
}
```

This doesn't look like a lot, but there is a BUNCH OF AWESOME hidden under the
hood.  We will get there.. but i cannot really give an example now

There is also a couple of rules for traits, we will get there

But i want to draw one distinction here.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Its not all sunshine.
Rust is amazing, but it has its limitations.
1. You will often need same or more lines of code to express the same thing,
   but if you are really familiar with rust apis it can ackshually be really
   efficient amounts of code

1. The borrow checker is hard.  I want you to remember the first time you
   learned about methods, functions, recursion.  Its Hard.  The borrow checker
   is a new concept that may take practice to stick.

1. once you know rust, its hard to go back to other languages.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
