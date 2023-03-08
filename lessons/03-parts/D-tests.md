---
title: "Testing in Rust"
description: "The testing library is _in_ rust"
---

### Unit tests
Hate them
Love them
Whatever

They are a fundamental part of rust which makes it convenient

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets create a test for our Rect and Circle
1. create a `test` in mod.rs
1. test `Circle` vs `Circle`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
pub mod rect;
pub mod circle;
pub mod area;
pub mod collisions;

#[cfg(test)]
mod test {
    use super::{circle::Circle, collisions::Collidable};


    #[test]
    fn test_cicle_circle() {
        let a = Circle {
            x: 0f64,
            y: 0f64,
            radius: 3f64,
        };

        let mut b = Circle {
            x: 3.1f64,
            y: 0f64,
            radius: 3f64,
        };

        assert!(!a.collide(&b));

        b.x = 3f64;
        assert!(a.collide(&b));
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

