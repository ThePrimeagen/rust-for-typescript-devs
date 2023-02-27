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

#### Quick detour on copy
`Copy` will make a copy of the object on assignment
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

Lets start with a simple example using cell
```rust
let node = Node {
    value: Cell::new(5),
};

println!("hello {}", node.value.get());
node.value.set(12);
println!("hello {}", node.value.get());
```

### Ref Cell

```rust
let node = Node2 {
    value: RefCell::new(5),
};

println!("value: {}", node.value.borrow());

{
    let mut inner = node.value.borrow_mut();
    *inner = 7;
} // inner mut is dropped

println!("value: {}", node.value.borrow());
```

