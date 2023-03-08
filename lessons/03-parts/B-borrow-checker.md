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

### There are THREE rules you must have in your head at all times.
1. There can only be **one** value owner
1. There can be **unlimited** immutable borrows (reference) with **no** mutable references
1. There can be only **one** mutable reference and **no** immutable references

#### Stated differently
One var owns the the data
One var can change the data
Many vars can look at the data
You cannot look and change the data simultaneously

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Rule #1: There can only be one value owner
To illustrate this rule, lets

1. create a new struct `Item`, derives `Debug`, with one property, `count`, that is an `isize`.
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
    // --------v debug print
    println!("{:?}", Item {...});
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

### What happened?
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
There are technically two ways to fix it

Lets do both

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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

### Lets break another rule, how about #2
To do this,
* create a vector of `Item`s called `items`
* create a function called `print_all` that takes in an immutable borrow
  (reference) to `items` and prints each item, one at a time
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
Try to explain why this happened.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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
Lets just keep this one simple.

* create 2 mutable references by calling `get_mut(0)` and `get_mut(1)`
* `println!("{:?}", one)`
* `println!("{:?}", two)`

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Do you remember this from earlier?

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

let items2: &Vec<Item> = &mut items; // immutable borrow occurs here
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

#### There is a "flow" to references
Since `items2` was not used when `items3` mutable borrow out, this is ok

```rust
let mut items = vec![Item { age: 1 }, Item { age: 2 }];

let items2: &mut Vec<Item> = &mut items; // First mutable borrow
items2.push(Item { age: 3 }); // nope!

let items3: &mut Vec<Item> = &mut items; // Error occurs here
items3.push(Item { age: 3 }); // nope!
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

