---
title: "Rust RC"
description: "The reference counter for rust"
---

### Sometimes... I don't care
Sometimes you just want to be able to pass immutable references around and
not worry about their lifetimes.

In other words, you want rust to manage the lifetime of your object for a small
runtime cost.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Rcs!
Rc = Reference Count, but how do they work?

```rust
let mut points = vec![
    Rc::new(Point { x: 0.0, y: 0.0 }),
    Rc::new(Point { x: 0.0, y: 0.0 }),
    Rc::new(Point { x: 0.0, y: 0.0 }),
];

let point = points.last().unwrap().clone();

points.pop();
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

