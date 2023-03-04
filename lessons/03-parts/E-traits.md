---
title: "Rust Traits"
description: "Perhaps one of the best things about rust"
---

### Traits, they are like interfaces
You can define most of rust's behavior, from addition, parsing strings, to
being displayed via traits.

Traits also allow you to define basic behaviors without knowing the underlying
behavior, in other words, interfaces.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### First, lets just start off with simple trait stuff
But lets do it in TypeScript first
Lets do the following:

* create type `Rectangle`, defined with `width`, `height`, `x`, and `y`.
* create type `Circle`, defined with `radius`, `x`, and `y`.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
```typescript
class Rectangle {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number) { }
}

class Circle {
    constructor(public x: number,
                public y: number,
                public radius: number) {}
}
```

We could use types here, but we are about to add methods which will make the
creation of these objects inefficient and frustrating.

Lets add an `Area` interface that defines an area method

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
```typescript
interface Area {
    area(): number;
}

class Rectangle implements Area {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number) { }

    area(): number {
        return this.width * this.height;
    }
}

class Circle {
    constructor(public x: number,
                public y: number,
                public radius: number) {}

    area(): number {
        return this.radius * this.radius * Math.PI;
    }
}
```

Lets make some observations.
1. When you define `Area` interface, you get to state methods / properties you
   require

1. When implementing an interface, it must be done on the object definition at
   the time of declaration.  This is a very important point.

What does this mean?

```typescript
class Rectangle { // i declare rect
    ...
    area() { // i must also declare the interfaces i implement
        ...
    }
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

### Lets see how rusts does this.
first, lets implement the structs `Rectangle` and `Cicle`.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
struct Rectangle {
    x: f64,
    y: f64,
    width: f64,
    height: f64,
}

struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

fn main() { }
```

