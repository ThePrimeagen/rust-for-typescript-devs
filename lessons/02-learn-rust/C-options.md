---
title: "options"
description: "an introduction of option"
---

### options
Options are the answer to typescript's undefined / null problem.

The thing about null / undefined is that you get different answers for why you
should use what or the other...

null: undefined on purpose
undefined: it might not be there...?

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

### Rust handles it different and better
At first, this may seem annoying, but once you get use to them, it grows on you
a ton

First, the ENUM definition of Option
```rust
enum Option<T> {
    Some(T),
    None
}
```

That means we can create Options with any inner value.  Rust also recognizes
that they will be used so much that they made them first class citizens.

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

### When I started with rust, this is what i would of wrote
```rust
fn foo(bar: Option<usize>) -> usize {
    // How you start out, you probably write code like this
    // note: compliment...
    if bar.is_some() {
        return bar.unwrap() * 5; // unwrap a None causes a panic
    }
    return 0;
}
```

<br />
<br />
<br />
<br />

### Then to be more clear i may have done this...
```rust
fn foo(bar: Option<usize>) -> usize {
    // How you start out, you probably write code like this
    // note: compliment...
    if bar.is_some() {
        return bar.expect("this should never be None") * 5; // unwrap a None causes a panic
    }
    return 0;
}
```


<br />
<br />
<br />
<br />

### don't worry, its better... but we have to take advantage of pattern match

<br />
<br />
<br />
<br />

### if let Enum(containedValue) = value {

```rust
// Version 1: if let
fn foo_if_let(bar: Option<usize>) -> usize {
    if let Some(value) = bar {
        return value * 5;
    }
    return 0;
}
```

<br />
<br />
<br />
<br />

### match value

```rust
// Version 2: match
fn foo_match(bar: Option<usize>) -> usize {
    return match bar {
        Some(value) => {
            value * 5
        }
        None => 0
    }
}
```

<br />
<br />
<br />
<br />

### If a default value will do

```rust
// Version 3: unwrap_or
fn foo_match(bar: Option<usize>) -> usize {
    return bar.unwrap_or(0) * 5; // no panic
    return bar.unwrap_or_else(|| HashMap::new()); // if the type is expensive
}
```

<br />
<br />
<br />
<br />

### A map can do too!

```rust
// Version 4: map
fn foo_match(bar: Option<usize>) -> Option<usize> {
    return bar.map(|x| x * 5); // remains as an option
}

foo_match(None); // > None
foo_match(Some(20)); // > Some(100)
```

<br />
<br />
<br />
<br />

### There is also take.. which can be really handy

```rust
#[derive(Debug)]
struct Foo {
    bar: Option<usize>
}

let mut foo = Foo { bar: Some(14) };
let bar = foo.bar.take();
println!("bar: {:?} -- foo: {:?}", bar, foo);
// bar: Some(14) -- foo: Foo { bar: None }
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
- write a function that takes `Vec<usize>` and an `index: usize`
- will take the value out of the vector, if it exists, and return it
- before returning multiple by 5
- if the index does not exist, return that one multiplied by 5

First typescript!

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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

