---
title: "Rust's Interior Mutability"
description: "Sometimes you just want to mutate something"
---

### Interior Mutability
When i heard this the first time it sounds like its really complictated.  Well,
technically, it is, but the good news is that the API is really simple

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Cell
The simplest interior mutability item is called a `Cell`.  It gives you the
ability to `get` and `set` the current value.  but the Type inside `Cell` must
be of trait `Copy`.

#### Quick detour on Copy
`Copy` will make a copy of the object on assignment, or passing directly to a
function.

(code time)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

#### Complete Code Example
(it may be slightly different than the live session)
```rust
#[derive(Copy, Clone)]
struct Foo {
    count: isize,
}

fn foo_func(foo: Foo) {
    println!("foo.count = {}", foo.count);
}

fn main() {
    let mut foo = Foo { count: 0 };
    foo_func(foo);
    let mut foo2 = foo;

    foo2.count += 1;

    println!("foo.count = {}", foo.count);
    println!("foo2.count = {}", foo2.count);
}
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Cell
Lets start with a simple example using cell
(code)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code
(may be different than live presentation)

```rust
// Cell<T>, so in our case, T = usize
#[derive(Copy, Clone)]
struct Node {
    value: Cell<usize>,
}

let node = Node {
    value: Cell::new(5),
};

println!("hello {}", node.value.get()); // makes a Copy of T
node.value.set(12); // sets T
println!("hello {}", node.value.get()); // copies back out T
```

In general, Cell tends to be used for very small values, such as an int for
flags.

Should we use `Cell` for our use case?  Why or why not?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Introducing Ref Cell
`RefCell` effectively enforces the compile time rules of rust, at run time.

TODO: Check out Jonhoo's YT video on this

Lets check out how to use it safely and unsafely.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code
(may differ in live presentation)

```rust
use std::cell::RefCell;

#[derive(Debug)]
struct Foo {
    count: usize,
}

fn main() {
    let foo = RefCell::new(Foo { count: 0 });

    foo.borrow_mut().count += 5;

    println!("foo {:?}", foo);
}
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### I thought you said it was dangerous?
I did and `RefCel` can be.  Don't forget to show how it can behave differently
than rusts rules

(back to code)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

```rust
use std::cell::RefCell;

#[derive(Debug)]
struct Foo {
    count: usize,
}

fn main() {
    let foo = RefCell::new(Foo { count: 0 });

    {
        let mut foo_mut = foo.borrow_mut();
        foo_mut.count += 5;
    }

    let foo_unmut = foo.borrow();

    println!("foo {:?}", foo);
}
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets now use RefCell in our little graph
(update verbage once we know what we are doing)
TODO: Ask benny on RefCell on Vec or on Node

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

```rust
use std::{cell::RefCell, rc::Rc};

#[derive(Debug)]
struct Node {
    name: String,
    neighbors: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    //let mut foo = RefCell::new(Foo { count: 0 });

    let A = Rc::new(Node {
        name: "A".into(),
        neighbors: RefCell::new(vec![]),
    });
    let B = Rc::new(Node {
        name: "B".into(),
        neighbors: RefCell::new(vec![]),
    });
    let C = Rc::new(Node {
        name: "C".into(),
        neighbors: RefCell::new(vec![]),
    });

    A.neighbors.borrow_mut().push(B.clone());
    A.neighbors.borrow_mut().push(C.clone());
    B.neighbors.borrow_mut().push(A.clone());
    B.neighbors.borrow_mut().push(C.clone());
    C.neighbors.borrow_mut().push(A.clone());
    C.neighbors.borrow_mut().push(C.clone());
}
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Well... I want to see the graph!
Lets print it out using the `Debug` trait.

```rust
#[derive(Debug)]
struct Node {...}

...
println("print {:?}", A);
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### What ... just happened?
We cannot even print this out... porque!  Why is rust so hard????

(have you ever serialized a circular json struct?  its not great)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

