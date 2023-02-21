---
title: "Rust's Borrow Checker"
description: "This is usually the hardest part of Rust"
---

### Borrow Checker
This part of rust is where rust gets its bad name.  The reason why its so hard,
but if you understand a few concepts, it will become a breeze

Before we get started, lets chat about memory.  This is something that is
mostly foreign to JS devs.


#### (whiteboard time)
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

### Lets start with some examples
We will start by creating our first struct!

```rust
struct Item {
    age: isize,
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

### Some version of the complete code

```rust
#[derive(Debug)]
struct Item {
    age: isize,
}

fn main() {
    let mut items = vec![Item { age: 1 }, Item { age: 2 }];

    println!("items: {:?}", items);

    let item = items.get(0).unwrap();

    println!("item: {:?}", item);

    items.push(Item { age: 3 });
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

### Three rules to keep in your head

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

### Lets start with some exercises

Lets make the following:

1. a function that takes a vector
1. prints the contents of the vector

also remember how to define a function

First, lets do it in TypeScript

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### TypeScript Complete
about as simple as it gets

```typescript
function print(list) {
    console.log(list);
}

const list = [1, 2, 3];
print(list);
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

### Do it in rust now
You may have forgot, so here are a few things

```rust
fn <name>(<var>: <type>) {
fn <name>(<var>: <type>) -> <return type> {
// {:?} = debug print
println!("text you want {:?}", vec);
```

I'll give you 2 minutes to do it again!

```rust
// define your function here

fn main() {

    let vec: Vec<isize> = vec![1, 2, 3];

    // call your function here
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

### You probably got stuck at...

Maybe your code looks something like
```rust
// You may not even got to this poin
fn print(vec: Vec<isize>) {
    println!("vec: {:?}", vec);
}

fn main() {

    let vec: Vec<isize> = vec![1, 2, 3];

    print(vec);
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

### Ok lets update it
please call the function 2 times to print out the vector

```rust
fn main() {

    let vec: Vec<isize> = vec![1, 2, 3];

    print(vec);
    print(vec); // <--- Who got an error here?
}
```

So how do we fix this?  Well its pretty simple.

Remember rule 1: there can be only one owner.

```rust
let vec = vec![1, 2, 3]; // vec owns the vector 1, 2, 3
print(vec); // print function gets handed the vec, and now _OWNS_ it
```

That means to fix this, we need to let the print function _borrow_ the vector,
not own it.

Let me show you what that would look like.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
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
// TODO: CHECK CODE
fn print(vec: &Vec<isize>) {
    println!("vec: {:?}", vec);
}

fn main() {

    let vec: Vec<isize> = vec![1, 2, 3];

    print(&vec);
    print(&vec);
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

### So what happened there?
What happened is that `&vec` is creating a reference to vec, or in rust terms
created an immutable reference.  The functions refering to those values cannot
change the values handed to them.

Go ahead, try calling `.push` on the vector you provided in function `print`.
(you do it to show)

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

