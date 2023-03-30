---
title: "Custom Traits"
---

## What about our own traits?

Lets create our own amazing trait!

Lets talk about collisions (don't worry we will stay out of complicated math)

- One side note, our collision system is _SUPER FLAWED_ but enough to make it
  easy to test and show off some _really_ cool features. So just deal with it
  my game programmers that are in the audience.

- its Not really collision, its more checking to see if any `point` exists
  within

```
src/
  shapes/
    collisions.rs
```

Don't forget to add it to `mod.rs`

```rust
pub mod collisions;
```

- implement trait `Collidable<T>` with fn `collide(&self, &T)` and
  `collides(&self, &[T])`

- implement `contains_point` for `Rectangle` and `Circle`
- implement `Collidable<Rectangle>` for `Rectangle`
- implement `Collidable<Circle>` for `Rectangle`
- implement `Collidable<Circle>` for `Circle`
- implement `Collidable<Rectangle>` for `Circle`

we are only looking for `point` inclusion

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

src/shapes/rect.rs

```rust
impl Rectangle {
    pub fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        return x >= self.x && x <= self.x + self.width &&
            y >= self.y && y <= self.y + self.height;
    }
}

impl Collidable<Circle> for Rectangle {
    fn collide(&self, other: &Circle) -> bool {
        return other.collide(self);
    }
}

impl Collidable<Rectangle> for Rectangle {
    fn collide(&self, other: &Rectangle) -> bool {
        for point in other {
            if self.contains_point(point) {
                return true;
            }
        }
        return false;
    }
}
```

src/shapes/circle.rs

```rust
impl Circle {
    pub fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        let dx = self.x - x;
        let dy = self.y - y;

        return dx * dx + dy * dy <= self.radius * self.radius;
    }
}

impl Collidable<Rectangle> for Circle {
    fn collide(&self, other: &Rectangle) -> bool {
        for point in other {
            if self.contains_point(point) {
                return true;
            }
        }
        return false;
    }
}

impl Collidable<Circle> for Circle {
    fn collide(&self, other: &Circle) -> bool {
        return self.contains_point((other.x, other.y)) ||
            other.contains_point((self.x, self.y));
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

## Is the code a bit... similar and... ugly?

Circular references?? Repetitive??? This just isn't the way. If only there
was something we could do... wait... could traits help? how serendipitous!
