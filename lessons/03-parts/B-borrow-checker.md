---
title: "Rust's Borrow Checker"
description: "This is usually the hardest part of Rust"
---

### So lets start creating the graph that looks like the following

```
     +---+
  +--| A |--+
  |  +---+  |
  |         |
+---+     +---+
| B |     | C |
+---+     +---+
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

### Note
The following is not considered "idiomatic" rust.  But i am doing it this way
because it makes the concepts of interior mutability and refernce counting very
obvious.

Its the simplest way to create a graph and the most natural coming from another
language, but its not _the_ way.

Perf: the perf is not the best with our examples, i am here to show concepts,
not best perf.  Like any language, doing things for best performance can lead
to code that is more "complicated." (complicated is likely a function of
experience)

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### First, lets create the structs
First lets create a struct

* `Node` - contains a `name`, which is a `String`, and `neighbors`, which is
  `Vec<Node>`

First, implement this on your own, in the main file we have been working in

Little hint.

```rust
struct Node {
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

### Complete code so far

```rust
struct Node {
    name: String,
    neighbors: Vec<Node>,
}

fn main() { }
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

### Now lets create our 3 nodes
Lets do the following, in the following order:

* create `A`
* create `B`
* create `C`
* Add `B` and `C` to `A`.
* Add `A` and `C` to `B`.
* Add `C` and `A` to `B`.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Borrowed of moved value?
wut

```rust
fn main() {
    let mut A = Node { name: "A".into(), neighbors: vec![] };
    let mut B = Node { name: "B".into(), neighbors: vec![] };
    let mut C = Node { name: "C".into(), neighbors: vec![] };

    A.neighbors.push(B);
    A.neighbors.push(C);
    B.neighbors.push(A); // wut?
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

### Its time to introduce The Borrow Checker
This part of rust is where rust gets its bad name.  The reason why its so hard,
but if you understand a few concepts, it will become a breeze

Before we get started, lets chat about types of values.  This is foreign to JS
devs and this will require us to apply our heap and stack knowledge.

#### (whiteboard time)
value
reference
mutable reference

### There are THREE rules you must have in your head at all times.
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

### Rule #1: There can only be one value owner
To illustrate this rule, lets

1. remove our error, B adding A to the neighbors
1. create a new struct `Item` with one property, `count`, that is an `isize`.
1. create a new `fn`, `add_one` that takes in an `Item` and adds 1 to it.
1. In the main function, create one `Item`
1. Print out `item` (implement Debug)
1. pass `item` to `add_one`.
1. Print out `item` again.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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
How could i use an editor this swift and amazing?

TODO: totally expose my VIM course

Ok, you are probably more concerned with Rust and this error.

If you are coming from typescript and you have never used rust before, this is
probably bizarre, minimum

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

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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
Here are the three rules again
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

### Rule 3!
Lets just keep this one simple.

Does this error? Why or why not?
```rust
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

Does this one error? Why or why not?
```rust
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

### Quick Recap: The big three rules

#### There can only be one value owner
```rust
let item = Item { age: 10 };
let other = item; // value moved here

println!("{:?}", item.age); // borrow of moved value

```

#### There can be 0 mutable borrows when there are 1 or more immutable borrows
```rust
let mut items = vec![Item { age: 1 }, Item { age: 2 }];

let items2: &Vec<Item> = &mut items; // immutable borrow occurs here
let items3: &mut Vec<Item> = &mut items; // cannot borrow mutably with immutable references out

items2.get(0);
```

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

