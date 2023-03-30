---
title: "Testing in Rust"
description: "The testing library is _in_ rust"
---

## Unit tests

Hate them

Love them

Whatever

What matters to me is that the language has first class support for them

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Lets create a test for our Rect and Circle

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

## Complete Code

```rust
#[cfg(test)]
mod test {
    use crate::shapes::collisions::Collidable;

    use super::Circle;

    #[test]
    fn test_circle_collide() {
        let c1 = Circle {
            x: 0.0,
            y: 0.0,
            radius: 1.0,
        };

        let c2 = Circle {
            x: 1.5,
            y: 1.5,
            radius: 4.0,
        };

        assert!(!c1.collide(&c2), "expect c1 to not collide with c2");
        assert!(c2.collide(&c1), "expect c2 to collide with c1");
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
