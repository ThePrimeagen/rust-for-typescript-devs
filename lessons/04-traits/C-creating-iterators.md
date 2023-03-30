---
title: "Creating Iterators"
---

## Now its time to take it to the next level

Lets make some things that are a bit... useless, but they show off how to use
rust and that is what we are going for

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Iterator

An iterator isn't just something we interact with, its something we can also
create!

Lets talk about how iterators are implemented (whiteboard)

Lets implement an iterator for `Rectangle`. It will iterate over the four
points

src/shapes/rect.rs

- struct `RectIter` with a `points: Vec<(f64, f64)>` and `idx: usize`
- implement `Iterator` for `RectIter`
- implement `IntoIterator` for `Rectangle`

src/main.rs

- create a rect
- iterate over a rect `for point in rect` printing out each point
- print out the entire rectangle via the `Display` trait

I'll give you a moment to try it a bit yourself

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

Why are we getting a borrow checker issue?

src/main.rs

```rust
use shapes::rect::Rectangle;

mod shapes;

fn main() {
    let rect = Rectangle::default();

    for point in rect {
        println!("({}, {})", point.0, point.1);
    }

    println!("{}", rect);
}
```

src/shapes/rect.rs

```rust
pub struct RectIter {
    points: Vec<(f64, f64)>,
    idx: usize,
}

impl Iterator for RectIter {
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

impl IntoIterator for Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return RectIter {
            points: vec![
                (self.x, self.y),
                (self.x + self.width, self.y),
                (self.x, self.y + self.height),
                (self.x + self.width, self.y + self.height),
            ],
            idx: 0,
        }
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

## IntoIterator

It _consumes_ the thing you give it. We need to give it something to consume
that wont consume our original struct!

Lets do a quick example in main with `Vec` and a `for` loop to show the
consuming vs non consuming.

So what do we do?
(make simple fix)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
impl IntoIterator for Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return RectIter {
            points: [
                (self.x, self.y),
                (self.x + self.width, self.y),
                (self.x, self.y + self.height),
                (self.x + self.width, self.y + self.height),
            ],
            idx: 0,
        }
    }
}

impl IntoIterator for &Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return RectIter {
            points: [
                (self.x, self.y),
                (self.x + self.width, self.y),
                (self.x, self.y + self.height),
                (self.x + self.width, self.y + self.height),
            ],
            idx: 0,
        }
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

## I hate duplicating code

Notice that they are the _same_ code, just different types. One is the _value_
`Rectangle` and the other is a reference to `Rectangle`

- lets implement a constructor
- lets do it the trait way (`From`)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

Never sleep on the `From<T>` trait. It allows you to hide complicated code and
it relies on built in behavior.

```rust
pub struct RectIter {
    points: [(f64, f64); 4],
    idx: usize,
}

impl From<&Rectangle> for RectIter {
    fn from(rect: &Rectangle) -> Self {
        return RectIter {
            points: vec![
                (rect.x, rect.y),
                (rect.x + rect.width, rect.y),
                (rect.x, rect.y + rect.height),
                (rect.x + rect.width, rect.y + rect.height),
            ],
            idx: 0,
        }
    }
}

impl IntoIterator for Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return (&self).into();
    }
}

impl IntoIterator for &Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return self.into();
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

## Questions

We are in some heavy stuff now
