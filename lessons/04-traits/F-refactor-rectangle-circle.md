---
title: "Refactor Rectangle & Circle"
---

## So what does this give us?

Well, now we need to rework our `Rectangle` and `Circle` implementation a bit.

- We don't need `RectIter`, we have `PointIter` now. So everything associated
  with `RectIter`, including `Rectangle` `IntoIterator` can be removed
- implement `Points` for `Rectangle`
- implement `Contains` for `Rectangle`
  - we already have that implemented on the `Rectangle` `impl`
- implement `Points` for `Circle`
- implement `Contains` for `Circle`
  - we already have that implemented on the `Circle` `impl`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

src/main.rs

```rust
fn main() {
    let rect = Rectangle::default();

    for point in rect.points() {
        println!("({}, {})", point.0, point.1);
    }

    let rect2 = Rectangle::default();

    println!("{}", rect.collide(&rect2));
}
```

src/shapes/rect.rs

```rust
impl Points for Rectangle {
    fn points(&self) -> super::collisions::PointIter {
        return super::collisions::PointIter {
            points: vec![
                (self.x, self.y),
                (self.x + self.width, self.y),
                (self.x, self.y + self.height),
                (self.x + self.width, self.y + self.height),
            ],
            idx: 0,
        };
    }
}

impl Contains for Rectangle {
    fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        return x >= self.x && x <= self.x + self.width &&
            y >= self.y && y <= self.y + self.height;
    }
}
```

src/shapes/circle.rs

```rust
impl Contains for Circle {
    fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        let dx = self.x - x;
        let dy = self.y - y;

        return dx * dx + dy * dy <= self.radius * self.radius;
    }
}

impl Points for Circle {
    fn points(&self) -> super::collisions::PointIter {
        return vec![
            (self.x, self.y),
        ].into();
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

## Lets try it out in our main file

- create 2 `Rectangle`s
- create 2 `Circle`s
- test "`Collision`s"

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Why doesn't this work?

src/main.rs

```rust
mod shapes;

use shapes::{circle::Circle, collisions::Collidable};

use crate::shapes::rect::Rectangle;

fn main() {
    let rect = Rectangle::default();
    let rect2 = Rectangle::default();

    let circ = Circle {
        radius: 3.0,
        x: 1.0,
        y: 1.0,
    };

    let circ2 = Circle {
        radius: 2.0,
        x: 1.0,
        y: 1.0,
    };

    rect.collide(&rect2);
    circ.collide(&circ2);
    circ.collide(&rect);
}
```

Lets go look at our `Collidable` definition, perhaps we can see something wrong

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
impl<T, V> Collidable<T> for V
where T: Points,
      V: Contains
{
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
