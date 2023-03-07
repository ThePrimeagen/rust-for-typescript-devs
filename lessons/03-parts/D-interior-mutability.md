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

It is safe, but you can make it "dangerous." Lets go over both

First, lets go over basic usage
* create struct `Foo` with a `count` property and derive `Debug`
* create a `foo` in the `main` function that is placed into a `RefCell`
* println `foo`
* mutate `foo`
* println `foo`

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

    println!("foo {:?}", foo);

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

### RefCell does have some compile time protection
Lets code up an example where `RefCell` immutable borrow + mutable borrow gets
compile time caught

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

### The dangerous usage of RefCell
We can also cause a panic if we do this right.  Lets use `Rc` and a `RefCell`
and cause a panic.

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
struct Foo {
    count: usize,
}

fn immutable_borrow(foo: Rc<RefCell<Foo>>) {

    println!("immutable borrow: {:?}", foo.borrow());
}

fn main() {
    let foo = Rc::new(RefCell::new(Foo { count: 0 }));

    let mut_foo = foo.borrow_mut();

    immutable_borrow(foo.clone());

    println!("foo {:?}", mut_foo);
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
I would like you to try to upgrade the graph to use `RefCell`

There is a lot of places where you could make this change!  So the task is a
bit fun!  Pick the place you think is best and make the change

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

