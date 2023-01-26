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

### Errors
To me this one is not that obvious until you use something else.  Its something
impossible to describe

TODO: Insert success: error meme

#### TypeScript
Lets first think about typescript errors

```typescript
type Result = {
    foo: {
        bar: boolean
    }
}

async function getData(id: string): Promise<Data> {
    const result = JSON.parse(await externalService(id)) as Result;
    if (result.foo.bar) {
        return {
            ...
        };
    }
    return {
        ...
    };
}
```

So where could the errors be?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### JSON.parse
it throws errors.

```typescript
JSON.parse("{1");
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

### externalService
We don't know what's happening in there

```typescript
const result = JSON.parse(await externalService(id)) as Result;
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

### result.foo.bar
We technically are not performing run time checks on the data, therefore it can
be a bit dangerous


1. you need runtime checks
2. you run the risk...

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### TypeScript: Error is Control flow
when an error is thrown... where does your code go?

![Chrome Debugger](./images/chrome-oops.png)

unless you are explicitly catching...  but this has its own problems

```typescript
let data: Type;
try {
    data = JSON.parse("...") as Type;
} catch (e) {
    // handle this?
    // leave function early?
    // What if handling this requires catching?
}

// ... the rest of the function ...
```

Bonus fun...

Will it parse?

```typescript
1> JSON.parse("1")
2> JSON.parse("\"hello?\"")
3> JSON.parse(undefined)
4> JSON.parse("undefined")
5> JSON.parse("[]")
6> JSON.parse("[\"foo\", undefined]")
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

### Super bonus round
```typescript
1> JSON.stringify(undefined)
2> JSON.stringify({foo: undefined})
3> JSON.stringify([undefined])
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

### But this is a smaller point, in a larger picture
What methods throw errors?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### So how does Rust solve this?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Rust: Errors as Values

```rust
fn foo() -> Result<Value, Error> {
    let result = some_external_service().await?; // The question mark means i
    // don't want to handle the error
    // return it to the calling function

    //... parse json ...
    let result = serde_json::from_str(result); // <--- Result error object
    match result {
        Ok(value) => // value contains the JSON parsed object,
        Err(err) => // an err happened, so sorry, parse(undefined) doesn't exist)
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

### What does that mean?
1. you know, by the signature, if the method throws an error
1. there is syntax to return the error (shorthand (?))
1. you can handle the error in line without returning it

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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
