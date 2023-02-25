---
title: "Rust's Interior Mutability"
description: "Sometimes you just want to mutate something"
---

### Interior Mutability
When i heard this the first time it sounds like its really complictated.  Well,
technically, it is, but the good news is that the api is really simple

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Some Auto Traits
Some things in rust don't need to be programmed, instead you can derive their
features.  There are lots of important ones, but some very common ones are
`Debug`, `Copy`, and `Clone`.

Lets go over each of these, as we will start using them frequently

* create a struct
* derive Debug
* derive Clone
* derive Copy

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
Ok, back to Interior Mutability

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