Now create & implement the `Area` trait.
(i'll help)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
use std::f64::consts::PI;

trait Area {
    fn area(&self) -> f64;
}

impl Area for Rectangle {
    fn area(&self) -> f64 {
        return self.width * self.height;
    }
}

impl Area for Circle {
    fn area(&self) -> f64 {
        return self.radius * self.radius * PI
    }
}

fn main() {

    let circle = Circle {
        x: 0f64, y: 0f64,
        radius: 4f64,
    };

    let rect = Rectangle {
        x: 0f64, y: 0f64,
        width: 2f64,
        height: 8f64,
    };

    println!("area: {}", rect.area());
    println!("area: {}", circle.area());

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

### Lets... try something else
Lets use this `Area` trait/interface, but lets make a very small change.

Lets move the definition to another file.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

src/lib.rs
```rust
pub mod shapes;
```

src/shapes.rs
```rust
pub struct Rectangle {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}

pub struct Circle {
    pub x: f64,
    pub y: f64,
    pub radius: f64,
}
```

src/bin/test.rs
```rust
use std::f64::consts::PI;

use rust::shapes::{Rectangle, Circle};

trait Area {
    fn area(&self) -> f64;
}

impl Area for Rectangle {
    fn area(&self) -> f64 {
        return self.width * self.height;
    }
}

impl Area for Circle {
    fn area(&self) -> f64 {
        return self.radius * self.radius * PI
    }
}

fn main() {

    let circle = Circle {
        x: 0f64, y: 0f64,
        radius: 4f64,
    };

    let rect = Rectangle {
        x: 0f64, y: 0f64,
        width: 2f64,
        height: 8f64,
    };

    println!("area: {}", rect.area());
    println!("area: {}", circle.area());

}
```

### Now do you see?
trust me, you don't. Lets make this even better.  This small change makes a lot
of things possible.  Watch this.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
woah...

```rust
impl Area for f64 {
    fn area(&self) -> f64 {
        return self * self;
    }
}

fn main() {
    println!("area: {}", 6.9.area());
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

### It gets even better
Let's move `Area` trait and everything into the `shapes.rs` file and lets see
exactly how this `Area` implementation works for `f64`

```rust
use std::f64::consts::PI;

pub struct Rectangle {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}

pub struct Circle {
    pub x: f64,
    pub y: f64,
    pub radius: f64,
}

pub trait Area {
    fn area(&self) -> f64;
}

impl Area for Rectangle {
    fn area(&self) -> f64 {
        return self.width * self.height;
    }
}

impl Area for Circle {
    fn area(&self) -> f64 {
        return self.radius * self.radius * PI
    }
}

impl Area for f64 {
    fn area(&self) -> f64 {
        return self * self;
    }
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

### Lets go back to our main file and just type this.

```rust
fn main() {
    println!("area: {}", 6.9.area());
}
```
Why does this error?  Didn't we implement `Area` for `f64`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Traits must be imported to work
This means there is no global polyfills...  In JavaScript you edit the
`prototype` and now you have this function, but it exists for the whole project

In Rust, its only for files that import the trait

```typescript
➜  rust-typescript git:(master) ✗ node
Welcome to Node.js v18.14.0.
Type ".help" for more information.

> Number.prototype.area = function() { return this * this; }
[Function (anonymous)]

> (5).area()
25
```

So lets fix the error in rust

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Tell me that is not cool.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Why are we here?
If you have forgotten, we have this whole cannot print a node with `Debug`
trait because we get a stack overflow.

How does this help us solve things?  Well, we only need to implement a few
traits.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### First, lets make it so we can display a single Node
that seems pretty reasonable, if we can display one, then we just need to
display each possible node until we have visited every node!

Lets look at the `Display` trait!

Here is our previous code for easy of reference

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

### Complete Code

```rust
use std::{cell::RefCell, rc::Rc, fmt::Display};

struct Node {
    name: String,
    neighbors: RefCell<Vec<Rc<Node>>>,
}

impl Display for Node {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Node {}: Neighbors: {}", self.name, self.neighbors.borrow().len())?;

        for neighbor in self.neighbors.borrow().iter() {
            writeln!(f, "  -> {}", neighbor.name)?;
        }

        return Ok(());
    }
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

    println!("A: {}", A);
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

### So this is better... but how would we display a graph?
Well one thing we could do is put all the nodes into a `Vec<Node>` and just go
through it and display the nodes and their information in order of the vector,
but that is boring.

TODO: Spelling
What if i want to display them in a specific order?  How about Breadth First?

What could we implement now??

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Iterator
Yes!  we can create our own iterators and then we get all of those sweet
methods for free!

So lets implement an `Iterator` for a `Node`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
use std::{cell::RefCell, rc::Rc, fmt::Display, collections::HashSet, hash::Hash};

#[derive(PartialEq, Eq, Hash, Clone)]
struct RcNode(Rc<Node>);

impl Into<RcNode> for Rc<Node> {
    fn into(self) -> RcNode {
        return RcNode(self);
    }
}

#[derive(PartialEq, Eq)]
struct Node {
    name: String,
    neighbors: RefCell<Vec<RcNode>>,
}

impl Hash for Node {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.name.hash(state);
    }
}

struct NodeIter {
    seen: HashSet<Rc<Node>>,
    stack: Vec<Rc<Node>>,
}

impl Iterator for NodeIter {
    type Item = Rc<Node>;

    fn next(&mut self) -> Option<Self::Item> {
        return self.stack.pop().map(move |node| {
            for child in node.neighbors.borrow().iter() {
                if self.seen.insert(child.0.clone()) {
                    self.stack.push(child.0.clone());
                }
            }
            return node;
        });
    }
}

impl IntoIterator for RcNode {
    type Item = Rc<Node>;
    type IntoIter = NodeIter;

    fn into_iter(self: Self) -> Self::IntoIter {
        let mut seen = HashSet::new();
        let mut stack = Vec::new();

        seen.insert(self.0.clone());
        stack.push(self.0.clone());

        return NodeIter { seen, stack };
    }
}


impl Display for Node {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Node {}: Neighbors: {}", self.name, self.neighbors.borrow().len())?;

        for neighbor in self.neighbors.borrow().iter() {
            writeln!(f, "  -> {}", neighbor.0.name)?;
        }

        return Ok(());
    }
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

    A.neighbors.borrow_mut().push(B.clone().into());
    A.neighbors.borrow_mut().push(C.clone().into());
    B.neighbors.borrow_mut().push(A.clone().into());
    B.neighbors.borrow_mut().push(C.clone().into());
    C.neighbors.borrow_mut().push(A.clone().into());
    C.neighbors.borrow_mut().push(C.clone().into());


    let A: RcNode = A.into();
    A.into_iter().for_each(|node| {
        println!("{}", node);
    });
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

### But... what if if if if we want to load from a file?
Well, we need to implement a few more traits!  Lets implement `FromStr` for
both `Node` and `Graph`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
use anyhow::Result;
use std::{cell::RefCell, rc::Rc, fmt::Display, collections::{HashSet, HashMap}, hash::Hash, str::FromStr};

#[derive(PartialEq, Eq, Hash, Clone)]
struct RcNode(Rc<Node>);

impl Into<RcNode> for Rc<Node> {
    fn into(self) -> RcNode {
        return RcNode(self);
    }
}

#[derive(PartialEq, Eq)]
struct Node {
    name: String,
    neighbors: RefCell<Vec<RcNode>>,
}

impl Hash for Node {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.name.hash(state);
    }
}

struct NodeIter {
    seen: HashSet<Rc<Node>>,
    stack: Vec<Rc<Node>>,
}

impl Iterator for NodeIter {
    type Item = Rc<Node>;

    fn next(&mut self) -> Option<Self::Item> {
        return self.stack.pop().map(move |node| {
            for child in node.neighbors.borrow().iter() {
                if self.seen.insert(child.0.clone()) {
                    self.stack.push(child.0.clone());
                }
            }
            return node;
        });
    }
}

impl IntoIterator for &RcNode {
    type Item = Rc<Node>;
    type IntoIter = NodeIter;

    fn into_iter(self: Self) -> Self::IntoIter {
        let mut seen = HashSet::new();
        let mut stack = Vec::new();

        seen.insert(self.0.clone());
        stack.push(self.0.clone());

        return NodeIter { seen, stack };
    }
}

impl FromStr for RcNode {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        return Ok(RcNode(Rc::new(Node {
            name: s.into(),
            neighbors: RefCell::new(vec![]),
        })));
    }
}


impl Display for Node {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Node {}: Neighbors: {}", self.name, self.neighbors.borrow().len())?;

        for neighbor in self.neighbors.borrow().iter() {
            writeln!(f, "  -> {}", neighbor.0.name)?;
        }

        return Ok(());
    }
}

struct Graph {
    nodes: Vec<RcNode>,
}

impl FromStr for Graph {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut all_nodes: HashMap<String, RcNode> = HashMap::new();
        for line in s.lines().filter(|x| !x.is_empty()) {
            let (a, b) = line
                .split_once(" -> ")
                .ok_or(anyhow::anyhow!("Unable to parse nodes"))?;

            all_nodes.entry(a.into()).or_insert(a.parse()?);
            all_nodes.entry(b.into()).or_insert(b.parse()?);

            match (all_nodes.get(a.into()), all_nodes.get(b.into())) {
                (Some(a), Some(b)) => {
                    a.0.neighbors.borrow_mut().push(b.clone());
                }
                _ => unreachable!("this should never happen")
            }
        }

        return Ok(Graph {
            nodes: all_nodes.values().map(|x| x.clone()).collect(),
        });
    }
}

impl Display for Graph {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut seen = HashSet::new();
        for node in &self.nodes {
            for node in node {
                if !seen.contains(&node) {
                    writeln!(f, "{}", node)?;
                    seen.insert(node.clone());
                }
            }
        }

        return Ok(());
    }
}

fn main() -> Result<()> {
    let file = std::fs::read_to_string(
        std::env::args().nth(1).expect("please provide a file"))?;

    let graph: Graph = file.parse()?;

    println!("{}", graph);

    return Ok(());
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

