---
title: "Rust Basics"
description: "Some basics about rust.  Vectors & unwrap"
---

## Did you remember everything I just said?

Of course not. Learning a language that is not so different from yours is
nice, but unless you put it into practice, you will literally forget
everything.

<br />

We will be putting these into practice, i just wanted to get through this as
fast as possible to get to the fun parts.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## Basics on Rust

Just some basics so we can understand things going forward

<br />

When you are starting out using rust you should see

1. `unwrap`s
1. `clone`s

<br />

That is totally normal, completely fine. understanding, at least for me, comes
in waves. The more I understand, the more I realize I understand less.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## Lets start learning! Starting with a Vector

`Vec` (rust) and `[]` (typescript) are very similar. Their behaviors are near
identical.

these two are functionally equivalent

```typescript
const a = [1, 2, 3, 4, 5] as const;
```

```rust
let a = vec![1, 2, 3, 4, 5];
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

## Mutation

```typescript
const a = [1, 2, 3, 4, 5];
a.push(6); // [1, 2, 3, 4, 5, 6] // returns size
```

```rust
let a = vec![1, 2, 3, 4, 5];
a.push(6); // Error: a is not mutable

// but with rust we can shadow
let mut a = a;
a.push(6); //  [1, 2, 3, 4, 5, 6] // does not return size
```

```typescript
const a = [1, 2, 3, 4, 5];
a.pop(); // [1, 2, 3, 4] undefined or T
```

```rust
let mut a = vec![1, 2, 3, 4, 5];
a.pop(); //  [1, 2, 3, 4] Option<T>
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

## Accessing Data

```typescript
const a = [1, 2, 3, 4, 5] as const;
const item = a[2];
```

```rust
let a = vec![1, 2, 3, 4, 5];
let item = a[2]; // does work, but if out of bounds, panic
let item = a.get(2); // better, returns Option<T> where T can be i32
```

An `Option<T>` is a possible undefined value. All things could be undefined,
must be specified with an `Option`

we will talk about enums and Options in depth shortly

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## Gentle Reminder: Now you will forget everything we just said

But to help you not forget, we will start doing some exercises soon.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## Tuple

This doesn't really have a similarity in javascript.

```rust
let a = (5, String::from("hello")); // this type is (i32, String)
```

it is "near" equivalent to

```typescript
const a = [5, "hello"];
```

You can pattern match (think destructuring) tuples.

```rust
let a = (5, String::from("hello")); // this type is (i32, String)

// you probably best know this as destructuring, but we will refer to this
// as pattern matching.
let (my_num, my_str) = a;
```

You can even pattern match in a function

```rust
let a = (5, String::from("hello")); // this type is (i32, String)

// you can even pattern match on functions.
fn bar((my_num, my_str): (i32, String)) {
}

bar(a);
```

<br />
<br />
<br />
<br />

## Structs

```rust
struct MyStruct {
    x: usize,
    y: usize,
    z: usize,
}

fn bar(MyStruct { y, z, .. }: MyStruct) -> bool {
    return y * z < 100;
}

fn main() {

    let foo = MyStruct {
        x: 69,
        y: 420,
        z: 1337,
    };

    let MyStruct { x, .. } = foo;
    let MyStruct { y, z, .. } = foo;
    let MyStruct { x, y, z } = foo;

    if let MyStruct { x, .. } = foo {
        println!("things about x {}", x)
    }

}
```

You can solve such crazy problems with pattern matching

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## unwrap, todo, and unreachables

These are things that only exist within Rust and may be a bit confusing.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## TODO:

I particularly like this as it allows for me to do `// TODO:` but i am forced
to handle it in rust

Lets show an example

(code time)

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## Unreachable

This unsures that the program behaves properly.

think of it like an assert statement.

lets do a quick example

(code time)

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## Unwrap

when you are new to rust, `unwrap`s are your friend. You will end up using
them a lot because you don't know the language / tools available to you yet.
Often you feel like you don't know how to handle some basic operations and
unwrap can be your friend.

You learn by doing, you learn better by doing wrong

But!!! if you unwrap an Error or an undefined, your program crashes... so...
don't do it.

Let me give you a quick example of that.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
