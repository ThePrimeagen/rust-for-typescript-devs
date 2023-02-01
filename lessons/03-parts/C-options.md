---
title: "Options"
description: "An introduction of Option"
---

### Options
Options are the answer to typescript's undefined / null problem.

The thing about null / undefined is that you get different answers for why you
should use what or the other...

null: undefined on purpose
undefined: it might not be there...?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Lets look at undefined/null/options in general

```typescript
const foo = undefined;
let foo: number | undefined = undefined;
if (...) {
    foo = someNumber();
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

```rust
let mut foo = None;
if (...) {
    foo = Some(some_thing());
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

### Working with options
```typescript
function foo(bar?: number): number {
    if (bar) {
        return bar * 5;
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

```rust
fn foo(bar?: usize) -> usize {
    // How you start out, you probably write code like this
    // note: compliment...
    if bar.is_some() {
        return bar.unwrap() * 5; // unwrap a None causes a panic
    }
    return 0;
}
```

```rust
fn foo(bar?: usize) -> usize {
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

### don't worry, its better... but we have to take advantage of pattern match

<br />
<br />

```rust
// Version 1: if let
fn foo_if_let(bar: Option<usize>) -> usize {
    if let Some(value) = bar {
        return value * 5;
    }
    return 0;
}

// Version 2: match
fn foo_match(bar?: Option<usize>) -> usize {
    return match bar {
        Some(value) => {
            value * 5
        }
        None => 0
    }
}

// Version 3: unwrap_or
fn foo_match(bar?: Option<usize>) -> usize {
    return bar.unwrap_or(0) * 5; // no panic
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

### What about in structs / types?

```typescript
type Foo = {
    field?: number; // it might exist and if it does, its a number
}

// these are all valid
const foo: Foo = {};
const foo2: Foo = {
    field: 5
};
// has key, therefore Object.keys(...) will return ["field"]
const foo3: Foo = {
    field: undefined
};
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

```rust
struct Foo {
    field: Option<usize>
}

fn some_fn() {
    let foo = Foo {
        field: Some(5), // some value, 5
    };
    let foo = Foo {
        field: None, // undefined
    };
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


