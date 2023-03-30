---
title: "Generic Trait Implementation"
---

## Lets try something different

**in the collisions.rs**

- create a `PointIter` that has a `Vec<(f64, f64)>` and `idx`
- create a convenient method to take Vec<(f64, f64)> and convert it `into`
  `PointIter`
- implement `Iterator` for `PointIter`
- create a `Points` trait that has one method, `points`, that returns an
  `PointIter`
- create a `Contains` trait that has one method, `contains_point`, that returns
  `bool` if the point is contained within the geometry
- all of this in `src/shapes/collisions.rs`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
pub struct PointIter {
    points: Vec<(f64, f64)>,
    idx: usize,
}

impl From<Vec<(f64, f64)>> for PointIter {
    fn from(value: Vec<(f64, f64)>) -> Self {
        return PointIter {
            points: value,
            idx: 0,
        };
    }
}

impl Iterator for PointIter {
    type Item = (f64, f64);

    fn next(&mut self) -> Option<Self::Item> {
        if self.idx >= self.points.len() {
            return None;
        }

        let point = self.points[self.idx];
        self.idx += 1;

        return Some(point);
    }
}

pub trait Points {
    fn points(&self) -> PointIter;
}

pub trait Contains {
    fn contains_point(&self, point: (f64, f64)) -> bool;
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

## So why did we do this?

Lets relook at our `Collidable` implementation. We can now do a "blanket"
implementation. This allows us to define a generic implemenation over generic
trait combinations!!!

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

You> "i know all these words individually, but when you put them together like
that..."

Me> "Just watch (and program to get the most out of it)"

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
impl<T> Collidable<T> for T where T: Contains + Points {
    fn collide(&self, other: &T) -> bool {
        for point in other.points() {
            if self.contains_point(point) {
                return true;
            }
        }
        return false;
    }
}
```
