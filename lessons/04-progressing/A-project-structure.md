---
title: "Rust: Filesystem"
description: "Rust concepts"
---

### Our little project sucks...
One big'ol file

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets split it into a couple files
main.rs -> contains the main function
graph.rs -> contains the graphing information

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

main.rs
```rust
mod graph;
use anyhow::Result;

use graph::Graph;

fn main() -> Result<()> {
    let file = std::fs::read_to_string(
        std::env::args().nth(1).expect("please provide a file"))?;

    let graph: Graph = file.parse()?;

    println!("{}", graph);

    return Ok(());
}
```

graph.rs
```rust
use std::{
    cell::RefCell,
    collections::{HashMap, HashSet},
    fmt::Display,
    hash::Hash,
    rc::Rc,
    str::FromStr,
};

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
        writeln!(
            f,
            "Node {}: Neighbors: {}",
            self.name,
            self.neighbors.borrow().len()
        )?;

        for neighbor in self.neighbors.borrow().iter() {
            writeln!(f, "  -> {}", neighbor.0.name)?;
        }

        return Ok(());
    }
}

pub struct Graph {
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
                _ => unreachable!("this should never happen"),
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

### But lets say we wanted to split this up even further
We wanted more files, well we have options...

Lets start talking workspaces

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

src/main.rs
```rust
use anyhow::Result;

use graph::Graph;

fn main() -> Result<()> {
    let file = std::fs::read_to_string(
        std::env::args().nth(1).expect("please provide a file"))?;

    let graph: Graph = file.parse()?;

    println!("{}", graph);

    return Ok(());
}
```

Cargo.toml
```toml
[package]
name = "rust"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
[dependencies]
anyhow.workspace = true
graph = { path = "./graph" }

[workspace.dependencies]
anyhow = "1.0.68"

[workspace]
members = [
    "graph"
]
```

graph/Cargo.toml
```toml
[package]
name = "graph"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
anyhow.workspace = true
```

graph/src/lib.rs
```rust
use std::{
    cell::RefCell,
    collections::{HashMap, HashSet},
    fmt::Display,
    hash::Hash,
    rc::Rc,
    str::FromStr,
};

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
        writeln!(
            f,
            "Node {}: Neighbors: {}",
            self.name,
            self.neighbors.borrow().len()
        )?;

        for neighbor in self.neighbors.borrow().iter() {
            writeln!(f, "  -> {}", neighbor.0.name)?;
        }

        return Ok(());
    }
}

pub struct Graph {
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
                _ => unreachable!("this should never happen"),
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

### Perhaps we wish to break this up even further
Well you can.

You could create a `graph.rs` and `pub mod graph` in the `graph/src/lib.rs`
file.  Remember `pub` means that its exported

We can do that now

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

graph/src/lib.rs
```rust
use std::{fmt::Display, collections::{HashSet, HashMap}, str::FromStr};
use crate::node::RcNode;

mod node;

pub struct Graph {
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
                    a.neighbors().borrow_mut().push(b.clone());
                }
                _ => unreachable!("this should never happen"),
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
```

graph/src/node.rs
```rust
use std::{rc::Rc, cell::RefCell, hash::Hash, collections::HashSet, str::FromStr, fmt::Display};

#[derive(PartialEq, Eq, Hash, Clone)]
pub struct RcNode(Rc<Node>);

impl RcNode {
    pub fn neighbors(&self) -> &RefCell<Vec<RcNode>> {
        return &self.0.neighbors;
    }
}

impl Into<RcNode> for Rc<Node> {
    fn into(self) -> RcNode {
        return RcNode(self);
    }
}

#[derive(PartialEq, Eq)]
pub struct Node {
    name: String,
    neighbors: RefCell<Vec<RcNode>>,
}

impl Hash for Node {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.name.hash(state);
    }
}

pub struct NodeIter {
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
        writeln!(
            f,
            "Node {}: Neighbors: {}",
            self.name,
            self.neighbors.borrow().len()
        )?;

        for neighbor in self.neighbors.borrow().iter() {
            writeln!(f, "  -> {}", neighbor.0.name)?;
        }

        return Ok(());
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

