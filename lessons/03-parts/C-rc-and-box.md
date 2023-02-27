---
title: "Rust RC"
description: "The reference counter for rust"
---

### So lets review our previous code
First our graph.
```
     +---+
  +--| A |--+
  |  +---+  |
  |         |
+---+     +---+
| B |     | C |
+---+     +---+
```

Our previous code
```rust
struct Node {
    name: String,
    neighbors: Vec<Node>,
}

struct Graph {
    nodes: Vec<Node>
}

fn main() {
    let mut A = Node { name: "A".into(), neighbors: vec![] };
    let mut B = Node { name: "B".into(), neighbors: vec![] };
    let mut C = Node { name: "C".into(), neighbors: vec![] };

    A.neighbors.push(B);
    A.neighbors.push(C);
    B.neighbors.push(A); // wut?
}
```

### So, what is going wrong?
What rule is being broken?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Where are things in memory?
* Where is A, B, and C located?

(lets draw this out)

What happens when we put B into vec A?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### What do we need?
We need the ability to reference memory and when there are no more references
memory is cleared up

(whiteboard)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Reference Counting
`Rc`s in Rust allow you to reference items on the heap multiple times with the
same rules for immutable borrows.  They work _slightly_ different

(whiteboard)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### With Rcs we can
```rust
let foo = Rc::new(Foo {});
let a = vec![foo.clone()];
let b = vec![foo.clone()];
let c = vec![foo.clone()];
```

Lets change our `Vec<Node>` to `Vec<Rc<Node>>`! and we should have our nice
graph structure in rust

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### So.... we are still broken.
But... i thought we fixed it.

```rust
use std::rc::Rc;

struct Node {
    name: String,
    neighbors: Vec<Rc<Node>>,
}

struct Graph {
    nodes: Vec<Rc<Node>>
}

fn main() {
    let mut A = Rc::new(Node { name: "A".into(), neighbors: vec![] });
    let mut B = Rc::new(Node { name: "B".into(), neighbors: vec![] });
    let mut C = Rc::new(Node { name: "C".into(), neighbors: vec![] });

    A.neighbors.push(B);
    A.neighbors.push(C);
    B.neighbors.push(A); // wut?
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

### We got closer though
So we are ackshually pretty close to fixing our issue.

#### What we solved
each node can contain a reference to another node

#### What's wrong
Once a `Node` is behind an `Rc` we cannot mutate it anymore.

#### What we need to solve this.
(whiteboard)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
