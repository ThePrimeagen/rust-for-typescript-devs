---
title: "Rust's Borrow Checker"
description: "This is usually the hardest part of Rust"
---

### Its time to introduce The Borrow Checker
The meme's are real, but the borrow checker isn't that hard if you have the
right foundation.

- we have already talked about every thing is on the `stack` with `ptr` to the
  `heap` if needed

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

#### Types of values
(code time)
value
reference
mutable reference

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Terminology
Dropped - releasing memory

<br />
<br />

### There are THREE rules you must have in your head at all times.
1. There can only be **one** value owner
1. There can be **unlimited** immutable borrows (reference) with **no** mutable references
1. There can be only **one** mutable reference and **no** immutable references

<br />
<br />

### There is one rule for Lifetimes
1. A reference cannot outlive its value

<br />
<br />

#### Stated differently
One var owns the the data

One var can change the data

Many vars can look at the data

You cannot look and change the data simultaneously

You cannot refer to something that has been dropped (released in memory)

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Test

1. create a new struct `Item`, derives `Debug`, with one property, `count`, that is an `usize`.
1. create a new `fn`, `add_one` that takes in an `Item` and adds 1 to it.
1. In the main function, create `item` of type `Item`
1. Print out `item` (with Debug print)
1. pass `item` to `add_one`.
1. Print out `item` again.

#### Derives Debug
allows for printing of the struct.

```rust
#[derive(Debug)]
struct Item {...}

fn main() {
    let item = Item { .. };
    // --------v debug print
    println!("{:?}", item);
    // Item {
    //    count: 69
    // }
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

### First, what is causing the error?
What is causing the error?

```rust
#[derive(Debug)]
struct Item {
    count: isize,
}

fn add_one(mut item: Item) {
    item.count += 1;
}

fn main() {
    let item = Item { count: 0 };
    println!("item {:?}", item);
    add_one(item);
    println!("item {:?}", item); // <--- why does this error
}
```

Let me ask you this question, who owns `Item` on this line?
```rust
let item = Item { count: 0 };
```

What about this line?
```rust
add_one(item);
```

Did you read the errors from your LSP?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### What rule are we breaking?
1. There can only be **one** value owner
1. There can be **unlimited** immutable borrows (reference) with **no** mutable references
1. There can be only **one** mutable reference and **no** immutable references

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### How do we fix this?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Complete code
```rust

#[derive(Debug)]
struct Item {
    count: isize,
}

fn add_one(item: &mut Item) {
    item.count += 1;
}

fn main() {
    let mut item = Item { count: 0 };
    println!("item {:?}", item);
    add_one(&mut item);
    println!("item {:?}", item);
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

### Lets make the borrow checker angry again!
To do this,
* create a function called `print_all` that takes in an immutable borrow
  (reference) to `items` and prints each item, one at a time

In the main function
* create a vector of `Item`s called `items`
* grab a **mutable** reference to item 0 (`get_mut`)
* print item 0
* call `print_all`
* print item 0

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### So how did we break it?
Try to explain why this happened, then what rule did we break?

### What rule are we breaking?
1. There can only be **one** value owner
1. There can be **unlimited** immutable borrows (reference) with **no** mutable references
1. There can be only **one** mutable reference and **no** immutable references

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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
#[derive(Debug)]
struct Item {
    count: isize,
}

fn add_one(item: &mut Item) {
    item.count += 1;
}

fn print_all(items: &Vec<Item>) {
    for item in items {
        println!("print {:?}", item);
    }
}

fn main() {

    let mut items = vec![
        Item { count: 0 },
        Item { count: 0 },
        Item { count: 0 },
    ];

    let item = items.get_mut(0).unwrap();
    add_one(item);
    print_all(&items);

    println!("help {:?}", item);
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

### One more time

* get a mutable reference named `one`, `get_mut(0)`
* get a mutable reference named `two`, `get_mut(1)`
* `println!("{:?}", one)`

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### What rule are we breaking?
1. There can only be **one** value owner
1. There can be **unlimited** immutable borrows (reference) with **no** mutable references
1. There can be only **one** mutable reference and **no** immutable references

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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

#[derive(Debug)]
struct Item {
    count: isize,
}

fn main() {

    let mut items = vec![
        Item { count: 0 },
        Item { count: 0 },
        Item { count: 0 },
    ];

    let item = items.get_mut(0).unwrap();
    let item2 = items.get_mut(1).unwrap();
    println!("help {:?}", item);
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

### does this error?

```rust
#[derive(Debug)]
struct Item {
    count: isize,
}

fn main() {

    let mut items = vec![
        Item { count: 0 },
        Item { count: 0 },
        Item { count: 0 },
    ];

    let item = items.get_mut(0).unwrap();
    let item2 = items.get_mut(1).unwrap();
    println!("help {:?}", item2);
}
```

Why or why not?

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Now, with all of your knowledge why does this error?

```rust
fn main() {
    let items = vec![1, 2, 3]
        .iter()
        .map(|x| x + 1);

    println!("{:?}", items);
}
```

lets talk about why this happens!

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Quick Recap: The big three rules

#### There can only be one value owner
```rust
let item = Item { age: 10 };
let other = item; // value moved here

println!("{:?}", item.age); // borrow of moved value (item moved to other)

```

<br />
<br />
<br />
<br />

#### There can be 0 mutable borrows when there are 1 or more immutable borrows
```rust
let mut items = vec![Item { age: 1 }, Item { age: 2 }];

let items2: &Vec<Item> = &items; // immutable borrow occurs here
let items3: &mut Vec<Item> = &mut items; // cannot borrow mutably with immutable references out

items2.get(0); // item3 is mutably borrowed
```

<br />
<br />
<br />
<br />

#### There can only be 1 mutable borrow
```rust
let mut items = vec![Item { age: 1 }, Item { age: 2 }];

let items2: &mut Vec<Item> = &mut items; // First mutable borrow
let items3: &mut Vec<Item> = &mut items; // Error occurs here

items2.push(Item { age: 3 }); // nope!
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

### Applications of the rules

#### There is a "flow" to references
Since `items2` was not used when `items3` mutable borrow out, this is ok

```rust
let mut items = vec![Item { age: 1 }, Item { age: 2 }];

let items2: &mut Vec<Item> = &mut items; // First mutable borrow
items2.push(Item { age: 3 }); // ok!

let items3: &mut Vec<Item> = &mut items; // Second mutable borrow
items3.push(Item { age: 3 }); // still ok!
```

<br />
<br />
<br />
<br />

### References cannot outlive their associated values

```rust
let y: &usize;
{
    let x: usize = 5;
    y = &x;
}

println!("ooh no! {}", y);
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

